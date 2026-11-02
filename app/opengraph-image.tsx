import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} travel agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors are hard-coded here because ImageResponse cannot read CSS variables.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#08252d",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, color: "#f2b01e" }}>{site.name}</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Visas, flights, hotels and car rental.
        </div>
        <div style={{ fontSize: 32, marginTop: 32, opacity: 0.75 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
