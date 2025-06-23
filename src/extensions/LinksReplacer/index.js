import Extension from '../../classes/Extension.js';
import fs from 'fs';
import FileInteractions from '../../classes/FileInteractions.js';
import path from 'path';

export default class LinksExtension extends Extension {
  description = 'Плагин для автоматического изменения ссылок по всему проекту';
  title = 'Links Replacer';
  icon = 'LinksReplacer.png';

  constructor() {
    super();
    const files = FileInteractions.getAllFilesInFolder(
      path.resolve(Extension.downloadFolder)
    );

    this.table = files;
  }
}
