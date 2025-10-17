export function initHeader() {
  const header = document.getElementById("main-header");
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("menu-overlay");
  const body = document.body;

  if (!header || !toggle || !overlay) return;

  function updateHeaderScrolled() {
    if (overlay.classList.contains("active") || window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderScrolled);

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("menu-open");
    updateHeaderScrolled();
  });

  document.querySelectorAll(".menu-overlay a").forEach((link) =>
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("menu-open");
      updateHeaderScrolled();
    })
  );
}
initHeader();
