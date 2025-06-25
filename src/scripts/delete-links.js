import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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

// утилита для нормализации ссылок
function normalizeUrl(href) {
  return href?.startsWith('http') ? href : `https://www.majestictiles.com${href}`;
}

const rootDir = path.resolve(import.meta.dirname, 'webflow');

async function processDomFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(raw);

  let modified = false;

  if (!Array.isArray(json.domNodes)) return;

  for (const node of json.domNodes) {
    if (node.type === 'Link' && node.data?.attr?.href) {
      const fullHref = normalizeUrl(node.data.attr.href);
      const match = data.find(d => d.url === fullHref);

      if (match?.to === 'delete link') {
        console.log(`[MODIFY] ${filePath} → node ${node._id} заменён на <div>`);
        node.type = 'Block';
        node.tag = 'div';
        delete node.data;
        modified = true;
        continue;
      }

      // преобразуем абсолютный URL в относительный
      if (fullHref.startsWith('https://www.majestictiles.com')) {
        const relativeHref = fullHref.replace('https://www.majestictiles.com', '');
        if (node.data.attr.href !== relativeHref) {
          console.log(`[REWRITE] ${filePath} → node ${node._id} href: ${node.data.attr.href} → ${relativeHref}`);
          node.data.attr.href = relativeHref;
          if (node.data.link?.url) node.data.link.url = relativeHref;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    await fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8');
  }
}

async function findAndProcessDomJsonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await findAndProcessDomJsonFiles(fullPath);
    } else if (entry.isFile() && entry.name === 'dom.json') {
      await processDomFile(fullPath);
    }
  }
}

(async () => {
  try {
    await findAndProcessDomJsonFiles(rootDir);
    console.log('✅ Обработка завершена.');
  } catch (err) {
    console.error('❌ Ошибка при обработке:', err);
  }
})();
