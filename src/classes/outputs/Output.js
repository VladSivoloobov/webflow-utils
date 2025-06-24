export default class Output {
  type;
  data;

  constructor() {
    if (this.constructor === 'Output') {
      throw new Error('Класс абстрактный и не может быть создан');
    }
  }
}
