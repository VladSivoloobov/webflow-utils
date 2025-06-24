import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Input from './inputs/Input.js';
import Output from './outputs/Output.js';

export default class Extension {
  static extensionFolder = 'extensions';
  static downloadFolder = 'webflow';
  static extensionList = fs.readdirSync(
    path.resolve('src', this.extensionFolder)
  );

  /**
   * @type {string}
   * @field
   * @requires
   */
  name;

  /**
   * @type {string}
   */
  description;

  /**
   * @type {string}
   */
  title;

  /**
   * @type {string}
   */
  icon;

  /**
   * @type {[Input]}
   */
  inputs;

  /**
   * @type {[Output]}
   */
  output;

  /**
   * @type {[any]}
   */
  routes;

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
