import Extension from '../../classes/Extension.js';
import Submit from '../../classes/inputs/Submit.js';

export default class Pull extends Extension {
  name = 'webflow-pull';
  description = 'Плагин для вытягивания страниц из webflow';
  title = 'Webflow Pull';
  icon = 'Pull.svg';
  inputs = [new Submit('pull-submit', '⏬ Начать вытягивание')];
}
