import Extension from '../../classes/Extension.js';
import fs from 'fs';
import FileInteractions from '../../classes/FileInteractions.js';
import path from 'path';
import Table from '../../classes/outputs/Table.js';
import Link from '../../classes/components/Link.js';
import Input from '../../classes/inputs/Input.js';
import Submit from '../../classes/inputs/Submit.js';

/**
 * Расширение для автоматического изменения ссылок по всему проекту.
 *
 * Предназначено для массовой замены, обновления и анализа ссылок в DOM-структуре Webflow-сайта.
 */
export default class LinksExtension extends Extension {
  description =
    'Плагин для автоматического изменения ссылок по всему проекту. Позволяет находить и заменять ссылки во всех файлах проекта.';
  title = 'Links Replacer';
  icon = 'LinksReplacer.png';
  name = 'links-extension';

  inputs = [
    new Input('links-search', 'Поиск страницы'),
    new Submit('links-submit', 'Готово'),
  ];

  constructor() {
    super();
    const files = FileInteractions.getAllFilesInFolder(
      path.resolve(Extension.downloadFolder)
    );

    this.output = new Table([
      ['Страница'],
      ...files.map((element) => {
        const key = Object.keys(element)[0];
        const link = new Link(key, '?' + key);

        return [link];
      }),
    ]);
  }

  #readFile() {}
}
