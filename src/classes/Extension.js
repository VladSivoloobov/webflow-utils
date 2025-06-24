import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Input from './inputs/Input.js';
import Output from './outputs/Output.js';
import chalk from 'chalk';
import Route from './Route.js';

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
   * @type {Route[]}
   */
  routes;

  /**
   * Категория расширения
   *
   * @type {string}
   */
  category;

  /**
   * @type {[Extension]}
   */
  static importedExtensions;

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

      console.log(chalk.green(extension, 'OK ✔'));

      return (await import(extensionPath)).default;
    });

    const extensions = (await Promise.all(importedExtensions)).map(
      (extension) => new extension()
    );

    Extension.importedExtensions = extensions;

    return extensions;
  }
}
