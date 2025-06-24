import Extension from '../../classes/Extension.js';
import Input from '../../classes/inputs/Input.js';
import Submit from '../../classes/inputs/Submit.js';
import Password from '../../classes/inputs/Password.js';
import Route from '../../classes/Route.js';
import Webflow from '../../classes/webflow/Webflow.js';

export default class General extends Extension {
  title = 'Авторизация';
  description = 'Здесь вы можете авторизоваться в Webflow.';
  icon = 'General.svg';
  name = 'general';

  inputs = [
    new Input('webflow-cookie', 'Cookie'),
    new Input('webflow-xsrf-token', 'XSRF-TOKEN'),
    new Input('webflow-project', 'Проект'),
    new Submit('general-ready', 'Войти', 'general-auth'),
  ];

  routes = [
    new Route(
      `/${this.name}/auth`,
      async (req, res) => {
        await Webflow.auth(req.body.cookie, req.body.xsrfToken);

        return res.json({ ok: true }).status(200);
      },
      'POST'
    ),
  ];
}
