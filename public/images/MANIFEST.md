# Image drop-in checklist

The site already renders correctly without these — every slot falls back
to a labeled placeholder (see `SmartImage`) until the real file exists at
the exact path below. Drop each file in with the exact filename and it
goes live immediately, no code changes needed.

Already in place:
- [x] `logo/athenix-logo-mark.png` — the circuit "A" mark (copied from `athenix-learning/assets/logo.png`)

Still needed — save these to `athenix-website/public/images/...`:

| Path | What goes here |
|---|---|
| `logo/athenix-logo-wordmark.png` | Full "ATHENIX LEARNING" horizontal wordmark (white/transparent background) |
| `trainer/hitesh-portrait.jpg` | A clean headshot/portrait of Hitesh Purohit |
| `trainer/hitesh-stage-1.jpg` | Stage photo — speaking into the mic, Ira Skills Hall of Fame |
| `trainer/hitesh-stage-2.jpg` | Stage photo — presenting/walking on stage, Ira Skills Hall of Fame |
| `corporate/team-office-1.jpg` | Athenix team photo in an office setting |
| `corporate/greatwhite-boardroom.jpg` | Corporate training session around a boardroom table |
| `corporate/greatwhite-lobby-group.jpg` | Larger group photo after a corporate training session |
| `corporate/anchor-group-training.jpg` | Group photo at a corporate training (Anchor Group) |
| `gallery/live-session-call.jpg` | Screenshot of a live online session / Teams call with participants |
| `testimonials/poll-results-1.png` | Live learner poll results screenshot |
| `testimonials/poll-results-2.png` | Live learner poll results screenshot |
| `testimonials/screenshot-1.png` through `screenshot-6.png` | WhatsApp testimonial screenshots |

Notes:
- Keep testimonial screenshots exactly as captured — do not crop out or
  alter the masked/obscured names and numbers already hidden in them.
- JPG for photos, PNG for screenshots (transparency/text clarity) is a
  sensible default, but any common web image format works — `SmartImage`
  matches on the exact filename in `src/content/images.ts`, so if you use
  a different extension, update that file too.
- Once cinematic videos are produced, drop MP4s into `/public/videos/`
  and set the corresponding `mp4` path in `src/content/videos.ts`.
