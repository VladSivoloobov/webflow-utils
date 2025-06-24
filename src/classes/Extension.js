import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Input from './inputs/Input.js';
import Output from './outputs/Output.js';

/**
 * Класс, представляющий расширение приложения.
 * Содержит данные о его интерфейсе, выводе и маршрутах.
 */
export default class Extension {
  /**
   * Папка, в которой хранятся все расширения.
   *
   * @type {string}
   * @static
   */
  static extensionFolder = 'extensions';

  /**
   * Папка, куда можно сохранять результаты работы расширений.
   *
   * @type {string}
   * @static
   */
  static downloadFolder = 'webflow';

  /**
   * Список папок-расширений в директории `extensionFolder`.
   *
   * @type {string[]}
   * @static
   */
  static extensionList = fs.readdirSync(
    path.resolve('src', this.extensionFolder)
  );

  /**
   * Уникальное имя расширения (используется как идентификатор).
   *
   * @type {string}
   * @field
   */
  name;

  /**
   * Краткое описание расширения.
   *
   * @type {string}
   */
  description;

  /**
   * Отображаемое название расширения.
   *
   * @type {string}
   */
  title;

  /**
   * Путь к иконке расширения.
   *
   * @type {string}
   */
  icon;

  /**
   * Массив входных полей расширения.
   *
   * @type {Input[]}
   */
  inputs;

  /**
   * Массив выходных данных расширения.
   *
   * @type {Output[]}
   */
  output;

  /**
   * Дополнительные маршруты или параметры расширения.
   *
   * @type {any[]}
   */
  routes;

  /**
   * Загружает и возвращает массив всех доступных расширений.
   *
   * @returns {Promise<Extension[]>} Массив инстансов расширений.
   * @static
   * @async
   */
  static async getExtensions() {
    const importedExtensions = this.extensionList.map(async (extension) => {
      const extensionPath = pathToFileURL(
        path.resolve('src', this.extensionFolder, extension, 'index.js')
      );

      return (await import(extensionPath)).default;
    });

    return await Promise.all(importedExtensions);
  }
}
