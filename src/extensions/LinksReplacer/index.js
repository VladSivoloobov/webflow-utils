import Extension from '../../classes/Extension.js';
import fs from 'fs';
import FileInteractions from '../../classes/FileInteractions.js';
import path from 'path';
import Table from '../../classes/outputs/Table.js';
import Link from '../../classes/components/Link.js';

export default class LinksExtension extends Extension {
  description = 'Плагин для автоматического изменения ссылок по всему проекту';
  title = 'Links Replacer';
  icon = 'LinksReplacer.png';
  name = 'links-extension';

  constructor() {
    super();
    const files = FileInteractions.getAllFilesInFolder(
      path.resolve(Extension.downloadFolder)
    );

    console.log(files);

    console.log();

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
