---
name: altaria-liquid-planet-hero
description: Use this skill when improving Altaria's landing hero with a purple planet video background, ping-pong seamless video loop, responsive desktop/mobile video sources, Tailwind CSS, and liquid glass/glassmorphism UI.
---

# Altaria Liquid Planet Hero Skill

## Goal

Improve the existing Altaria hero section so it feels like a premium futuristic landing page inspired by the Bloom AI reference, but adapted to Altaria.

The final result must include:

- Full-screen responsive hero.
- Desktop planet video for desktop.
- Mobile planet video for mobile.
- Seamless ping-pong video loop generated from the existing videos.
- Tailwind-based layout.
- Liquid glass / glassmorphism panels.
- Premium dark purple sci-fi aesthetic.
- Header and hero content layered above the video.
- Clean responsive design for mobile, tablet and desktop.

## Important Constraints

Do not generate new videos.

Use the existing videos:

- `public/videos/altaria-planet-desktop.mp4`
- `public/videos/altaria-planet-mobile.mp4`

Generate derived loop files:

- `public/videos/altaria-planet-desktop-loop.mp4`
- `public/videos/altaria-planet-mobile-loop.mp4`

Use ffmpeg to create ping-pong loops:

original video → reversed video → single loopable file

Do not use JavaScript to reverse playback at runtime.

The browser should only play a normal MP4/WebM video with `autoplay muted loop playsInline`.

## Visual Direction

The hero should be inspired by a premium AI/cosmic landing page:

- Dark space video background.
- Purple/violet planet glow.
- Floating glass cards.
- Soft white text.
- Subtle violet light accents.
- Rounded glass containers.
- Thin gradient-like borders using pseudo-elements or Tailwind-compatible CSS.
- No hard borders unless needed.
- No flat boring cards.
- No clutter.

Avoid copying Bloom literally.

Altaria should feel:

- Futuristic.
- Elegant.
- Premium.
- Technological.
- Clean.
- Trustworthy.
- More purple/violet than green.

## Responsive Rules

Desktop:

- Use the desktop video.
- Hero should be full viewport height.
- Layout may use two visual zones:
  - Main copy / CTA on the left.
  - Floating glass panels or visual details on the right.
- Keep the planet visible and cinematic.

Mobile:

- Use the mobile video.
- Planet should remain centered/lower area.
- Leave enough top space for header and headline.
- Content must be readable.
- Use overlays/gradients to improve text contrast.
- Avoid oversized glass panels that hide the planet.

## Tailwind/CSS Rules

Use Tailwind utility classes where possible.

Add custom CSS only for reusable glass effects, for example:

- `.liquid-glass`
- `.liquid-glass-strong`
- `.hero-video-mask`

Prefer:

- `backdrop-blur`
- `bg-white/[0.03]`
- `shadow`
- `rounded-3xl`
- `text-white`
- `text-white/80`
- `text-white/60`
- violet glow shadows
- smooth transitions

Do not add unnecessary UI libraries unless the project already uses them.

## Implementation Requirements

1. Inspect the existing repo structure.
2. Find the current hero component/page.
3. Reuse existing Altaria branding, routes, logo and copy where possible.
4. Add or update video assets paths.
5. Add ffmpeg script or npm script to generate ping-pong loop videos.
6. Implement responsive `<video>` rendering:
   - desktop source shown on `md`/`lg` and above.
   - mobile source shown below that.
7. Add dark overlays and gradients above the video.
8. Build hero content above video with z-index.
9. Ensure text readability.
10. Run the project build/lint command if available.
11. Report changed files and commands used.

## Final Output Expected From Codex

At the end, summarize:

- Files changed.
- How to regenerate video loops.
- How to preview locally.
- Any assumptions made.