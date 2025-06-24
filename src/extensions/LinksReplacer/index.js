import Extension from '../../classes/Extension.js';
import fs from 'fs';
import FileInteractions from '../../classes/FileInteractions.js';
import path from 'path';
import Table from '../../classes/outputs/Table.js';

export default class LinksExtension extends Extension {
  description = 'Плагин для автоматического изменения ссылок по всему проекту';
  title = 'Links Replacer';
  icon = 'LinksReplacer.png';

  constructor() {
    super();
    const files = FileInteractions.getAllFilesInFolder(
      path.resolve(Extension.downloadFolder)
    );

    console.log(files);

    console.log();

    this.output = new Table([
      ['Страница'],
      ...files.map((element) => [Object.keys(element)[0]]),
    ]);
  }

  #readFile() {}
}
