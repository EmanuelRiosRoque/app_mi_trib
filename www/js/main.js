import { renderSidebarMenu } from './nav.js';
import { setupNavigation, loadPage } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderSidebarMenu();       // Construye el menú dinámicamente
  setupNavigation();               // Configura eventos de navegación
  loadPage('seguimientos/index');  // Página por defecto
});
