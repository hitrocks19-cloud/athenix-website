import { ImageResponse } from "next/og";

export const alt = "Athenix: AI & Data Analytics Training and AI Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(120deg, #0b0c14 0%, #1d1650 55%, #4b2fe0 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 8, color: "#ffb020", fontWeight: 700 }}>ATHENIX</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Build Skills. Apply AI. Create Impact.
        </div>
        <div style={{ fontSize: 34, color: "rgba(255,255,255,0.75)", marginTop: 28 }}>
          Live AI and data analytics training, plus AI automation consultancy
        </div>
        <div style={{ fontSize: 28, color: "#e024c0", marginTop: 48, fontWeight: 700 }}>www.athenixlearning.com</div>
      </div>
    ),
    size
  );
}
