document.addEventListener("DOMContentLoaded", async () => {
    await renderSidebarMenu(); // 👈 construye el menú
  
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const mainArea = document.getElementById("mainContent");
  
    // Sidebar móvil
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("translate-x-0");
      overlay.classList.toggle("hidden");
    });
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
    });
  
    // ✅ FUNCIONALIDAD PRINCIPAL DE NAVEGACIÓN REUTILIZABLE
    window.loadPage = async function (page) {
      if (page === "logout") {
        alert("Cerrando sesión...");
        return;
      }
  
      // Estilos activos en sidebar
      document.querySelectorAll(".nav-link").forEach((l) => {
        l.classList.remove("bg-[#008080]", "text-white", "font-semibold");
        if (page.startsWith(l.dataset.page)) {
          l.classList.add("bg-[#008080]", "text-white", "font-semibold");
        }
      });
  
      // Cargar vista
      try {
        const res = await fetch(`../pages/${page}.html`);
        const html = await res.text();
        mainArea.innerHTML = html;
      } catch (err) {
        mainArea.innerHTML = `<p class="text-red-600">Error al cargar ${page}.html</p>`;
        console.error(err);
      }
  
      // Oculta sidebar en móvil
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
    };
  
    // Delegación de eventos para elementos con data-page
    document.body.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page]");
      if (link) {
        e.preventDefault();
        const page = link.dataset.page;
        window.loadPage(page);
      }
    });
  
    // Cargar página por defecto
    loadPage("seguimientos/index");
  });
  
  async function fetchNavItems() {
    await new Promise(resolve => setTimeout(resolve, 500)); // simula delay
    return [
      { nombre: 'Inicio', page: 'home/index', activo: true },
      { nombre: 'Mis seguimientos', page: 'seguimientos/index', activo: true },
      { nombre: 'Perfil', page: 'profile/index', activo: true },
      { nombre: 'Configuración', page: 'settings/index', activo: true },
      { nombre: 'Cerrar sesión', page: 'logout/index', activo: true }
    ];
  }
  
  async function renderSidebarMenu() {
    const items = await fetchNavItems();
    const menuContainer = document.getElementById('sidebar-menu');
  
    menuContainer.innerHTML = ''; // Limpia menú anterior por si acaso
  
    items.forEach(item => {
      if (!item.activo) return;
  
      const a = document.createElement('a');
      a.href = '#';
      a.dataset.page = item.page;
      a.className = 'nav-link block px-4 py-2 rounded transition'; // 👈 Aquí están los estilos
      a.textContent = item.nombre;
  
      // Estilo especial para cerrar sesión
      if (item.page === 'logout') {
        a.classList.add('text-red-600', 'hover:bg-red-500', 'hover:text-white');
      }
  
      menuContainer.appendChild(a);
    });
  }
  