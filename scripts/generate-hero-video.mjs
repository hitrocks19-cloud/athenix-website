// Generates the homepage cinematic hero video via ElevenLabs' Flows video
// API (Google Veo 3.1 Fast under the hood) and saves it to
// public/videos/hero.mp4.
//
// Requires ELEVENLABS_API_KEY in .env.local, with the "Image & Video /
// Flows" permission enabled on that key, and a Pro+ ElevenLabs plan.
//
// Run with: npm run generate:hero-video

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error("ELEVENLABS_API_KEY is not set in .env.local. Aborting.");
  process.exit(1);
}

const client = new ElevenLabsClient({ apiKey });

const PROMPT =
  "A premium, cinematic dark motion graphic for a technology brand: " +
  "streams of glowing data particles in deep indigo, magenta and amber " +
  "light drifting slowly through an abstract dark space, subtle " +
  "geometric AI interface elements, soft lens flares, gentle smooth " +
  "camera drift, moody and premium like a high-end tech brand film. " +
  "No text, no logos, no people, photorealistic lighting, 4K quality.";

async function main() {
  console.log("Submitting video generation request...");
  let generation;
  try {
    generation = await client.flows.video.create({
      modelId: "veo-3.1-fast-generate-001",
      prompt: PROMPT,
      durationSecs: 8,
      aspectRatio: "16:9",
      resolution: "1080p",
      generateAudio: false,
    });
  } catch (err) {
    console.error("Failed to start video generation.");
    console.error(err?.body ?? err?.message ?? err);
    process.exit(1);
  }

  const id = generation.id;
  console.log(`Generation started: ${id}. Polling every 10s...`);

  const maxAttempts = 30; // up to ~5 minutes
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, 10_000));

    let status;
    try {
      status = await client.flows.video.get(id);
    } catch (err) {
      console.error("Failed to poll generation status.");
      console.error(err?.body ?? err?.message ?? err);
      process.exit(1);
    }

    console.log(`  [${attempt}/${maxAttempts}] status: ${status.status}`);

    if (status.status === "failed") {
      console.error("Generation failed.");
      console.error(JSON.stringify(status, null, 2));
      process.exit(1);
    }

    if (status.status === "completed") {
      console.log("Generation complete. Downloading...");
      const res = await fetch(status.contentUrl);
      if (!res.ok) {
        console.error(`Failed to download video: HTTP ${res.status}`);
        process.exit(1);
      }
      const buffer = Buffer.from(await res.arrayBuffer());

      const outDir = path.join(process.cwd(), "public", "videos");
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, "hero.mp4");
      await writeFile(outPath, buffer);

      console.log(`Saved to ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
      console.log('Next: set mp4: "/videos/hero.mp4" for the "hero" entry in src/content/videos.ts');
      return;
    }
  }

  console.error("Timed out waiting for generation to complete after 5 minutes.");
  process.exit(1);
}

main();
