/**
 * @fileoverview
 * Конфигурационный модуль приложения.
 * Содержит глобальные константы, используемые для настройки анимаций и домена API.
 */

/**
 * Базовый домен для API-запросов.
 * @type {string}
 */
export const DOMAIN = 'http://localhost:9090';

/**
 * Базовый CSS-класс для подключения анимаций (через animate.css).
 * @type {string}
 */
export const ANIMATION_CLASS = 'animate__animated';

/**
 * Анимация появления элемента сверху.
 * @type {string}
 */
export const ITEM_ANIMATION = 'animate__fadeInUp';

/**
 * Анимация "резиновой ленты" для визуального отклика на клик.
 * @type {string}
 */
export const CLICK_ANIMATION = 'animate__rubberBand';
