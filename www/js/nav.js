export async function fetchNavItems() {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulación de API
    return [
      { nombre: 'Inicio', page: 'home/index', activo: true },
      { nombre: 'Mis seguimientos', page: 'seguimientos/index', activo: true },
      { nombre: 'Perfil', page: 'profile/index', activo: true },
      { nombre: 'Configuración', page: 'settings/index', activo: true },
      { nombre: 'Cerrar sesión', page: 'logout', activo: true }
    ];
  }
  
  export async function renderSidebarMenu() {
    const items = await fetchNavItems();
    const menuContainer = document.getElementById('sidebar-menu');
    menuContainer.innerHTML = '';
  
    items.forEach(item => {
      if (!item.activo) return;
  
      const a = document.createElement('a');
      a.href = '#';
      a.dataset.page = item.page;
      a.className = 'nav-link block px-4 py-2 rounded transition';
      a.textContent = item.nombre;
  
      if (item.page === 'logout') {
        a.classList.add('text-red-600', 'hover:bg-red-500', 'hover:text-white');
      }
  
      menuContainer.appendChild(a);
    });
  }
  