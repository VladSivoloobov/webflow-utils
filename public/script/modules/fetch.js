import { DOMAIN } from './config.js';

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
