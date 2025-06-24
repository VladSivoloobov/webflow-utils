import { fetchExtensions } from './fetch.js';
import { showExtensionDetails } from './details.js';

export async function loadExtensionAndShowDetails(extensionName, data) {
  const extensions = await fetchExtensions();
  const extension = extensions.find((ext) => ext.name === extensionName);

  if (extension) {
    showExtensionDetails(extension, null);
  } else {
    console.warn(`Расширение "${extensionName}" не найдено`);
  }
}
