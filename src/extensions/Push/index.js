import Extension from '../../classes/Extension.js';
import Submit from '../../classes/inputs/Submit.js';

export default class Push extends Extension {
  name = 'webflow-push';
  description = 'Плагин для отправки модифицированных страниц';
  title = 'Webflow Push';
  icon = 'Push.svg';
  inputs = [new Submit('push-submit', '⏫ Начать отправку')];
}
