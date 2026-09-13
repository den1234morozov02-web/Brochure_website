/**
 * Сжатие картинок после сборки (запускается в конце `npm run build`).
 *
 * Заказчица загружает фото прямо с телефона (3–8 МБ, 4000+ px). Оригиналы
 * остаются в репозитории, а в собранный сайт (dist/media) попадают
 * уменьшенные и пережатые копии с теми же именами и форматом — поэтому
 * ссылки на страницах менять не нужно.
 *
 * Что делаем с каждым файлом:
 *  - поворачиваем по EXIF (фото с телефона иначе могут лечь боком);
 *  - вписываем в MAX_SIDE по большей стороне (не увеличиваем);
 *  - пережимаем (JPEG mozjpeg q80, PNG/WebP — эквиваленты);
 *  - выкидываем метаданные (в т.ч. GPS-координаты из фото с телефона);
 *  - записываем, только если файл реально стал меньше.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../dist/media/", import.meta.url);
// Самое крупное место показа — лайтбокс сертификатов (до 90% высоты экрана)
// на ретина-дисплее. 2000 px с запасом покрывает это и всё остальное.
const MAX_SIDE = 2000;

const encoders = {
  ".jpg": (img) => img.jpeg({ quality: 80, mozjpeg: true }),
  ".jpeg": (img) => img.jpeg({ quality: 80, mozjpeg: true }),
  ".png": (img) => img.png({ compressionLevel: 9, effort: 10 }),
  ".webp": (img) => img.webp({ quality: 80 }),
};

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

let before = 0;
let after = 0;
let count = 0;
const rootPath = decodeURIComponent(ROOT.pathname).replace(/^\/([A-Za-z]:)/, "$1");

try {
  for await (const file of walk(rootPath)) {
    const encode = encoders[extname(file).toLowerCase()];
    if (!encode) continue;

    const input = await readFile(file);
    const output = await encode(
      sharp(input)
        .rotate()
        .resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true })
    ).toBuffer();

    before += input.length;
    if (output.length < input.length) {
      await writeFile(file, output);
      after += output.length;
      count++;
      if (input.length - output.length > 200 * 1024) {
        console.log(`  ${relative(rootPath, file)}: ${kb(input.length)} → ${kb(output.length)}`);
      }
    } else {
      after += input.length;
    }
  }
  console.log(`[optimize-images] сжато файлов: ${count}, ${kb(before)} → ${kb(after)}`);
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("[optimize-images] dist/media не найден — пропускаю");
  } else {
    throw error;
  }
}
