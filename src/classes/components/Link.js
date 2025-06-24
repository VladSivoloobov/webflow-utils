import Component from './Component.js';

export default class Link extends Component {
  type = 'link';

  constructor(text, source) {
    super();

    this.text = text;
    this.source = source;
  }
}
