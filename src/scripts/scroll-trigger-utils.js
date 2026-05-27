import { ScrollTrigger } from "gsap/ScrollTrigger";

let pendingRaf = null;
let pendingTimeout = null;

/**
 * Coalesces ScrollTrigger.refresh() calls into a single rAF per frame.
 * Avoids the multiple forced reflows that come from triggering refresh
 * from raf + fonts.ready + setTimeout in close succession.
 */
export const safeRefreshScrollTrigger = () => {
    if (pendingRaf) return;
    pendingRaf = window.requestAnimationFrame(() => {
        pendingRaf = null;
        ScrollTrigger.refresh();
    });
};

/**
 * One-shot, debounced version: only one refresh runs in the next ~quietMs
 * window even if called many times. Useful for resize-style bursts.
 */
export const debouncedRefreshScrollTrigger = (quietMs = 120) => {
    if (pendingTimeout) {
        window.clearTimeout(pendingTimeout);
    }
    pendingTimeout = window.setTimeout(() => {
        pendingTimeout = null;
        safeRefreshScrollTrigger();
    }, quietMs);
};
