/**
 * @fileoverview Обработчики маршрутов для работы с расширениями.
 */

import Extension from '../classes/Extension.js';

/**
 * Возвращает список всех доступных расширений.
 *
 * @param {import('express').Request} req - Объект запроса Express.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {import('express').Response} JSON-ответ со списком расширений.
 */
export async function getExtensions(req, res) {
  try {
    return res.status(200).json(Extension.importedExtensions);
  } catch (error) {
    console.error('Ошибка при загрузке расширений:', error);
    return res
      .status(500)
      .json({ error: 'Не удалось загрузить список расширений' });
  }
}

/**
 * Обрабатывает действие, отправленное клиентом (например, выполнение расширения).
 *
 * @param {import('express').Request} req - Объект запроса Express.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {import('express').Response} Ответ с подтверждением получения действия.
 */
export async function postExtensionAction(req, res) {
  const action = req.body;

  if (!action || typeof action !== 'object') {
    return res.status(400).json({ error: 'Некорректные данные действия' });
  }

  console.log('Получено действие от клиента:', action);

  // TODO: Добавить логику выполнения действия расширения

  return res.status(200).json({ status: 'ok', received: true });
}
