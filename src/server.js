import express from 'express';
import config from 'config';
import { getExtensions } from './routes/extensions.js';
import path from 'path';

const PORT = config.PORT || 9090;

const app = express();

app.use(express.static('public'));

app.get('/', (_, res) => res.sendFile(path.resolve('./public', 'index.html')));

app.get('/extensions', getExtensions);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
