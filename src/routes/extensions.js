import Extension from '../classes/Extension.js';

export async function getExtensions(req, res) {
  const importedModules = await Extension.getExtensions();
  /**
   * @type {[Extension]}
   */
  const extensions = importedModules.map(
    (WebflowExtension) => new WebflowExtension()
  );

  return res
    .json(
      extensions.map((extension) => ({
        title: extension.title,
        description: extension.description,
        icon: extension.icon,
        inputs: extension.inputs,
      }))
    )
    .status(200);
}
