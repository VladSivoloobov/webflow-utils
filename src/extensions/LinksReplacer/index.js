import Extension from '../../classes/Extension.js';
import fs from 'fs';

export default class LinksExtension extends Extension {
  description = 'Плагин для автоматического изменения ссылок по всему проекту';
  title = 'Links Replacer';
  icon = 'LinksReplacer.png';
}
