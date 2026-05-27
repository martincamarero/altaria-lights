export function initHeader() {
  const header = document.getElementById("main-header");
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  const body = document.body;

  if (!header || !toggle || !overlay) return;

  let lockedScrollY = 0;

  function updateHeaderScrolled() {
    if (overlay.classList.contains("active") || window.scrollY > 14) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function lockScroll() {
    lockedScrollY = window.scrollY;
    body.style.top = `-${lockedScrollY}px`;
    body.classList.add("menu-open");
  }

  function unlockScroll() {
    body.classList.remove("menu-open");
    body.style.top = "";
    window.scrollTo(0, lockedScrollY);
  }

  window.addEventListener("scroll", updateHeaderScrolled);

  toggle.addEventListener("click", () => {
    const willOpen = !overlay.classList.contains("active");
    toggle.classList.toggle("active", willOpen);
    overlay.classList.toggle("active", willOpen);
    if (willOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    updateHeaderScrolled();
  });

  document.querySelectorAll(".menu-overlay a").forEach((link) =>
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      overlay.classList.remove("active");
      unlockScroll();
      updateHeaderScrolled();
    })
  );
}
initHeader();
