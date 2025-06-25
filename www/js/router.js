const PAGE_BASE_PATH = '../pages/';

export function setupNavigation() {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("translate-x-0");
    overlay.classList.toggle("hidden");
  });

  overlay?.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-0");
    overlay.classList.add("hidden");
  });

  // Escucha clics en elementos con [data-page] para navegación
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-page]");
    if (link) {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
      history.pushState({ page }, '', `#${page}`); // <- Actualiza historial
    }
  });
}

export async function loadPage(page) {
  const mainArea = document.getElementById("mainContent");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!mainArea) {
    console.warn('No se encontró #mainContent');
    return;
  }

  if (page === "logout") {
    alert("Cerrando sesión...");
    return;
  }

  // Estilos activos en menú
  document.querySelectorAll(".nav-link").forEach((l) => {
    l.classList.remove("bg-[#008080]", "text-white", "font-semibold");
    if (page.startsWith(l.dataset.page)) {
      l.classList.add("bg-[#008080]", "text-white", "font-semibold");
    }
  });

  try {
    const res = await fetch(`${PAGE_BASE_PATH}${page}.html`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    mainArea.innerHTML = html;
  } catch (err) {
    mainArea.innerHTML = `<p class="text-red-600">No se pudo cargar la vista: <strong>${page}.html</strong></p>`;
    console.error("Error al cargar página:", err);
  }

  // Cierra el sidebar en móvil
  sidebar?.classList.remove("translate-x-0");
  overlay?.classList.add("hidden");
}

// Manejador para botón "atrás" del navegador
window.addEventListener('popstate', (e) => {
  const page = (e.state && e.state.page) || 'seguimientos/index';
  loadPage(page);
});
