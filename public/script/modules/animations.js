import { ANIMATION_CLASS, ITEM_ANIMATION, CLICK_ANIMATION } from './config.js';

let _currentActive = null;

export function getCurrentActive() {
  return _currentActive;
}

export function setCurrentActive(element) {
  const previous = getCurrentActive();
  if (previous) {
    previous.classList.remove(CLICK_ANIMATION);
  }
  _currentActive = element;
}
