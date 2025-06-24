import Extension from '../classes/Extension.js';

/**
 * Возвращает список расширений
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
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

/**
 * Получает данные от расширений
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function postExtensionAction(req, res) {
  const action = req.body;

  console.log(action);
}
