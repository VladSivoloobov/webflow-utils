import fs from 'fs';
import path from 'path';

/**
 * Утилитный класс для взаимодействия с файловой системой.
 */
export default class FileInteractions {
  /**
   * Рекурсивно получает список всех файлов и подпапок по указанному пути.
   *
   * Если элемент является папкой — вызывает себя рекурсивно.
   * Если это файл — добавляет его имя в массив.
   *
   * @param {string} folderPath - Путь к директории, которую нужно прочитать.
   * @returns {Array<string | object>} Массив, содержащий имена файлов и объекты-папки с их содержимым.
   */
  static getAllFilesInFolder(folderPath) {
    const folders = fs.readdirSync(folderPath);

    const output = folders.map((folder) => {
      const nextFolderPath = path.resolve(folderPath, folder);
      const isDirectory = fs.lstatSync(nextFolderPath).isDirectory();

      if (!isDirectory) {
        return folder;
      }

      return { [folder]: FileInteractions.getAllFilesInFolder(nextFolderPath) };
    });

    return output;
  }
}
