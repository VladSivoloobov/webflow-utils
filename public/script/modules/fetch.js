/**
 * @fileoverview
 * Модуль для работы с API расширений.
 * Содержит функции для получения данных о расширениях с сервера.
 */

import { DOMAIN } from './config.js';

/**
 * Получает список расширений с сервера по адресу `${DOMAIN}/extensions`.
 *
 * В случае успешного ответа, возвращает массив объектов с данными расширений.
 * При ошибке — выводит сообщение об ошибке в интерфейс и возвращает пустой массив.
 *
 * @returns {Promise<Array<Object>>} Массив объектов расширений или пустой массив в случае ошибки.
 */
export async function fetchExtensions() {
  try {
    const res = await fetch(`${DOMAIN}/extensions`);
    if (!res.ok) throw new Error('Ошибка загрузки данных');
    return await res.json();
  } catch (err) {
    const list = document.getElementById('extensions-list');
    if (list) {
      list.innerHTML = `<li class="text-danger">❌ Ошибка: ${err.message}</li>`;
    }
    console.error(err);
    return [];
  }
}
