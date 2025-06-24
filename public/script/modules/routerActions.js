/**
 * @fileoverview
 * Модуль для загрузки данных о расширении по имени и отображения его деталей.
 * Используется в маршрутизации на основе URL-хэша.
 */

import { fetchExtensions } from './fetch.js';
import { showExtensionDetails } from './details.js';

/**
 * Загружает список расширений и отображает детали указанного расширения.
 *
 * @param {string} extensionName - Имя расширения, которое нужно найти и отобразить.
 * @param {string} data - Дополнительные данные, переданные через URL (пока не используются, но могут быть применены в будущем).
 *
 * @returns {Promise<void>}
 */
export async function loadExtensionAndShowDetails(extensionName, data) {
  const extensions = await fetchExtensions();
  const extension = extensions.find((ext) => ext.name === extensionName);

  if (extension) {
    showExtensionDetails(extension, null);
  } else {
    console.warn(`Расширение "${extensionName}" не найдено`);
  }
}
