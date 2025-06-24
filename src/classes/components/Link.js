import Component from './Component.js';
/**
 * Конкретная реализация компонента-ссылки.
 * Наследуется от абстрактного класса {@link Component}.
 *
 * @extends Component
 */
export default class Link extends Component {
  /**
   * Тип компонента. У ссылок всегда равен `'link'`.
   *
   * @type {string}
   */
  type = 'link';

  /**
   * Создаёт экземпляр ссылки.
   *
   * @param {string} text - Отображаемый текст ссылки.
   * @param {string} source - URL или путь, на который ведёт ссылка.
   */
  constructor(text, source) {
    super();

    /**
     * Отображаемый текст ссылки.
     * @type {string}
     */
    this.text = text;

    /**
     * Источник (URL или путь), на который ведёт ссылка.
     * @type {string}
     */
    this.source = source;
  }
}
