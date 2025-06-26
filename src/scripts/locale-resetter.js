import { WebflowClient } from 'webflow-api';

const client = new WebflowClient({
  accessToken:
    'c00dcd136673f885167fcaef8953090d7d6b5d6c9d72ce184deec78306da0ce0',
});

const collectionId = '6835b112c3b6c4918ba31e30';
const secondaryLocaleId = '683eef28b9ac5937626f4098';

// Функция для получения всех элементов из основной локали
async function getAllItems(collectionId) {
  let offset = 0;
  const limit = 100;
  let allItems = [];

  console.log('Начинаем загрузку элементов из основной локали...');

  while (true) {
    const response = await client.collections.items.listItems(collectionId, {
      limit,
      offset,
    });

    allItems = allItems.concat(response.items);
    console.log(
      `Загружено ${response.items.length} элементов (всего: ${allItems.length})`
    );

    if (offset + limit >= response.pagination.total) break;
    offset += limit;
  }

  console.log(`✅ Всего загружено элементов: ${allItems.length}`);
  return allItems;
}

try {
  const items = await getAllItems(collectionId);

  console.log('Начинаем создание элементов на второй локали...');

  // Для каждого элемента создаём копию на второй локали
  for (const item of items) {
    const itemId = item.id;
    const itemName = item.fieldData.name || 'Без названия';

    console.log(`🔄 Создаётся элемент: ${itemName} (ID: ${itemId})`);

    try {
      const createdItem = await client.collections.items.createItem(
        collectionId,
        {
          ...item,
          cmsLocaleId: secondaryLocaleId,
        }
      );

      console.log(
        `✅ Элемент создан: ${createdItem.fieldData.name} (ID: ${createdItem.id})`
      );
    } catch (error) {
      console.error(
        `❌ Ошибка при создании элемента ${itemId}:`,
        error.message
      );
    }
  }

  console.log('🎉 Все элементы успешно обработаны.');
} catch (error) {
  console.error('❌ Критическая ошибка:', error.message);
}
