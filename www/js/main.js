import { renderSidebarMenu } from './nav.js';
import { setupNavigation, loadPage } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  const auth = localStorage.getItem('auth');

  // Si no está autenticado, redirige al index 'welcome'
  if (auth !== 'true') {
    location.replace('/index.html');
    return;
  }

  await renderSidebarMenu();       
  setupNavigation();               

  const initialPage = location.hash ? location.hash.substring(1) : 'seguimientos/index';
  loadPage(initialPage);
  history.replaceState({ page: initialPage }, '', `#${initialPage}`);
});
