import Extension from '../classes/Extension.js';

const choice = await Extension.showCLI();

/**
 * @type {[Extension]}
 */
const extensions = await Extension.getExtensions();

console.log(choice);
console.log(extensions);

const WebflowExtension = extensions[choice - 1];

console.log(WebflowExtension);
