import Input from './Input.js';

export default class Submit extends Input {
  type = 'submit';
  /**
   * @type {string}
   */
  action;

  constructor(name, label, action) {
    super(name, label);
    this.action = action;
  }
}
