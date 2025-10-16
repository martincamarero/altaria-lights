function initForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // Si no se encuentra el formulario o el campo de estado, no hacer nada.
  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const data = new FormData(form);

    status.innerText = "Enviando...";
    status.style.color = "white";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.innerText = "¡Mensaje enviado con éxito!";
        status.style.color = "var(--color-altaria-cyan)";
        form.reset(); // Limpia el formulario
      } else {
        status.innerText = "Hubo un problema. Inténtalo más tarde.";
        status.style.color = "red";
      }
    } catch (error) {
      status.innerText = "Error de red. Inténtalo de nuevo.";
      status.style.color = "red";
    }
  });
}

// Llama a la función para que se ejecute en cuanto el archivo es importado
initForm();
