import fs from "fs";
import path from "path";

export default class FileInteractions {
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
