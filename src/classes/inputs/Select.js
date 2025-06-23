import Input from './Input.js';

export default class Select extends Input {
  type = 'select';
  options = [];

  constructor(name, label, { options }) {
    super(name, label);
    this.options = options;
  }
}
