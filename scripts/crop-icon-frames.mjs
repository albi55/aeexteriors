// One-off: crop the square line-frame off each service icon PNG.
// Strategy: trim transparent margins to the artwork bbox, then crop inward
// by the detected border-stroke thickness so the outer frame line is removed.
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = "public/icons/_original";
const OUT_DIR = "public/icons";
const ALPHA_T = 24; // alpha threshold for "is this pixel ink?"

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const srcPath = join(SRC_DIR, file);
  const img = sharp(srcPath);
  const { width, height } = await img.metadata();
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels; // 4 (RGBA)

  const alphaAt = (x, y) => data[(y * width + x) * ch + 3];

  // 1) bounding box of all opaque pixels (the framed artwork)
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alphaAt(x, y) > ALPHA_T) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) {
    console.log(`${file}: no opaque pixels, skipped`);
    continue;
  }

  // 2) measure the frame stroke thickness at the top edge, mid-column:
  //    walk down from minY until the first transparent row inside the frame.
  const midX = Math.round((minX + maxX) / 2);
  let stroke = 0;
  for (let y = minY; y <= maxY; y++) {
    if (alphaAt(midX, y) > ALPHA_T) stroke++;
    else break;
  }
  // clamp to something sane (frame lines are a few px); fall back to 3
  if (stroke < 1 || stroke > 24) stroke = 3;
  const pad = stroke + 1; // crop just inside the inner edge of the frame line

  const left = Math.min(minX + pad, midX);
  const top = Math.min(minY + pad, Math.round((minY + maxY) / 2));
  const cropW = Math.max(1, maxX - minX + 1 - pad * 2);
  const cropH = Math.max(1, maxY - minY + 1 - pad * 2);

  await sharp(srcPath)
    .extract({ left, top, width: cropW, height: cropH })
    .toBuffer()
    .then((buf) => sharp(buf).toFile(join(OUT_DIR, file)));

  console.log(
    `${file}: bbox ${minX},${minY}..${maxX},${maxY}  stroke≈${stroke}px  →  ${cropW}x${cropH}`
  );
}
console.log("Done.");
