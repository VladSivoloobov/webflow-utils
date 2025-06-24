/**
 * Абстрактный базовый класс для создания компонентов.
 * Не может быть инстанцирован напрямую. Должен быть унаследован другими классами.
 *
 * @abstract
 */
export default class Component {
  /**
   * Тип компонента.
   *
   * @type {string}
   */
  type;

  /**
   * @constructs Component
   * @throws {Error} Если вызван непосредственно, без наследования.
   */
  constructor() {
    if (this.constructor === Component) {
      throw new Error('Абстрактный класс нельзя создавать');
    }
  }
}
