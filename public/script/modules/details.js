import { CLICK_ANIMATION } from './config.js';
import { currentActive } from './render.js';
import { setCurrentActive } from './animations.js';
import { renderExtensionFields } from './render.js';
import { renderExtensionResult } from './render.js';

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
