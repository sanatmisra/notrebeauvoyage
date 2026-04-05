import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function fetchCormorantFont(url: string) {
  try {
    const response = await fetch(url, { cache: "force-cache" });
    const type = response.headers.get("content-type") ?? "";

    if (!response.ok || !type.includes("font")) {
      throw new Error(`Unexpected font response (${response.status}, ${type || "unknown"})`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error("Font fetch failed, using fallback:", error);
    return null;
  }
}

function FloralStrip({ flipped = false }: { flipped?: boolean }) {
  const placement = flipped ? { bottom: 0, transform: "rotate(180deg)" } : { top: 0 };

  return (
    <svg
      viewBox="0 0 1200 90"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...placement,
        width: "1200px",
        height: flipped ? "60px" : "80px",
        opacity: 0.9,
      }}
    >
      <path
        d="M132 78 L132 30 L318 30"
        fill="none"
        stroke="rgba(212,168,83,0.28)"
        strokeWidth="1"
      />
      <path
        d="M1068 78 L1068 30 L882 30"
        fill="none"
        stroke="rgba(212,168,83,0.28)"
        strokeWidth="1"
      />
      {[
        { x: 146, y: 62, w: 10, h: 22, r: -30 },
        { x: 164, y: 28, w: 10, h: 20, r: -88 },
        { x: 236, y: 30, w: 11, h: 22, r: -90 },
        { x: 320, y: 30, w: 9, h: 20, r: -92 },
        { x: 880, y: 30, w: 9, h: 20, r: 92 },
        { x: 964, y: 30, w: 11, h: 22, r: 90 },
        { x: 1036, y: 28, w: 10, h: 20, r: 88 },
        { x: 1054, y: 62, w: 10, h: 22, r: 30 },
      ].map((leaf, index) => (
        <ellipse
          key={`leaf-${index}`}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.w / 2}
          ry={leaf.h / 2}
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
          fill="rgba(139,158,138,0.45)"
        />
      ))}
      {[
        { x: 150, y: 74, size: 16, petals: "rgba(245,239,230,0.38)" },
        { x: 356, y: 30, size: 16, petals: "rgba(245,239,230,0.38)" },
        { x: 520, y: 24, size: 22, petals: "rgba(201,135,106,0.42)" },
        { x: 600, y: 22, size: 18, petals: "rgba(245,239,230,0.42)" },
        { x: 680, y: 24, size: 22, petals: "rgba(201,135,106,0.42)" },
        { x: 844, y: 30, size: 16, petals: "rgba(245,239,230,0.38)" },
        { x: 1050, y: 74, size: 16, petals: "rgba(245,239,230,0.38)" },
      ].map((flower, index) => (
        <g key={`flower-${index}`} transform={`translate(${flower.x} ${flower.y})`}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy={-(flower.size / 2.9)}
              rx={flower.size / 5}
              ry={flower.size / 2.6}
              transform={`rotate(${angle})`}
              fill={flower.petals}
            />
          ))}
          <circle cx="0" cy="0" r={flower.size / 6} fill="rgba(212,168,83,0.8)" />
        </g>
      ))}
      {[
        [194, 30],
        [430, 28],
        [770, 28],
        [1006, 30],
      ].map(([x, y], index) => (
        <circle key={`berry-${index}`} cx={x} cy={y} r={3} fill="rgba(212,168,83,0.34)" />
      ))}
    </svg>
  );
}

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

  const [cormorantItalic, cormorantRegular] = await Promise.all([
    fetchCormorantFont(
      "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
    ),
    fetchCormorantFont(
      "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff2",
    ),
  ]);

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
          backgroundColor: "#2C2416",
          backgroundImage:
            "radial-gradient(circle at 50% 16%, rgba(212,168,83,0.16), transparent 34%), radial-gradient(circle at 15% 82%, rgba(201,135,106,0.12), transparent 28%), radial-gradient(circle at 88% 22%, rgba(212,168,83,0.14), transparent 32%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-8%",
            left: "54%",
            width: "250px",
            height: "820px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(212,168,83,0.16) 22%, rgba(220,180,100,0.2) 48%, rgba(212,168,83,0.15) 72%, transparent 100%)",
            transform: "rotate(15deg)",
            borderRadius: "50%",
            filter: "blur(42px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-12%",
            left: "67%",
            width: "160px",
            height: "760px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(212,168,83,0.12) 18%, rgba(220,180,100,0.14) 44%, rgba(212,168,83,0.12) 72%, transparent 100%)",
            transform: "rotate(20deg)",
            borderRadius: "50%",
            filter: "blur(48px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "860px",
            padding: "86px 84px 82px",
            background: "rgba(44, 36, 22, 0.65)",
            border: "1px solid rgba(212, 168, 83, 0.35)",
            borderRadius: "4px",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "16px",
              border: "1px solid rgba(212,168,83,0.3)",
              display: "flex",
            }}
          />

          <FloralStrip />
          <FloralStrip flipped />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 300,
                letterSpacing: 5,
                color: "rgba(212,168,83,0.85)",
                textTransform: "uppercase",
                marginBottom: "22px",
                fontFamily: "Noto Sans, sans-serif",
                display: "flex",
              }}
            >
              🇫🇷 SNEHA &amp; SANAT 🚗
            </div>

            <div
              style={{
                fontSize: 84,
                fontWeight: 300,
                fontStyle: "italic",
                fontFamily:
                  cormorantItalic || cormorantRegular
                    ? "Cormorant Garamond"
                    : "Georgia, serif",
                color: "#FDFAF6",
                lineHeight: 0.95,
                marginBottom: "18px",
                display: "flex",
              }}
            >
              Sneha &amp; Sanat
            </div>

            <div
              style={{
                width: "94px",
                height: "1px",
                background: "rgba(212,168,83,0.8)",
                marginBottom: "24px",
                display: "flex",
              }}
            />

            <div
              style={{
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: 6,
                color: "rgba(245,239,230,0.75)",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontFamily: "Noto Sans, sans-serif",
                display: "flex",
              }}
            >
              10 Year Anniversary · Vow Renewal
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 300,
                letterSpacing: 5,
                color: "rgba(212,168,83,0.8)",
                textTransform: "uppercase",
                marginBottom: "40px",
                fontFamily: "Noto Sans, sans-serif",
                display: "flex",
              }}
            >
              29 April 2025
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(245,239,230,0.3)",
                letterSpacing: 1.4,
                fontFamily: "Noto Sans, sans-serif",
                textTransform: "lowercase",
                display: "flex",
              }}
            >
              notrebeauvoyage.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans",
          data: baseFont,
          style: "normal",
          weight: 400,
        },
        ...(cormorantItalic
          ? [
              {
                name: "Cormorant Garamond",
                data: cormorantItalic,
                style: "italic" as const,
                weight: 300 as const,
              },
            ]
          : []),
        ...(cormorantRegular
          ? [
              {
                name: "Cormorant Garamond",
                data: cormorantRegular,
                style: "normal" as const,
                weight: 300 as const,
              },
            ]
          : []),
      ],
    },
  );
}
