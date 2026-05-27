import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".solutions-section");

if (section) {
    const pinStage = section.querySelector(".solutions-pin-stage");
    const cards = [...section.querySelectorAll("[data-solution-card]")];
    const mobileSlides = [...section.querySelectorAll("[data-mobile-solution-slide]")];
    const nodes = [...section.querySelectorAll("[data-solution-node]")];
    const mobileDots = [...section.querySelectorAll("[data-mobile-solution-dot]")];
    const activePhases = [...section.querySelectorAll(".solutions-active-phase")];
    const activeCopies = [...section.querySelectorAll(".solutions-active-copy")];
    const mobileCounters = [...section.querySelectorAll(".solutions-mobile-counter")];
    const mobileProgress = section.querySelector(".solutions-mobile-progress");

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enhancedQuery = window.matchMedia("(min-width: 700px) and (min-height: 620px)");
    const mobileQuery = window.matchMedia("(max-width: 699px)");

    const copyByPhase = {
        Diagnóstico: "Ordenamos la situación antes de proponer una solución.",
        Web: "Convertimos tu presencia digital en una web profesional preparada para vender.",
        Software: "Creamos herramientas internas y aplicaciones web adaptadas a tu forma de trabajar.",
        IA: "Automatizamos procesos con inteligencia artificial donde aporta valor real.",
        Marketing: "Conectamos SEO, contenido y captación de clientes en una dirección clara.",
        Medición: "Medimos, ajustamos y hacemos evolucionar el sistema contigo.",
    };

    let lastPhase = "";

    const pulseLabels = (labels) => {
        labels.forEach((label) => {
            label.classList.remove("is-pulsing");
            void label.offsetWidth;
            label.classList.add("is-pulsing");
        });
    };

    const setActive = (index) => {
        const card = cards[index];
        if (!card) return;

        const phase = card.dataset.phase || "";

        cards.forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
        });

        mobileSlides.forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
        });

        nodes.forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
        });

        mobileDots.forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
        });

        activePhases.forEach((item) => {
            item.textContent = phase;
        });

        activeCopies.forEach((item) => {
            item.textContent = copyByPhase[phase] || "";
        });

        mobileCounters.forEach((item) => {
            item.textContent = `${String(index + 1).padStart(2, "0")}/${String(cards.length || mobileSlides.length).padStart(2, "0")}`;
        });

        if (mobileProgress) {
            mobileProgress.style.width = `${((index + 1) / (cards.length || mobileSlides.length)) * 100}%`;
        }

        if (phase && phase !== lastPhase) {
            pulseLabels(activePhases);
            lastPhase = phase;
        }
    };

    const resetCards = () => {
        cards.forEach((card) => {
            gsap.set(card, { clearProps: "all" });
            card.classList.remove("is-active");
        });

        nodes.forEach((node) => node.classList.remove("is-active"));
        mobileSlides.forEach((slide) => slide.classList.remove("is-active"));
        mobileDots.forEach((dot) => dot.classList.remove("is-active"));
    };

    const setupPinnedSolutions = () => {
        if (!pinStage || cards.length < 2 || reducedMotionQuery.matches || !enhancedQuery.matches) {
            return undefined;
        }

        const ctx = gsap.context(() => {
            const cardStage = section.querySelector(".solutions-card-stage");
            if (cardStage) {
                gsap.set(cardStage, { perspective: 1400 });
            }

            cards.forEach((card, index) => {
                gsap.set(card, {
                    zIndex: index + 1,
                    autoAlpha: index === 0 ? 1 : 0,
                    yPercent: index === 0 ? 0 : 18,
                    scale: index === 0 ? 1 : 0.97,
                    transformOrigin: "50% 35%",
                    pointerEvents: index === 0 ? "auto" : "none",
                });
            });

            setActive(0);

            const hold = 0.65;
            const step = 1.15;
            const totalDuration = hold + (cards.length - 1) * step;

            const timeline = gsap.timeline({
                scrollTrigger: {
                    id: "solutions-flow-main",
                    trigger: pinStage,
                    start: "top top",
                    end: () => `+=${totalDuration * window.innerHeight}`,
                    pin: true,
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const activeIndex = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.05));
                        setActive(activeIndex);
                    },
                },
            });

            cards.slice(1).forEach((card, index) => {
                const previous = cards[index];
                const position = hold + index * step;

                timeline
                    .to(
                        previous,
                        {
                            autoAlpha: 0,
                            yPercent: -14,
                            scale: 0.97,
                            pointerEvents: "none",
                            ease: "power2.in",
                            duration: 0.42,
                            overwrite: "auto",
                        },
                        position,
                    )
                    .fromTo(
                        card,
                        {
                            autoAlpha: 0,
                            yPercent: 18,
                            scale: 0.97,
                            pointerEvents: "none",
                        },
                        {
                            autoAlpha: 1,
                            yPercent: 0,
                            scale: 1,
                            pointerEvents: "auto",
                            ease: "power3.out",
                            duration: 0.7,
                            overwrite: "auto",
                        },
                        position + 0.32,
                    );
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => ScrollTrigger.refresh());
            });

            document.fonts?.ready.then(() => ScrollTrigger.refresh());
            setTimeout(() => ScrollTrigger.refresh(), 250);
        }, section);

        return () => ctx.revert();
    };

    const setupFallback = () => {
        resetCards();
        setActive(0);
        return undefined;
    };

    const setupMobileCarousel = () => {
        resetCards();
        setActive(0);

        if (!mobileQuery.matches || reducedMotionQuery.matches || !("IntersectionObserver" in window) || mobileSlides.length === 0) {
            return undefined;
        }

        const carousel = section.querySelector(".solutions-mobile-carousel");
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible) {
                    setActive(Number(visible.target.dataset.index || 0));
                }
            },
            {
                root: carousel,
                threshold: [0.55, 0.7, 0.85],
            },
        );

        mobileSlides.forEach((slide) => observer.observe(slide));

        const dotCleanups = mobileDots.map((dot, index) => {
            const onClick = () => {
                mobileSlides[index]?.scrollIntoView({ behavior: reducedMotionQuery.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
                setActive(index);
            };

            dot.addEventListener("click", onClick);
            return () => dot.removeEventListener("click", onClick);
        });

        return () => {
            observer.disconnect();
            dotCleanups.forEach((cleanupDot) => cleanupDot());
        };
    };

    const setupCurrentMode = () => {
        if (enhancedQuery.matches && !reducedMotionQuery.matches) return setupPinnedSolutions();
        if (mobileQuery.matches) return setupMobileCarousel();
        return setupFallback();
    };

    let cleanup = setupCurrentMode();

    const resync = () => {
        cleanup?.();
        ScrollTrigger.getById("solutions-flow-main")?.kill(true);
        resetCards();

        cleanup = setupCurrentMode();
    };

    enhancedQuery.addEventListener("change", resync);
    mobileQuery.addEventListener("change", resync);
    reducedMotionQuery.addEventListener("change", resync);

    window.addEventListener(
        "pagehide",
        () => {
            cleanup?.();
            ScrollTrigger.getById("solutions-flow-main")?.kill(true);
        },
        { once: true },
    );
}
