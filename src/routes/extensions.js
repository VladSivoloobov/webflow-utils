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
        ...extension,
      }))
    )
    .status(200);
}
