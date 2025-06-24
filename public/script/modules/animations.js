/**
 * @fileoverview
 * Модуль отвечает за логику анимаций в приложении.
 * Управляет текущим активным элементом и применяет/удаляет анимации на основе взаимодействия с пользователем.
 */

import { CLICK_ANIMATION } from './config.js';

/**
 * Хранит ссылку на текущий активный элемент для управления анимациями.
 * @type {HTMLElement|null}
 */
let _currentActive = null;

/**
 * Возвращает текущий активный элемент, которому применяется анимация клика.
 *
 * @returns {HTMLElement|null} Текущий активный элемент или null, если не установлен.
 */
export function getCurrentActive() {
  return _currentActive;
}

/**
 * Устанавливает новый активный элемент и удаляет анимацию с предыдущего.
 * Применяет анимацию "нажатия" к новому элементу через класс `CLICK_ANIMATION`.
 *
 * @param {HTMLElement|null} element - Новый элемент, который становится активным.
 */
export function setCurrentActive(element) {
  const previous = getCurrentActive();
  if (previous) {
    previous.classList.remove(CLICK_ANIMATION);
  }
  _currentActive = element;
}
