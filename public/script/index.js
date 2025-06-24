import { DOMAIN } from './config.js';

// Переменные для анимации
const ANIMATION_CLASS = 'animate__animated';
const ITEM_ANIMATION = 'animate__fadeInUp'; // или animate__slideInLeft
const CLICK_ANIMATION = 'animate__rubberBand'; // эффект при клике

let currentActive = null;

console.log(currentActive);

async function fetchExtensions() {
  try {
    const res = await fetch(`${DOMAIN}/extensions`);
    if (!res.ok) throw new Error('Ошибка загрузки данных');
    return await res.json();
  } catch (err) {
    document.getElementById('extensions-list').innerHTML = `
      <li class="text-danger">❌ Ошибка: ${err.message}</li>
    `;
    console.error(err);
  }
}

function renderExtensions(data) {
  const list = document.getElementById('extensions-list');
  list.innerHTML = ''; // очистка

  data.forEach((ext, index) => {
    const li = document.createElement('li');
    li.className = `extension-item ${ANIMATION_CLASS} ${ITEM_ANIMATION}`;
    li.style.animationDelay = `${index * 0.05}s`; // анимация поочерёдно

    if (ext.icon) {
      const img = document.createElement('img');
      img.src = `${DOMAIN}/src/icons/extension-icons/${ext.icon}`;
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
function renderExtensionFields(fields) {
  const container = document.getElementById('extension-fields');
  container.innerHTML = ''; // очистка

  if (!fields || fields.length === 0) return;

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

        // Убираем повторное добавление label
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
      group.appendChild(input); // checkbox уже содержит label
    }

    container.appendChild(group);
  });
}

function showExtensionDetails(extension, element) {
  const titleEl = document.getElementById('selected-extension-title');
  const descEl = document.getElementById('selected-extension-desc');

  document.querySelector('.extension-item.active')?.classList.remove('active');
  element.classList.add('active');

  titleEl.textContent = extension.title;
  descEl.textContent = extension.description;

  // Очистка или рендер полей
  renderExtensionFields(extension.inputs);

  // Рендер результата
  renderExtensionResult(extension.output);

  // Эффект нажатия на кнопку
  if (currentActive) {
    currentActive.classList.remove(CLICK_ANIMATION);
  }

  element.classList.add(CLICK_ANIMATION);
  currentActive = element;
}

// Загрузка и отрисовка
fetchExtensions().then((data) => {
  if (data) renderExtensions(data);
});

function renderExtensionResult(output) {
  console.log(output);
  const tableData = output?.data;

  const container = document.getElementById('extension-result');
  container.innerHTML = ''; // очистка предыдущего результата

  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
    container.innerHTML = '<p>Нет данных для отображения.</p>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'table table-bordered table-striped mt-3';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Заголовки
  tableData[0].forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Тело таблицы
  const tbody = document.createElement('tbody');
  for (let i = 1; i < tableData.length; i++) {
    const row = document.createElement('tr');
    tableData[i].forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}
