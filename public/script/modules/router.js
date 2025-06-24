import { loadExtensionAndShowDetails } from './routerActions.js';

export function setupRouter() {
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const extensionName = params.get('extension');
    const data = params.get('data');

    if (extensionName && data) {
      loadExtensionAndShowDetails(extensionName, data);
    }
  });

  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const extensionName = params.get('extension');
    const data = params.get('data');

    if (extensionName && data) {
      loadExtensionAndShowDetails(extensionName, data);
    }
  }
}
