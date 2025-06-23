import config from 'config';
import fs from 'fs';
import path from 'path';
import { Webflow } from '../classes/Webflow.js';
import {
  clearLastLine,
  displayLogoAndDisplayQuestions,
  errorCliMessage,
  successCliMessage,
  tryingCliMessage,
} from './src/cli/cli.js';
import chalk from 'chalk';

const __dirname = import.meta.dirname;

const cookies = config.get('cookies');
const projectName = config.get('projectName');
const homepageId = config.get('homepageId');

const pages = await displayLogoAndDisplayQuestions(
  'Webflow Pull',
  'Получаемые страницы (через запятую):',
  'Введите получаемые страницы'
);

const webflow = new Webflow(cookies, projectName);

console.log(chalk.yellow('Получение домашней страницы... 🏠📃'));
const homepageResponse = await webflow.pages.get({ pageId: homepageId });

clearLastLine();
if (homepageResponse.status === 200) {
  console.log(chalk.green('Домашняя страница получена успешно 🎉'));
} else {
  console.log(
    chalk.red('🚫Домашняя страница не получена', homepageResponse.statusText)
  );

  process.exit(-1);
}

const homepage = await homepageResponse.json();

const getPageName = (id) =>
  homepage.pages.find((page) => page['_id'] === id).title;

const mainPath = path.resolve(__dirname, 'webflow');

if (fs.existsSync(mainPath)) {
  fs.rmSync(mainPath, { recursive: true, force: true });
}

fs.mkdirSync(path.resolve(mainPath));

let processedPages = 1;

const filteredPages = homepage.pages
  .filter((page) => page.type !== 'folder')
  .filter((page) => {
    return pages === '*' || pages.includes(getPageName(page['_id']));
  });

if (pages !== '*') {
  const invalidPages = pages.filter(
    (page) =>
      !filteredPages.find(
        (filteredPage) => getPageName(filteredPage['_id']) === page
      )
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

for (const page of filteredPages) {
  const id = page['_id'];

  const progress = ((processedPages / filteredPages.length) * 100).toFixed(2);
  const pageName = getPageName(id);

  tryingCliMessage('Попытка получить страницу', progress, pageName);

  const pageResponse = await webflow.pages.get({ pageId: id });

  if (pageResponse.status === 200) {
    successCliMessage('Страница была получена', progress, pageName);
  } else {
    errorCliMessage(
      'Страница не была получена',
      progress,
      `${pageName} - ${pageResponse.status} ${pageResponse.statusText}`
    );
  }

  const gettedPage = await pageResponse.json();

  const pageFolderPath = path.resolve(mainPath, pageName);

  if (!fs.existsSync(pageFolderPath)) {
    fs.mkdirSync(pageFolderPath);
  }

  fs.writeFileSync(
    path.resolve(pageFolderPath, 'dom.json'),
    JSON.stringify(gettedPage, false, 2)
  );

  const embeds = [];

  gettedPage.domNodes.forEach((domNode, index) => {
    if (domNode.type === 'HtmlEmbed') {
      embeds.push({ index, domNode });
    }
  });

  fs.writeFileSync(
    path.resolve(pageFolderPath, 'dom.spec.json'),
    JSON.stringify(
      embeds.map((elem, index) => ({
        index: elem.index,
        fileName: `${index}.html`,
        id,
      })),
      null,
      2
    )
  );

  embeds.forEach((embed, index) => {
    const embedPath = path.resolve(pageFolderPath, 'embeds');

    if (!fs.existsSync(embedPath)) {
      fs.mkdirSync(embedPath);
    }
    fs.writeFileSync(path.resolve(embedPath, `${index}.html`), embed.domNode.v);
  });

  processedPages++;
}
