import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";
import { palette } from "@/tailwind.config";

export const ogImageSize = { width: 1200, height: 630 };

type OgImageOptions = {
  eyebrow: string;
  title: string;
};

// Shared 1200x630 social preview in the site's dark glass style.
export function renderOgImage({ eyebrow, title }: OgImageOptions) {
  const domain = new URL(siteConfig.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: palette.background,
          backgroundImage: `radial-gradient(circle at 85% 0%, ${palette.primary}8C 0%, transparent 55%), radial-gradient(circle at 0% 100%, ${palette.primaryLight}40 0%, transparent 45%)`,
          color: palette.heading,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `linear-gradient(135deg, ${palette.primaryLight}, ${palette.primaryHover})`,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path d="M14.5 3.2a8.8 8.8 0 1 0 6.3 15 7.2 7.2 0 0 1-6.3-15Z" fill={palette.white} />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 600 }}>{siteConfig.shortName}</span>
            <span style={{ fontSize: 16, letterSpacing: 6, color: palette.accent }}>TECHNOLOGIES</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: palette.accent }}>
            {eyebrow}
          </span>
          <span style={{ fontSize: 68, lineHeight: 1.1, fontWeight: 600, maxWidth: 1000 }}>{title}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <span style={{ color: palette.body }}>{domain}</span>
          <span
            style={{
              display: "flex",
              padding: "12px 28px",
              borderRadius: 14,
              backgroundColor: palette.primary,
              color: palette.white,
            }}
          >
            Book a free call
          </span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
