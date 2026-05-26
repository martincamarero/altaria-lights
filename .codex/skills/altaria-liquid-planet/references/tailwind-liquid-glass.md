# Tailwind Liquid Glass

Add reusable CSS classes in the existing global stylesheet.

Suggested CSS:

```css
@layer components {
  .liquid-glass {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.035);
    background-blend-mode: luminosity;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.12),
      0 20px 80px rgba(91, 33, 182, 0.12);
  }

  .liquid-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.42),
      rgba(255, 255, 255, 0.12) 28%,
      transparent 50%,
      rgba(168, 85, 247, 0.22) 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .liquid-glass-strong {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.055);
    background-blend-mode: luminosity;
    backdrop-filter: blur(34px);
    -webkit-backdrop-filter: blur(34px);
    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.18),
      0 30px 120px rgba(91, 33, 182, 0.22);
  }

  .liquid-glass-strong::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.55),
      rgba(255, 255, 255, 0.16) 25%,
      transparent 50%,
      rgba(192, 132, 252, 0.28) 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

Use these classes with Tailwind:

rounded-3xl
rounded-full
text-white
text-white/80
text-white/60
transition-transform
hover:scale-105
active:scale-95