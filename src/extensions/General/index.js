import Extension from '../../classes/Extension.js';
import Input from '../../classes/inputs/Input.js';

export default class General extends Extension {
  title = 'Общее';
  description = 'Здесь вы можете настроить приложение';
  icon = 'General.svg';
  name = 'general';

  inputs = [
    new Input('cookies', 'Введите ваши куки'),
    new Input('xsrf-token', 'Введите XSRF-TOKEN'),
    new Input('project-id', 'Введите project-id'),
    new Input('project-name', 'Введите имя проекта'),
  ];
}
