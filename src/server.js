import express from 'express';
import config from 'config';
import { getExtensions } from './routes/extensions.js';
import path from 'path';
import Extension from './classes/Extension.js';

console.log('Начинаю импорт расширений');

await Extension.getExtensions();

const PORT = config.PORT || 9090;

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (_, res) => res.sendFile(path.resolve('./public', 'index.html')));

app.get('/extensions', getExtensions);

Extension.importedExtensions.forEach((extension) => {
  console.log(extension.routes);

  if (!extension.routes || !extension.routes.length) return;

  for (const route of extension.routes) {
    app[route.method.toLowerCase()](route.url, route.action);
  }
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
