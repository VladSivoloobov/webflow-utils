/**
 * @fileoverview Модуль отвечает за отображение деталей выбранного расширения.
 * Обновляет интерфейс, применяет стили и анимации, вызывает рендеринг данных.
 */

import { CLICK_ANIMATION } from './config.js';
import { currentActive } from './render.js';
import { setCurrentActive } from './animations.js';
import { renderExtensionFields } from './render.js';
import { renderExtensionResult } from './render.js';

/**
 * Обрабатывает выбор расширения пользователем: обновляет интерфейс,
 * применяет стили активного элемента, запускает анимацию клика и
 * вызывает рендеринг полей ввода и результата работы расширения.
 *
 * @param {Object} extension - Данные расширения.
 * @param {string} extension.title - Заголовок расширения.
 * @param {string} extension.description - Описание расширения.
 * @param {Array} extension.inputs - Массив объектов с полями ввода.
 * @param {any} extension.output - Результат выполнения расширения.
 * @param {string} extension.name - Имя расширения.
 * @param {HTMLElement} [element] - DOM-элемент, представляющий расширение (для подсветки и анимации).
 */
export function showExtensionDetails(extension, element) {
  const titleEl = document.getElementById('selected-extension-title');
  const descEl = document.getElementById('selected-extension-desc');

  // Убираем активный класс у предыдущего элемента
  document.querySelector('.extension-item.active')?.classList.remove('active');

  if (element) {
    element.classList.add('active');

    // Анимация клика
    if (currentActive) {
      currentActive.classList.remove(CLICK_ANIMATION);
    }

    element.classList.add(CLICK_ANIMATION);
    setCurrentActive(element);
  }

  // Обновляем заголовок и описание
  if (titleEl) titleEl.textContent = extension.title;
  if (descEl) descEl.textContent = extension.description;

  // Рендер полей и результата
  renderExtensionFields(extension.inputs);
  renderExtensionResult(extension.output, extension.name);
}
