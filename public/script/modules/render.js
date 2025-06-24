import { ANIMATION_CLASS, ITEM_ANIMATION, CLICK_ANIMATION } from './config.js';
import { showExtensionDetails } from './details.js';

export let currentActive = null;

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
      img.src = `${ext.iconPath || ''}${ext.icon}`;
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

export function renderExtensionFields(fields) {
  const container = document.getElementById('extension-fields');
  if (!container || !fields || fields.length === 0) return;
  container.innerHTML = '';

  fields.forEach((field) => {
    const group = document.createElement('div');
    group.className = 'mb-3';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', `field-${field.name}`);
    label.className = 'form-label';
    group.appendChild(label);

    let input;

    switch (field.type) {
      case 'text':
      case 'number':
        input = document.createElement('input');
        input.type = field.type;
        input.id = `field-${field.name}`;
        input.name = field.name;
        input.className = 'form-control';
        break;

      case 'checkbox':
        input = document.createElement('div');
        input.className = 'form-check';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `field-${field.name}`;
        checkbox.name = field.name;
        checkbox.className = 'form-check-input';

        const checkLabel = document.createElement('label');
        checkLabel.textContent = field.label;
        checkLabel.setAttribute('for', `field-${field.name}`);
        checkLabel.className = 'form-check-label';

        input.appendChild(checkbox);
        input.appendChild(checkLabel);

        group.removeChild(label);
        break;

      case 'select':
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
        break;

      default:
        console.warn(`Неизвестный тип поля: ${field.type}`);
        return;
    }

    if (field.type !== 'checkbox') {
      group.appendChild(input);
    } else {
      group.appendChild(input);
    }

    container.appendChild(group);
  });
}

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

  table.appendChild(tbody);
  container.appendChild(table);
}
