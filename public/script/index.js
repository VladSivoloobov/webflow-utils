import { fetchExtensions } from './modules/fetch.js';
import { renderExtensions } from './modules/render.js';
import { setupRouter } from './modules/router.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchExtensions();
  if (data) {
    renderExtensions(data);
  }

  setupRouter();
});
