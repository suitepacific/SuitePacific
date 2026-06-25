import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background: "linear-gradient(135deg, #0b1f4d 0%, #14306b 50%, #4f7fff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "white",
            color: "#0b1f4d",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 32,
          }}
        >
          SP
        </div>
        <div style={{ color: "white", fontSize: 56, fontWeight: 700, maxWidth: 900 }}>
          Your NetSuite Journey Doesn&apos;t End After Go-Live.
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 28, marginTop: 24, maxWidth: 800 }}>
          SuitePacific, your dedicated NetSuite team for ongoing support and improvement.
        </div>
      </div>
    ),
    size
  );
}
