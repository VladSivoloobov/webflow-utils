import Output from './Output.js';

export default class Table extends Output {
  type = 'table';
  /**
   * @field Данные таблицы
   * @type {[[string]]}
   * @example
   * ``js
   * this.data = [
   *  ["Страница", "Текст"],
   *  ["Первая страница", "Меня зовут Александр"],
   *  ["Вторая страница", "Гайморит"]
   * ]
   * ``
   */
  data;

  constructor(data) {
    super();
    this.data = data;
  }
}
