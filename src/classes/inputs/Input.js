export default class Input {
  /**
   * @type {import("react").HTMLInputTypeAttribute}
   */
  type = 'text';

  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   */
  label;

  constructor(name, label) {
    this.name = name;
    this.label = label;
  }
}
