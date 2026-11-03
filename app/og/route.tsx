import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 700 | 800; style: "normal" };

// Inter matches the site font; an old user agent makes Google Fonts serve TTF, which the renderer needs.
let fontsPromise: Promise<OgFont[]> | null = null;
function loadFonts(): Promise<OgFont[]> {
  fontsPromise ??= (async () => {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800", {
      headers: { "User-Agent": "Mozilla/4.0" },
    }).then((r) => r.text());
    const faces = [...css.matchAll(/font-weight: (\d+);[\s\S]*?src: url\(([^)]+)\)/g)];
    return Promise.all(
      faces.map(async ([, weight, url]) => ({
        name: "Inter",
        data: await fetch(url).then((r) => r.arrayBuffer()),
        weight: Number(weight) as OgFont["weight"],
        style: "normal" as const,
      })),
    );
  })().catch(() => {
    fontsPromise = null;
    return [];
  });
  return fontsPromise;
}

export async function GET(request: NextRequest) {
  const fonts = await loadFonts();
  const { searchParams, origin } = new URL(request.url);
  const title = (searchParams.get("title") ?? "NetSuite Support After Go-Live").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "").slice(0, 40);
  const size = title.length > 80 ? 54 : title.length > 50 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ffffff 0%, #eef2fb 100%)",
          fontFamily: fonts.length ? "Inter" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${origin}/logo-icon.png`} width={64} height={64} alt="" style={{ borderRadius: 12 }} />
            <span style={{ fontSize: 40, fontWeight: 700, color: "#0b1f4d" }}>SuitePacific</span>
          </div>
          {eyebrow ? (
            <span
              style={{
                marginTop: 48,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#4f7fff",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <div
            style={{
              marginTop: eyebrow ? 14 : 56,
              fontSize: size,
              fontWeight: 800,
              lineHeight: 1.12,
              color: "#060f26",
              display: "flex",
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 110,
            padding: "0 72px",
            background: "linear-gradient(90deg, #0b1f4d 0%, #1f3a7a 100%)",
            color: "#ffffff",
            fontSize: 28,
          }}
        >
          <span>NetSuite support and development after go-live</span>
          <span style={{ color: "#b2c2e6" }}>suitepacific.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
