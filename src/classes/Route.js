/**
 * Класс, представляющий маршрут в приложении Express.
 *
 * @example
 * const route = new Route('/users', (req, res) => {
 *   return res.json({ message: 'Hello!' });
 * }, 'GET');
 */
export default class Route {
  /**
   * URL-путь маршрута.
   *
   * @type {string}
   */
  url;

  /**
   * HTTP-метод маршрута. По умолчанию 'GET'.
   *
   * @type {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}
   */
  method = 'GET';

  /**
   * Функция-обработчик маршрута.
   * Принимает объекты запроса и ответа Express и возвращает ответ.
   *
   * @type {(req: import('express').Request, res: import('express').Response) => import('express').Response}
   */
  action;

  /**
   * Создаёт новый экземпляр маршрута.
   *
   * @param {string} url - URL-адрес маршрута (например, '/users').
   * @param {(req: import('express').Request, res: import('express').Response) => import('express').Response} action - Обработчик маршрута.
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} [method='GET'] - HTTP-метод для маршрута.
   */
  constructor(url, action, method = 'GET') {
    this.url = url;
    this.action = action;
    this.method = method;
  }
}
