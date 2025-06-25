import chalk from 'chalk';
import config from 'config';
import fs from 'fs';
import path from 'path';
import {
  displayLogoAndDisplayQuestions,
  errorCliMessage,
  successCliMessage,
  tryingCliMessage,
} from '../CLI/index.js';
import FileInteractions from '../classes/FileInteractions.js';
import Webflow from '../classes/webflow/Webflow.js';

const __dirname = import.meta.dirname;
const rootPath = path.resolve(import.meta.dirname, 'webflow');

const pages = await displayLogoAndDisplayQuestions(
  'Webflow Push',
  'Отправляемые страницы (через запятую):',
  'Введите, пожалуйста список отправляемых страниц'
);

const cookies = config.get('cookies');
const projectName = config.get('projectName');

const webflow = new Webflow(cookies, projectName);

const webflowFolders = FileInteractions.getAllFilesInFolder(rootPath).filter(
  (folder) => pages === '*' || pages.includes(Object.keys(folder)[0])
);

if (pages !== '*') {
  const invalidPages = pages.filter(
    (page) => !webflowFolders.find((folder) => Object.keys(folder)[0] === page)
  );

  if (invalidPages.length) {
    console.log(
      chalk.red(
        'Неверные страницы, они будут проигнорированы:',
        invalidPages.join(', ')
      )
    );
  }
}

let pagesLoaded = 1;

for (const folder of webflowFolders) {
  let pageIndex;
  let domNodes;

  for (const [folderName, childFiles] of Object.entries(folder)) {
    const files = childFiles.filter(
      (file) => file !== 'dom.json' && file !== 'dom.spec.json'
    );
    if (files.length === 0) continue;

    const dir = path.resolve(rootPath, folderName);

    const domSpecStream = fs.readFileSync(path.resolve(dir, 'dom.spec.json'));
    const domStream = fs.readFileSync(path.resolve(dir, 'dom.json'));

    const domSpec = JSON.parse(domSpecStream.toString());
    const dom = JSON.parse(domStream.toString());

    domNodes = dom.domNodes;

    for (const childFile of files) {
      if (childFile.embeds) {
        for (const embed of childFile.embeds) {
          const { index, id: pageId } = domSpec.find(
            (spec) => spec.fileName === embed
          );
          const fileStream = fs.readFileSync(
            path.resolve(dir, 'embeds', embed)
          );

          dom.domNodes[index].v = fileStream.toString();
          dom.domNodes[index].data.embed.meta.html = fileStream.toString();

          pageIndex = pageId;
        }
      }
    }
  }

  if (!pageIndex) continue;

  const folderName = Object.keys(folder)[0];
  const progress = ((pagesLoaded / webflowFolders.length) * 100).toFixed(2);

  tryingCliMessage('Попытка отправить страницу:', progress, folderName);

  const response = await webflow.dom.push(pageIndex, {
    nodes: domNodes,
  });

  if (response.status === 200) {
    successCliMessage('Страница успешно отправлена:', progress, folderName);
  } else {
    errorCliMessage(
      'Страница не была отправлена:',
      progress,
      `${folderName} - ${response.statusText}`
    );
  }

  pagesLoaded++;
}
