export default class Component {
  /**
   * @type {string}
   */
  type;

  constructor() {
    if (this.constructor === 'Component') {
      throw new Error('Абстрактный класс нельзя создавать');
    }
  }
}
