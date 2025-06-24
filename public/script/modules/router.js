/**
 * @fileoverview
 * Модуль настройки клиентского роутера на основе URL-хэша.
 * Обрабатывает изменения хэша и вызывает соответствующие действия для отображения расширений.
 */

import { loadExtensionAndShowDetails } from './routerActions.js';

/**
 * Инициализирует клиентский роутер, отслеживающий изменения URL-хэша.
 *
 * При наличии параметров `extension` и `data` в хэше,
 * вызывает {@link loadExtensionAndShowDetails} для загрузки и отображения деталей расширения.
 */
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

  // Обработка начального хэша при загрузке страницы
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
