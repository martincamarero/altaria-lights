/*HEADER*/

document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("main-header");
    const toggle = document.getElementById("menu-toggle");
    const overlay = document.getElementById("menu-overlay");
    const body = document.body;

    function updateHeaderScrolled() {
        if (overlay.classList.contains("active") || window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeaderScrolled);

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        overlay.classList.toggle("active");

        if (overlay.classList.contains("active")) {
            body.style.overflow = "hidden"; // bloquea scroll
        } else {
            body.style.overflow = ""; // desbloquea scroll (vuelve al estilo por defecto)
        }

        updateHeaderScrolled(); // Actualizar estado cuando abres/cerras el menú
    });

    // Cierra el menú al hacer clic en cualquier enlace
    document.querySelectorAll(".menu-overlay a").forEach((link) =>
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            overlay.classList.remove("active");
            body.style.overflow = ""; // desbloquea scroll
            updateHeaderScrolled(); // Actualizar estado cuando se cierra el menú
        })
    );

    // Estado inicial
    updateHeaderScrolled();
});

/*PORTADA*/

// Create particle effect
const particlesContainer = document.getElementById("particles-container");
const particleCount = 500;

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size (small)
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Initial position and visible opacity
    resetParticle(particle, true);

    particlesContainer.appendChild(particle);

    // Animate with no delay first time
    animateParticle(particle, true);
}

function resetParticle(particle, initial = false) {
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    if (initial) {
        // Visible opacity for first render
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
    } else {
        particle.style.opacity = "0";
    }

    return { x: posX, y: posY };
}

function animateParticle(particle, firstRun = false) {
    const pos = resetParticle(particle);

    const duration = Math.random() * 10 + 10;
    const delay = firstRun ? 0 : Math.random() * 5;

    setTimeout(() => {
        // ⏳ Forzar reflow para que el navegador registre el estilo inicial
        void particle.offsetWidth;

        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();

        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}

/* FORMULARIO EVITAR REDIRECCION*/

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            status.innerText = "¡Mensaje enviado con éxito!";
            form.reset();
        } else {
            status.innerText = "Hubo un problema. Inténtalo más tarde.";
        }
    } catch (error) {
        status.innerText = "Error de red. Inténtalo de nuevo.";
    }
});
