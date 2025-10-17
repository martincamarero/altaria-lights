function initParticles() {
  const particlesContainer = document.getElementById("particles-container");
  if (!particlesContainer) return;

  const particleCount = 250;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    resetParticle(particle, true);
    particlesContainer.appendChild(particle);
    animateParticle(particle, true);
  }

  function resetParticle(particle, initial = false) {
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = initial
      ? (Math.random() * 0.3 + 0.1).toString()
      : "0";
    return { x: posX, y: posY };
  }

  function animateParticle(particle, firstRun = false) {
    const pos = resetParticle(particle);
    const duration = Math.random() * 10 + 10;
    const delay = firstRun ? 0 : Math.random() * 5;

    setTimeout(() => {
      void particle.offsetWidth;
      particle.style.transition = `all ${duration}s linear`;
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      const moveX = pos.x + (Math.random() * 20 - 10);
      const moveY = pos.y - Math.random() * 30;
      particle.style.left = `${moveX}%`;
      particle.style.top = `${moveY}%`;

      setTimeout(() => animateParticle(particle), duration * 1000);
    }, delay * 1000);
  }
}

initParticles();
