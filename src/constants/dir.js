import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectFileRoot = path.resolve(__dirname, '..', '..');
export const projectUrlRoot = pathToFileURL(projectFileRoot);
