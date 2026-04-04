import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const baseFont = await readFile(
    path.join(
      process.cwd(),
      "node_modules",
      "next",
      "dist",
      "compiled",
      "@vercel",
      "og",
      "noto-sans-v27-latin-regular.ttf",
    ),
  );
  let cormorantFont: ArrayBuffer | null = null;

  try {
    const fontResponse = await fetch(
      "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
      { cache: "force-cache" },
    );

    const contentType = fontResponse.headers.get("content-type") ?? "";
    if (!fontResponse.ok || !contentType.includes("font")) {
      throw new Error(`Unexpected font response (${fontResponse.status}, ${contentType || "unknown"})`);
    }

    cormorantFont = await fontResponse.arrayBuffer();
  } catch (error) {
    console.error("Font fetch failed, using fallback:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #1a0f08 0%, #2C2416 30%, #3d2010 60%, #8B4513 85%, #C9876A 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            width: "300px",
            height: "800px",
            background:
              "linear-gradient(to bottom, transparent, rgba(212,168,83,0.15), transparent)",
            transform: "rotate(15deg)",
            borderRadius: "50%",
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "65%",
            width: "200px",
            height: "700px",
            background:
              "linear-gradient(to bottom, transparent, rgba(212,168,83,0.10), transparent)",
            transform: "rotate(20deg)",
            borderRadius: "50%",
            filter: "blur(50px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "35%",
            width: "250px",
            height: "750px",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,135,106,0.12), transparent)",
            transform: "rotate(10deg)",
            borderRadius: "50%",
            filter: "blur(45px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(212,168,83,0.30)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
            padding: "60px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(245,239,230,0.60)",
              letterSpacing: "6px",
              marginBottom: "28px",
              textTransform: "uppercase",
              fontFamily: "Noto Sans, sans-serif",
              display: "flex",
            }}
          >
            YOU ARE WARMLY INVITED TO CELEBRATE
          </div>

          <div
            style={{
              fontSize: "104px",
              fontWeight: 300,
              color: "#FDFAF6",
              letterSpacing: "3px",
              lineHeight: 1,
              marginBottom: "24px",
              fontStyle: "italic",
              fontFamily: cormorantFont ? "Cormorant Garamond" : "Georgia, serif",
              display: "flex",
            }}
          >
            Sneha &amp; Sanat
          </div>

          <div
            style={{
              width: "80px",
              height: "1px",
              background: "#D4A853",
              marginBottom: "24px",
              display: "flex",
            }}
          />

          <div
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "rgba(245,239,230,0.80)",
              letterSpacing: "5px",
              marginBottom: "12px",
              textTransform: "uppercase",
              fontFamily: "Noto Sans, sans-serif",
              display: "flex",
            }}
          >
            29 APRIL 2025 · CÔTE D'AZUR
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: 300,
              color: "#D4A853",
              letterSpacing: "4px",
              marginBottom: "48px",
              fontFamily: "Noto Sans, sans-serif",
              display: "flex",
            }}
          >
            ST. TROPEZ → NICE
          </div>

          <div
            style={{
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(245,239,230,0.30)",
              letterSpacing: "4px",
              textTransform: "lowercase",
              fontFamily: "Noto Sans, sans-serif",
              display: "flex",
            }}
          >
            notrebeauvoyage.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: cormorantFont
        ? [
            {
              name: "Noto Sans",
              data: baseFont,
              style: "normal",
              weight: 400,
            },
            {
              name: "Cormorant Garamond",
              data: cormorantFont,
              style: "italic",
              weight: 300,
            },
          ]
        : [
            {
              name: "Noto Sans",
              data: baseFont,
              style: "normal",
              weight: 400,
            },
          ],
    },
  );
}
