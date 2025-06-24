/**
 * Класс, представляющий модель HTML-поля ввода.
 */
export default class Input {
  /**
   * Тип поля ввода. По умолчанию — `'text'`.
   *
   * @type {import("react").HTMLInputTypeAttribute}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   */
  type = 'text';

  /**
   * Имя поля ввода. Используется как значение атрибута `name` в HTML.
   *
   * @type {string}
   */
  name;

  /**
   * Метка (лейбл), связанная с полем ввода.
   *
   * @type {string}
   */
  label;

  /**
   * Создаёт экземпляр класса Input.
   *
   * @param {string} name - Имя поля ввода.
   * @param {string} label - Текст метки (лейбла).
   */
  constructor(name, label) {
    this.name = name;
    this.label = label;
  }
}
