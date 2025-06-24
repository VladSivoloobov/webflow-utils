import Extension from '../../classes/Extension.js';
import Input from '../../classes/inputs/Input.js';
import Submit from '../../classes/inputs/Submit.js';
import Password from '../../classes/inputs/Password.js';

export default class General extends Extension {
  title = 'Авторизация';
  description = 'Здесь вы можете авторизоваться в Webflow.';
  icon = 'General.svg';
  name = 'general';

  inputs = [
    new Input('webflow-login', 'Логин'),
    new Password('webflow-password', 'Пароль'),
    new Submit('general-ready', 'Войти'),
  ];
}
