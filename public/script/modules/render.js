/**
 * @fileoverview
 * Модуль отвечает за отрисовку элементов интерфейса:
 * список расширений, поля ввода и результаты выполнения.
 */

import { ANIMATION_CLASS, ITEM_ANIMATION, CLICK_ANIMATION } from './config.js';
import { showExtensionDetails } from './details.js';
import serverFunctions from './serverFunctions.js';

/**
 * Хранит ссылку на текущий активный элемент (для анимации).
 * @type {HTMLElement|null}
 */
export let currentActive = null;

/**
 * Отрисовывает список расширений в интерфейсе.
 *
 * Каждому элементу списка применяется анимация появления,
 * устанавливается обработчик клика для отображения деталей расширения.
 *
 * @param {Array<Object>} data - Массив объектов с данными о расширениях.
 * @param {string} data[].title - Название расширения.
 * @param {string} [data[].icon] - Имя файла иконки расширения.
 */
export function renderExtensions(data) {
  const list = document.getElementById('extensions-list');
  if (!list) return;
  list.innerHTML = '';

  data.forEach((ext, index) => {
    const li = document.createElement('li');
    li.className = `extension-item ${ANIMATION_CLASS} ${ITEM_ANIMATION}`;
    li.style.animationDelay = `${index * 0.05}s`;

    if (ext.icon) {
      const img = document.createElement('img');
      img.src = `src/icons/extension-icons/${ext.icon}`;
      img.alt = ext.title;
      li.appendChild(img);
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = ext.title;
    li.appendChild(textSpan);

    li.onclick = () => showExtensionDetails(ext, li);

    list.appendChild(li);
  });
}

/**
 * Отрисовывает поля ввода для выбранного расширения.
 *
 * Поддерживает типы: text, number, checkbox, select, submit, password.
 * Для типа submit метка (label) не отображается.
 *
 * @param {Array<Object>} fields - Массив объектов с описанием полей ввода.
 * @param {string} fields[].label - Текст метки (label).
 * @param {string} fields[].name - Имя поля.
 * @param {string} fields[].type - Тип поля: text, number, checkbox, select, submit.
 * @param {Array<string>} [fields[].options] - Список опций для типа select.
 * @param {Function} [fields[].onSubmit] - Callback для типа submit. Принимает собранные данные формы.
 */
export function renderExtensionFields(fields) {
  const container = document.getElementById('extension-fields');
  container.innerHTML = '';
  if (!container || !fields || fields.length === 0) return;

  fields.forEach((field) => {
    const group = document.createElement('div');
    group.className = 'mb-3';

    let input;

    switch (field.type) {
      case 'text':
      case 'password':
      case 'number':
        // Создаем label
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', `field-${field.name}`);
        label.className = 'form-label';
        group.appendChild(label);

        input = document.createElement('input');
        input.type = field.type;
        input.id = `field-${field.name}`;
        input.name = field.name;
        input.className = 'form-control';
        group.appendChild(input);
        break;

      case 'checkbox':
        const checkLabel = document.createElement('label');
        checkLabel.className = 'form-check-label';

        input = document.createElement('div');
        input.className = 'form-check';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `field-${field.name}`;
        checkbox.name = field.name;
        checkbox.className = 'form-check-input';

        checkLabel.textContent = field.label;
        checkLabel.setAttribute('for', `field-${field.name}`);

        input.appendChild(checkbox);
        input.appendChild(checkLabel);

        group.appendChild(input);
        break;

      case 'select':
        const selectLabel = document.createElement('label');
        selectLabel.textContent = field.label;
        selectLabel.setAttribute('for', `field-${field.name}`);
        selectLabel.className = 'form-label';
        group.appendChild(selectLabel);

        input = document.createElement('select');
        input.id = `field-${field.name}`;
        input.name = field.name;
        input.className = 'form-select';

        field.options.forEach((option) => {
          const opt = document.createElement('option');
          opt.value = option.toLowerCase();
          opt.textContent = option;
          input.appendChild(opt);
        });
        group.appendChild(input);
        break;

      case 'submit':
        input = document.createElement('button');
        input.type = 'button';
        input.className = 'btn btn-primary';
        input.textContent = field.label || 'Выполнить';

        const func = serverFunctions(field.action);

        input.onclick = func;
        group.appendChild(input); // Добавляем кнопку напрямую, без label
        break;

      default:
        console.warn(`Неизвестный тип поля: ${field.type}`);
        return;
    }

    container.appendChild(group);
  });
}

/**
 * Отрисовывает результат работы расширения в виде таблицы.
 *
 * Если данные отсутствуют — выводит сообщение "Нет данных для отображения".
 * Поддерживает ячейки с текстом и ссылками.
 * Клик по заголовку таблицы позволяет сворачивать/разворачивать содержимое.
 *
 * @param {Object} output - Результат выполнения расширения.
 * @param {Array<Array<string|Object>>} output.data - Двумерный массив данных для отображения.
 * @param {string} extension - Имя расширения, используется для генерации ссылок.
 */
export function renderExtensionResult(output, extension) {
  const tableData = output?.data;
  const container = document.getElementById('extension-result');
  if (!container) return;
  container.innerHTML = '';

  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
    container.innerHTML = '<p>Нет данных для отображения.</p>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'table table-bordered table-striped mt-3';

  const thead = document.createElement('thead');
  thead.className = 'clickable';
  thead.style.cursor = 'pointer';
  thead.style.userSelect = 'none';

  const headerRow = document.createElement('tr');

  tableData[0].forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let i = 1; i < tableData.length; i++) {
    const row = document.createElement('tr');

    tableData[i].forEach((cell) => {
      const td = document.createElement('td');

      const params = new URLSearchParams({
        extension,
        data: cell.source,
        action: 'change-page',
      });

      if (cell && cell.type === 'link') {
        const link = document.createElement('a');
        link.href = `#${params.toString()}`;
        link.textContent = cell.text;
        link.rel = 'noopener noreferrer';
        td.appendChild(link);
      } else {
        td.textContent = cell;
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  }

  // Событие клика на thead
  thead.addEventListener('click', () => {
    const isVisible = !tbody.hidden;
    tbody.hidden = isVisible;
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
