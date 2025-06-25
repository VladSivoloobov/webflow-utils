import { WebflowClient } from 'webflow-api';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import FormData from 'form-data';
import crypto from 'crypto';
import path from 'path';

const client = new WebflowClient({
  accessToken:
    'c00dcd136673f885167fcaef8953090d7d6b5d6c9d72ce184deec78306da0ce0',
});

const siteId = '67fd1b41f703c78b11cc8dc5';
const collectionId = '68384c0dd39c815c43e41be6';

const data = [
  { url: "https://www.majestictiles.com/bath-accessories/",  to: "/bathroom-equipment" },
  { url: "https://www.majestictiles.com/bathroom-equipment/",  to: "/bathroom-equipment" },
  { url: "https://www.majestictiles.com/collections/",  to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/custom-glass/",  to: "delete link" },
  { url: "https://www.majestictiles.com/heated-floor/",  to: "delete link" },
  { url: "https://www.majestictiles.com/how-to-choose-tiles-for-a-small-bathroom/",  to: "/bathroom-remodeling" },
  { url: "https://www.majestictiles.com/large-format-tiles/",  to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/limited-art/",  to: "/bathroom-remodeling" },
  { url: "https://www.majestictiles.com/our-gallery/inspirations/",  to: "/our-projects" },
  { url: "https://www.majestictiles.com/porcelain-pavers/",  to: "/porcelain-pavers" },
  { url: "https://www.majestictiles.com/porcelain-tiles/",  to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/porcelain-tiles/?filter_application=floor", to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/porcelain-tiles/?filter_brand=cerrad", to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/porcelain-tiles/?filter_brand=gayafores&filter_installation-room=kitchen", to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/porcelain-tiles/?filter_brand=porcelanosa&filter_installation-room=bathroom", to: "/porcelain-tiles" },
  { url: "https://www.majestictiles.com/privacy-policy/", to: "/privacy-policy" },
  { url: "https://www.majestictiles.com/product-category/brand/ravon-manufactory/freestanding-bathtubs/", to: "/bathroom-remodeling" },
  { url: "https://www.majestictiles.com/product-category/material/engineered-flooring/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/material/tile-stone-installation-systems/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/material/vinyl-tiles/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/material/vinyl-tiles/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/cerrad-calacatta-white-collection/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/concrete-style/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/large-format-3/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/marble-style/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/roca-st-tropez/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/stone-style/", to: "delete link" },
  { url: "https://www.majestictiles.com/product-category/porcelain-tiles/wood-style/", to: "delete link" },
  { url: "https://www.majestictiles.com/product/brazilian-quartzite-amber-120-x-280/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/brazilian-quartzite-black-120-x-280/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/brazilian-quartzite-blue-120-x-280/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/brazilian-quartzite-green-120-x-280/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/brazilian-quartzite-natural-120-x-280/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/cerrad-calacatta-gold/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/cerrad-tacoma/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/fuerta/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/hydromassage/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/nickwood/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/notta/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/setim/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/product/tauro/", to: "удалить ввв" },
  { url: "https://www.majestictiles.com/remodel-services/", to: "/bathroom-remodeling" },
  { url: "https://www.majestictiles.com/remodel-services/bathroom-remodeling/", to: "/bathroom-remodeling" },
  { url: "https://www.majestictiles.com/remodel-services/kitchen-remodeling-services/", to: "/kitchen-remodeling" },
  { url: "https://www.majestictiles.com/the-bathroom-as-a-private-spa-handmade-bathtubs/", to: "/blog/spa-like-bathroom-ideas" },
  { url: "https://www.majestictiles.com/towel-warmers-accessiories/", to: "/bathroom-equipment" },
  { url: "https://www.majestictiles.com/vanities-faucets-toilets/", to: "/bathroom-equipment" },
  { url: "https://www.majestictiles.com/ways-to-visually-enlarge-the-space-in-a-small-bathroom/", to: "/blog/how-to-make-a-small-bathroom-look-bigger" }
];


async function rehostHtml(content) {
  const $ = cheerio.load(content);

  const isImageLink = (href) =>
    /\.(jpg|jpeg|png|webp|svg|gif|bmp|tiff|ico)(\?.*)?$/i.test(href);

  const isInternal = (href) =>
    href.startsWith('https://www.majestictiles.com/') ||
    href.startsWith('https://majestictiles.com/');

  const hasLangWithNumber = (path) => {
    const parts = path.split('/').filter(Boolean);
    return parts.length >= 2 && parts[0] === 'en' && /^\d+$/.test(parts[1]);
  };

  const stripLangPrefix = (path) => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length && /^[a-z]{2}$/.test(parts[0])) {
      parts.shift(); // удалить язык
    }
    return '/' + parts.join('/');
  };

  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    const html = $(el).html();
    const entry = data.find(d => d.url === href);

    if (entry) {
      if (entry.to === 'delete link') {
        console.log(`[DELETE] Заменяю <a href="${href}"> на <div>:`, html);
        $(el).replaceWith(`<div>${html}</div>`);
      } else if (entry.to === 'удалить ввв') {
        if (href.includes('://www.')) {
          const newHref = href.replace('://www.', '://');
          console.log(`[REMOVE WWW] Убираю www. из ${href} → ${newHref}`);
          $(el).attr('href', newHref);
        } else {
          console.log(`[SKIP] Указано 'удалить ввв', но www. не найдено в: ${href}`);
        }
      } else {
        console.log(`[REPLACE] Заменяю ссылку ${href} → ${entry.to}`);
        $(el).attr('href', entry.to);
      }
    } else {
      if (isImageLink(href)) {
        console.log(`[IMAGE LINK] Ссылка на изображение ${href} → заменяю <a> на <div>`);
        $(el).replaceWith(`<div>${html}</div>`);
      } else if (isInternal(href)) {
        let path = href.replace(/^https:\/\/(www\.)?majestictiles\.com/, '');
        if (hasLangWithNumber(path)) {
          console.log(`[REMOVE LANG+ID] ${href} содержит en/123 → заменяю <a> на <div>`);
          $(el).replaceWith(`<div>${html}</div>`);
        } else {
          const cleanPath = stripLangPrefix(path);
          console.log(`[TO RELATIVE] ${href} → ${cleanPath}`);
          $(el).attr('href', cleanPath);
        }
      } else {
        console.log(`[SKIP] Внешняя или нестандартная ссылка: ${href}`);
      }
    }
  });

  return $.html();
}




async function processAllItems() {
  const token =
    'c00dcd136673f885167fcaef8953090d7d6b5d6c9d72ce184deec78306da0ce0';

  for (let i = 0; i < 8; i++) {
    let items;
    try {
      items = await client.collections.items.listItems(collectionId, {
        offset: i * 100,
        limit: 100,
      });
    } catch (err) {
      console.error(
        `Ошибка при получении items для страницы ${i}:`,
        err.message
      );
      continue;
    }

    for (const item of items.items) {
      try {
        const content = item.fieldData['content-1'] ?? '';
        const newHtml = await rehostHtml(content);

        console.log(`Обновляю: ${item.fieldData.slug}`);

        await client.collections.items.updateItem(collectionId, item.id, {
          fieldData: {
            ...item.fieldData,
            "content-1": newHtml,
          },
          live: false,
        });
      } catch (err) {
        console.error(`Ошибка при обработке item ${item.id}:`, err.message);
      }
    }
  }
}

processAllItems().catch((err) => {
  console.error('Глобальная ошибка в processAllItems:', err.message);
});
