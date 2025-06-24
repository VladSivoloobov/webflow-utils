import Output from './Output.js';

/**
 * Конкретная реализация вывода данных в виде таблицы.
 * Наследуется от абстрактного класса {@link Output}.
 *
 * @extends Output
 */
export default class Table extends Output {
  /**
   * Тип вывода. У таблиц всегда равен `'table'`.
   *
   * @type {string}
   * @override
   */
  type = 'table';

  /**
   * Двумерный массив строк, представляющий данные таблицы.
   * Первый элемент — заголовки столбцов.
   *
   * @field
   * @type {Array<Array<string>>}
   * @example
   * ``js
   * this.data = [
   *   ["Страница", "Текст"],
   *   ["Первая страница", "Меня зовут Александр"],
   *   ["Вторая страница", "Гайморит"]
   * ];
   * ``
   */
  data;

  /**
   * Создаёт экземпляр класса Table.
   *
   * @param {Array<Array<string>>} data - Двумерный массив строк для отображения в виде таблицы.
   */
  constructor(data) {
    super();
    this.data = data;
  }
}
