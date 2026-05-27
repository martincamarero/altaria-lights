(() => {
    const title = document.querySelector("[data-particle-title]");

    if (!title) return;

    const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const radius = 132;
    const sampleStep = 5;
    const maxParticlesPerChar = 38;
    const colors = [
        "rgba(255, 255, 255, ",
        "rgba(221, 214, 254, ",
        "rgba(192, 132, 252, ",
        "rgba(168, 85, 247, ",
    ];

    let canvas;
    let ctx;
    let chars = [];
    let particles = [];
    let pointer = null;
    let frame = 0;
    let enabled = false;
    let initialized = false;
    let resizeObserver;
    let resizeFrame = 0;

    const wrapTextNode = (textNode) => {
        const fragment = document.createDocumentFragment();
        const tokens = textNode.nodeValue.match(/\s+|\S+/g) || [];

        for (const token of tokens) {
            if (/^\s+$/.test(token)) {
                fragment.append(document.createTextNode(token));
                continue;
            }

            const word = document.createElement("span");
            word.className = "hero-title-word";

            for (const char of token) {
                const span = document.createElement("span");
                span.className = "hero-title-char";
                span.style.setProperty("--proximity", "0");
                span.textContent = char;
                word.append(span);
            }

            fragment.append(word);
        }

        textNode.replaceWith(fragment);
    };

    const initializeText = () => {
        if (initialized) return;

        const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            },
        });
        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(wrapTextNode);
        chars = [...title.querySelectorAll(".hero-title-char")];
        initialized = true;
    };

    const createCanvas = () => {
        if (canvas) return;

        canvas = document.createElement("canvas");
        canvas.className = "hero-title-particle-canvas";
        canvas.setAttribute("aria-hidden", "true");
        title.append(canvas);
        ctx = canvas.getContext("2d");
    };

    const configureCanvas = () => {
        const rect = title.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        canvas.width = Math.max(1, Math.round(rect.width * ratio));
        canvas.height = Math.max(1, Math.round(rect.height * ratio));
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const getFont = (element) => {
        const style = window.getComputedStyle(element);
        return style.font || `${style.fontStyle} ${style.fontWeight} ${style.fontSize} / ${style.lineHeight} ${style.fontFamily}`;
    };

    const sampleChar = (charElement, titleRect) => {
        const rect = charElement.getBoundingClientRect();
        const text = charElement.textContent;
        const style = window.getComputedStyle(charElement);
        const fontSize = Number.parseFloat(style.fontSize) || rect.height;
        const padding = Math.ceil(fontSize * 0.35);
        const offscreen = document.createElement("canvas");
        const width = Math.max(1, Math.ceil(rect.width + padding * 2));
        const height = Math.max(1, Math.ceil(rect.height + padding * 2));
        const offscreenCtx = offscreen.getContext("2d", { willReadFrequently: true });
        const charParticles = [];

        offscreen.width = width;
        offscreen.height = height;
        offscreenCtx.font = getFont(charElement);
        offscreenCtx.textBaseline = "middle";
        offscreenCtx.fillStyle = "#fff";
        offscreenCtx.fillText(text, padding, height / 2);

        const image = offscreenCtx.getImageData(0, 0, width, height).data;

        for (let y = 0; y < height; y += sampleStep) {
            for (let x = 0; x < width; x += sampleStep) {
                const alpha = image[(y * width + x) * 4 + 3];

                if (alpha < 70) continue;

                charParticles.push({
                    ox: rect.left - titleRect.left + x - padding,
                    oy: rect.top - titleRect.top + y - padding,
                    x: rect.left - titleRect.left + x - padding,
                    y: rect.top - titleRect.top + y - padding,
                    vx: 0,
                    vy: 0,
                    size: 1.15 + Math.random() * 1.35,
                    alpha: alpha / 255,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    char: charElement,
                });
            }
        }

        if (charParticles.length <= maxParticlesPerChar) {
            return charParticles;
        }

        return charParticles
            .sort(() => Math.random() - 0.5)
            .slice(0, maxParticlesPerChar);
    };

    const rebuildParticles = () => {
        if (!enabled || !canvas || !ctx) return;

        configureCanvas();
        const titleRect = title.getBoundingClientRect();
        particles = chars.flatMap((char) => sampleChar(char, titleRect));
        requestLoop();
    };

    const setCharProximity = (char, value) => {
        char.style.setProperty("--proximity", Math.max(0, Math.min(1, value)).toFixed(3));
    };

    const updateCharVisibility = () => {
        if (!pointer) {
            chars.forEach((char) => setCharProximity(char, 0));
            return;
        }

        chars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const centerX = rect.left - title.getBoundingClientRect().left + rect.width / 2;
            const centerY = rect.top - title.getBoundingClientRect().top + rect.height / 2;
            const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY);
            const proximity = Math.max(0, 1 - distance / radius);

            setCharProximity(char, proximity);
        });
    };

    const draw = () => {
        frame = 0;
        if (!enabled || !ctx || !canvas) return;

        const rect = title.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        updateCharVisibility();

        let active = Boolean(pointer);

        particles.forEach((particle) => {
            const dx = pointer ? particle.ox - pointer.x : 0;
            const dy = pointer ? particle.oy - pointer.y : 0;
            const distance = pointer ? Math.hypot(dx, dy) : Infinity;
            const proximity = pointer ? Math.max(0, 1 - distance / radius) : 0;
            const angle = Math.atan2(dy || Math.random() - 0.5, dx || Math.random() - 0.5);
            const scatter = proximity * proximity * 30;
            const targetX = particle.ox + Math.cos(angle) * scatter;
            const targetY = particle.oy + Math.sin(angle) * scatter - proximity * 8;

            particle.vx += (targetX - particle.x) * 0.09;
            particle.vy += (targetY - particle.y) * 0.09;
            particle.vx *= 0.74;
            particle.vy *= 0.74;
            particle.x += particle.vx;
            particle.y += particle.vy;

            const settling = Math.abs(particle.x - particle.ox) + Math.abs(particle.y - particle.oy);
            if (proximity > 0.02 || settling > 0.12) {
                active = true;
            }

            if (proximity <= 0.015 && settling <= 0.12) return;

            const alpha = Math.min(0.95, Math.max(proximity, Math.min(settling / 22, 0.32))) * particle.alpha;
            ctx.fillStyle = `${particle.color}${alpha})`;
            ctx.shadowColor = "rgba(168, 85, 247, 0.34)";
            ctx.shadowBlur = 8 * proximity;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size + proximity * 0.8, 0, Math.PI * 2);
            ctx.fill();
        });

        if (active) {
            requestLoop();
        }
    };

    const requestLoop = () => {
        if (!frame) {
            frame = window.requestAnimationFrame(draw);
        }
    };

    const handlePointerMove = (event) => {
        const rect = title.getBoundingClientRect();
        pointer = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        requestLoop();
    };

    const handlePointerLeave = () => {
        pointer = null;
        requestLoop();
    };

    const handleResize = () => {
        if (resizeFrame) {
            window.cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = window.requestAnimationFrame(() => {
            resizeFrame = 0;
            rebuildParticles();
        });
    };

    const enable = async () => {
        if (enabled || !desktopQuery.matches || reducedMotionQuery.matches) return;

        initializeText();
        createCanvas();
        enabled = true;
        title.classList.add("is-interactive");

        await document.fonts?.ready;
        rebuildParticles();

        title.addEventListener("pointermove", handlePointerMove);
        title.addEventListener("pointerleave", handlePointerLeave);
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(title);
    };

    const disable = () => {
        if (!enabled) return;

        enabled = false;
        pointer = null;
        title.classList.remove("is-interactive");
        title.removeEventListener("pointermove", handlePointerMove);
        title.removeEventListener("pointerleave", handlePointerLeave);
        resizeObserver?.disconnect();
        resizeObserver = undefined;

        if (frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
        }

        if (resizeFrame) {
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = 0;
        }

        chars.forEach((char) => setCharProximity(char, 0));
        ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    };

    const sync = () => {
        if (desktopQuery.matches && !reducedMotionQuery.matches) {
            enable();
        } else {
            disable();
        }
    };

    sync();
    desktopQuery.addEventListener("change", sync);
    reducedMotionQuery.addEventListener("change", sync);
    window.addEventListener("pagehide", disable);
})();
