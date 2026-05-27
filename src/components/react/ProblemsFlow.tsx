import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProblemCard = {
    title: string;
    text: string;
};

type Panel = {
    number: string;
    eyebrow: string;
    title: React.ReactNode;
    text?: string;
    chips?: string[];
    problems?: ProblemCard[];
    closing?: string;
};

const panels: Panel[] = [
    {
        number: "01",
        eyebrow: "Problemas que vemos cada semana",
        title: (
            <>
                Tu negocio avanza,
                <br />
                pero tu parte digital
                <br />
                se queda atrás
            </>
        ),
        text: "Muchas empresas no necesitan otra herramienta más. Necesitan entender por qué su web no convierte, por qué su equipo pierde tiempo en tareas repetitivas o por qué su marketing no genera oportunidades reales.",
        chips: [
            "Web que no convierte",
            "Procesos lentos",
            "Marketing sin resultados",
            "Dependencia tecnológica",
        ],
    },
    {
        number: "02",
        eyebrow: "Web y marca",
        title: (
            <>
                Tu web no refleja
                <br />
                el nivel real
                <br />
                de tu empresa
            </>
        ),
        problems: [
            {
                title: "Tu web parece anticuada",
                text: "La empresa ha crecido, pero la primera impresión que das online sigue siendo la de hace años.",
            },
            {
                title: "No transmite confianza",
                text: "El visitante entra, mira unos segundos y se va porque no entiende bien qué haces o por qué debería elegirte.",
            },
            {
                title: "No te encuentran en Google",
                text: "Puedes tener un buen servicio, pero si tu web no está preparada para SEO, tus clientes acaban llegando a otros.",
            },
            {
                title: "Recibes visitas, pero no contactos",
                text: "El problema no siempre es el tráfico. A veces la web no guía al usuario hacia una acción clara.",
            },
        ],
    },
    {
        number: "03",
        eyebrow: "Software y procesos internos",
        title: (
            <>
                Tu equipo pierde horas
                <br />
                en tareas que podrían
                <br />
                automatizarse
            </>
        ),
        problems: [
            {
                title: "Demasiado trabajo repetitivo",
                text: "Hay personas copiando datos, revisando Excels, enviando mensajes o haciendo tareas manuales todos los días.",
            },
            {
                title: "Herramientas desconectadas",
                text: "Cada área usa una plataforma distinta y la información importante termina dispersa.",
            },
            {
                title: "Procesos que dependen de una persona",
                text: "Si alguien falta, se bloquea una parte del negocio porque el proceso no está bien sistematizado.",
            },
            {
                title: "El software no encaja",
                text: "Usas herramientas genéricas, pero tu empresa necesita una solución adaptada a sus procesos reales.",
            },
        ],
    },
    {
        number: "04",
        eyebrow: "Dependencia tecnológica",
        title: (
            <>
                Pagaste por soluciones
                <br />
                que ahora
                <br />
                te limitan
            </>
        ),
        problems: [
            {
                title: "El último desarrollo salió caro y mal",
                text: "Te prometieron una solución, pero acabaste con una web o programa difícil de mantener y lleno de parches.",
            },
            {
                title: "Dependes de terceros para cualquier cambio",
                text: "Cada modificación pequeña se convierte en esperas, costes y bloqueos.",
            },
            {
                title: "No tienes control sobre tus datos",
                text: "La información clave está en plataformas externas y cuando quieres hacer algo nuevo, todo se complica.",
            },
            {
                title: "Tu sistema no escala",
                text: "Lo que servía al principio empieza a fallar cuando llegan más clientes, más equipo o más volumen de trabajo.",
            },
        ],
    },
    {
        number: "05",
        eyebrow: "Marketing y captación",
        title: (
            <>
                Haces marketing,
                <br />
                pero no ves
                <br />
                resultados claros
            </>
        ),
        closing:
            "Si alguno de estos problemas te resulta familiar, probablemente no necesitas más ruido: necesitas una estrategia digital más ordenada, útil y hecha para tu empresa.",
        problems: [
            {
                title: "Publicas, pero nadie interactúa",
                text: "Tu marca está activa, pero el contenido no conecta ni genera oportunidades reales.",
            },
            {
                title: "Tu competencia parece más profesional",
                text: "No siempre gana quien ofrece mejor servicio, sino quien consigue transmitirlo mejor.",
            },
            {
                title: "No sabes qué funciona",
                text: "Se hacen acciones, campañas o publicaciones, pero no hay una lectura clara de resultados.",
            },
            {
                title: "Tu presencia digital no vende",
                text: "Web, redes, SEO y campañas deberían trabajar juntas. Si van por separado, se pierde fuerza.",
            },
        ],
    },
];

function ProblemCards({
    problems,
    closing,
}: {
    problems?: ProblemCard[];
    closing?: string;
}) {
    if (!problems?.length) return null;

    return (
        <div className="grid grid-cols-2 gap-[clamp(0.4rem,1.2vh,0.75rem)] lg:gap-[clamp(0.75rem,1.45vh,1rem)]">
            {problems.map((problem) => (
                <article
                    key={problem.title}
                    className="rounded-[clamp(12px,1.5vw,16px)] bg-white/[0.045] p-[clamp(0.65rem,1.55vh,1rem)] ring-1 ring-white/[0.035] lg:p-[clamp(0.95rem,1.8vh,1.25rem)]"
                >
                    <h3 className="font-display text-[clamp(0.88rem,1.08vw,1.05rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-white lg:text-[clamp(1rem,1.18vw,1.22rem)]">
                        {problem.title}
                    </h3>
                    <p className="mt-[clamp(0.32rem,0.75vh,0.6rem)] text-[clamp(0.74rem,0.86vw,0.85rem)] leading-[1.35] text-white/64 lg:mt-[clamp(0.45rem,0.95vh,0.75rem)] lg:text-[clamp(0.86rem,0.95vw,1rem)] lg:leading-[1.45]">
                        {problem.text}
                    </p>
                </article>
            ))}
            {closing && (
                <p className="col-span-2 rounded-[clamp(12px,1.5vw,16px)] bg-violet-300/[0.075] p-[clamp(0.65rem,1.55vh,1rem)] text-[clamp(0.74rem,0.86vw,0.85rem)] leading-[1.35] text-violet-50/82 ring-1 ring-violet-200/10 lg:p-[clamp(0.95rem,1.8vh,1.25rem)] lg:text-[clamp(0.86rem,0.95vw,1rem)] lg:leading-[1.45]">
                    {closing}
                </p>
            )}
        </div>
    );
}

function ProblemsPanel({ panel, index }: { panel: Panel; index: number }) {
    return (
        <article
            data-problems-panel
            className="problems-flow-panel bg-[#030207]"
            style={{ zIndex: index + 1 }}
            aria-label={panel.eyebrow}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(82,51,255,0.2),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(168,85,247,0.14),transparent_34%),linear-gradient(180deg,#030207_0%,#080512_54%,#030207_100%)]" />

            <img
                src={`/optimized/problem-${index + 1}.webp`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="problem-mascot pointer-events-none absolute select-none object-contain w-auto drop-shadow-[0_25px_50px_rgba(168,85,247,0.55)] hidden sm:block sm:z-[1] sm:left-[-10%] sm:bottom-[-10%] sm:h-[44svh] sm:opacity-90 md:left-[-6%] md:bottom-[-4%] md:h-[54svh] lg:left-[-3%] lg:bottom-[-6%] lg:h-[55svh] lg:opacity-95 xl:left-[1%] xl:bottom-[-3%] xl:h-[60svh]"
            />

            <div className="relative z-[2] flex min-h-[100svh] flex-col gap-[clamp(0.65rem,1.6vh,1.35rem)] px-[clamp(1rem,4vw,4vw)] py-[clamp(1.1rem,3.5vh,3rem)] xl:h-[100svh]">
                <header className="shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="font-display text-[clamp(0.8rem,0.95vw,1rem)] font-semibold tracking-[-0.02em] text-violet-100/82">
                            {panel.number}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-200/28 via-violet-200/12 to-transparent" />
                        <span className="text-[clamp(0.6rem,0.75vw,0.8rem)] font-semibold uppercase tracking-[0.22em] text-violet-100/64">
                            {panel.eyebrow}
                        </span>
                    </div>
                    <div className="mt-[clamp(0.6rem,1.5vh,1.6rem)] h-px w-full bg-violet-100/12" />
                </header>

                <div className="flex min-h-0 flex-1 flex-col justify-start gap-[clamp(1.1rem,2.8vh,2.1rem)] pt-[clamp(0.65rem,2.5vh,1.4rem)] lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-x-8 lg:gap-y-0 xl:justify-center xl:gap-x-12 xl:pt-[2vh]">
                    <div>
                        <h2 className="font-display max-w-6xl bg-gradient-to-b from-white via-violet-100 to-violet-300 bg-clip-text text-[clamp(2.08rem,calc(3vw+2.25vh),6.85rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-transparent lg:leading-[0.88] lg:tracking-[-0.07em]">
                            {panel.title}
                        </h2>
                    </div>

                    <div className="liquid-glass-strong glass-border-soft rounded-[clamp(20px,2.5vw,32px)] p-[clamp(1rem,2.4vh,1.5rem)] lg:p-[clamp(1.25rem,2.7vh,2rem)]">
                        {panel.text && (
                            <p className="text-[clamp(0.98rem,calc(0.35vw+1.05vh),1.25rem)] leading-[1.5] text-white/76 lg:text-[clamp(1.1rem,1.25vw,1.45rem)] lg:leading-[1.58]">
                                {panel.text}
                            </p>
                        )}

                        {panel.chips && (
                            <div className="mt-[clamp(0.85rem,2.2vh,1.75rem)] flex flex-wrap gap-[clamp(0.4rem,1vh,0.55rem)] lg:gap-[clamp(0.55rem,1vh,0.75rem)]">
                                {panel.chips.map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full bg-white/[0.055] px-[clamp(0.7rem,1vw,0.95rem)] py-[clamp(0.35rem,0.9vh,0.55rem)] text-[clamp(0.72rem,0.85vw,0.9rem)] font-medium leading-none text-white/78 ring-1 ring-white/[0.05] lg:px-[clamp(0.9rem,1.1vw,1.15rem)] lg:py-[clamp(0.45rem,0.9vh,0.65rem)] lg:text-[clamp(0.82rem,0.9vw,0.98rem)]"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        )}

                        <ProblemCards
                            problems={panel.problems}
                            closing={panel.closing}
                        />
                    </div>
                </div>

                <footer className="shrink-0">
                    <div className="h-px w-full bg-violet-100/12" />
                </footer>
            </div>
        </article>
    );
}

export default function ProblemsFlow() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const mobileMq = window.matchMedia(
            "(max-width: 699px), (pointer: coarse) and (max-width: 899px)",
        );
        const updateMotion = () => setReducedMotion(motionMq.matches);
        const updateMobile = () => setIsMobile(mobileMq.matches);
        updateMotion();
        updateMobile();
        motionMq.addEventListener("change", updateMotion);
        mobileMq.addEventListener("change", updateMobile);
        return () => {
            motionMq.removeEventListener("change", updateMotion);
            mobileMq.removeEventListener("change", updateMobile);
        };
    }, []);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section || reducedMotion || isMobile) return;

            const panelEls = gsap.utils.toArray<HTMLElement>(
                section.querySelectorAll("[data-problems-panel]"),
            );
            if (panelEls.length < 2) return;

            panelEls.forEach((panel, index) => {
                gsap.set(panel, {
                    zIndex: index + 1,
                    yPercent: index === 0 ? 0 : 105,
                    rotation: index === 0 ? 0 : 24,
                    autoAlpha: index === 0 ? 1 : 0,
                    pointerEvents: index === 0 ? "auto" : "none",
                    transformOrigin: "bottom left",
                    willChange: "transform, opacity",
                });
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    id: "problems-flow-main",
                    trigger: section,
                    start: "top top",
                    end: () =>
                        `+=${Math.max(section.offsetHeight - window.innerHeight, 1)}`,
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            const step = 1.15;

            panelEls.slice(1).forEach((panel, index) => {
                const position = index * step;

                timeline.set(
                    panel,
                    {
                        autoAlpha: 1,
                        pointerEvents: "auto",
                    },
                    position,
                );

                timeline.to(
                    panel,
                    {
                        yPercent: 0,
                        rotation: 0,
                        ease: "none",
                        duration: 1,
                        overwrite: "auto",
                    },
                    position,
                );
            });

            const raf1 = requestAnimationFrame(() => {
                requestAnimationFrame(() => ScrollTrigger.refresh());
            });
            const fontsPromise = document.fonts?.ready.then(() =>
                ScrollTrigger.refresh(),
            );
            const refreshTimeout = window.setTimeout(
                () => ScrollTrigger.refresh(),
                250,
            );

            return () => {
                cancelAnimationFrame(raf1);
                window.clearTimeout(refreshTimeout);
                void fontsPromise;
                ScrollTrigger.getById("problems-flow-main")?.kill();
            };
        },
        { scope: sectionRef, dependencies: [reducedMotion, isMobile] },
    );

    return (
        <section
            id="problemas"
            ref={sectionRef}
            className="problems-flow-single relative bg-[#030207] text-white"
            style={
                {
                    "--problems-flow-height": `${panels.length * 100}svh`,
                } as React.CSSProperties
            }
        >
            <div ref={viewportRef} className="problems-flow-viewport">
                {panels.map((panel, index) => (
                    <ProblemsPanel
                        key={panel.number}
                        panel={panel}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
