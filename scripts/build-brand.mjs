/**
 * Regenerates every published image of the brand mark.
 *
 *   node scripts/build-brand.mjs            # icons + the share card
 *   node scripts/build-brand.mjs icons      # just the icons
 *   node scripts/build-brand.mjs og         # just the share card
 *
 * Why this exists: the tab icon, the Android icons, the Apple touch icon and
 * the Open Graph card were four separate hand-made files, and three of them
 * were still the stock React atom - so Google, Facebook and Messenger all
 * showed someone else's logo next to the site. One source image now produces
 * all of them, which is the only way they stay in step.
 *
 * The source is public/logo.jpg, the largest copy of the mark there is.
 * Everything else, the 80px file the command rail renders included, is
 * derived from it, so the rail and the tab can never drift apart.
 *
 * Requires Chrome (or set CHROME_PATH) and ffmpeg on PATH, exactly as
 * scripts/capture-shots.mjs does. Deliberately no npm dependencies.
 */
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  rmSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

/** The master. Square, flat, two colours - it survives any downscale. */
const SOURCE = "public/logo.jpg";

/** Cut the master to a square around its centre before anything else. */
const SQUARE = "crop='min(iw,ih)':'min(iw,ih)',";

const what = process.argv[2] || "all";
const work = mkdtempSync(join(tmpdir(), "brand-"));

/** One ffmpeg pass: source -> a square PNG of the given edge length. */
function png(out, size) {
  execFileSync(
    "ffmpeg",
    [
      "-loglevel",
      "error",
      "-y",
      "-i",
      SOURCE,
      "-vf",
      `${SQUARE}scale=${size}:${size}:flags=lanczos`,
      out,
    ],
    { stdio: "inherit" }
  );
  return out;
}

/**
 * An .ico is a 6-byte header, one 16-byte directory entry per size, then the
 * images back to back. Every format since Vista accepts whole PNGs inside,
 * which is why this needs no BMP encoder.
 */
function ico(out, files) {
  const images = files.map((f) => readFileSync(f));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    const size = img.readUInt32BE(16); // PNG IHDR width
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette size: none
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });

  writeFileSync(out, Buffer.concat([header, ...entries, ...images]));
}

function buildIcons() {
  // Everything a browser, an Android launcher or an iOS home screen asks
  // for. The 48 is the one Google reads for the favicon in search results.
  const sizes = [
    ["public/favicon-16.png", 16],
    ["public/favicon-32.png", 32],
    ["public/favicon-48.png", 48],
    ["public/apple-touch-icon.png", 180],
    ["public/logo192.png", 192],
    ["public/logo512.png", 512],
    ["public/logo-mark.png", 80],
  ];
  for (const [out, size] of sizes) {
    png(out, size);
    console.log(`    ${out}`);
  }

  // The rail loads WebP with the PNG as its fallback.
  execFileSync(
    "ffmpeg",
    ["-loglevel", "error", "-y", "-i", "public/logo-mark.png",
     "-quality", "90", "public/logo-mark.webp"],
    { stdio: "inherit" }
  );
  console.log("    public/logo-mark.webp");

  ico("public/favicon.ico", [
    "public/favicon-16.png",
    "public/favicon-32.png",
    "public/favicon-48.png",
  ]);
  console.log("    public/favicon.ico");
}

/**
 * The 1200x630 card Facebook, Messenger, LinkedIn, Slack and X unfurl.
 *
 * Rendered from the site's own faces and colours rather than drawn by hand,
 * so a change to the palette or the wordmark reaches the card too. The mark
 * is in it because a card without the logo is the one place the brand is
 * missing from the chain tab -> search -> share.
 */
function buildOg() {
  const font = readFileSync("public/fonts/archivo-latin.woff2").toString("base64");
  // The master, not the 80px rail copy: at 56px on a 2x card the small
  // file shows its resampling.
  const mark = readFileSync(SOURCE).toString("base64");

  const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: Archivo;
    src: url(data:font/woff2;base64,${font}) format("woff2");
    font-weight: 100 900;
  }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #111113;
    color: #ecebe8;
    font-family: Archivo, system-ui, sans-serif;
    padding: 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 20px; }
  .brand img { width: 56px; height: 56px; border-radius: 6px; display: block; }
  .label {
    font-size: 20px; font-weight: 500; letter-spacing: .18em;
    text-transform: uppercase; color: #8a8a8f;
  }
  .domain { font-size: 24px; font-weight: 600; color: #ff3b1f; }
  h1 {
    font-size: 148px; font-weight: 700; letter-spacing: -.02em; line-height: .9;
  }
  .rule { height: 3px; background: #ff3b1f; margin-bottom: 36px; }
  h2 { font-size: 38px; font-weight: 600; letter-spacing: -.01em; }
  p { font-size: 26px; font-weight: 400; color: #8a8a8f; margin-top: 14px; }
</style>
<div class="top">
  <span class="brand"><img src="data:image/jpeg;base64,${mark}" alt=""><span class="label">Software engineering</span></span>
  <span class="domain">beneta.lt</span>
</div>
<h1>BENETA</h1>
<div>
  <div class="rule"></div>
  <h2>Software engineering practice</h2>
  <p>Web applications . Backends . Integrations . Automation</p>
</div>`;

  const page = join(work, "og.html");
  writeFileSync(page, html);
  const shot = join(work, "og.png");

  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      `--user-data-dir=${join(work, "profile")}`,
      "--window-size=1200,630",
      "--virtual-time-budget=4000",
      `--screenshot=${shot}`,
      `file:///${page.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore" }
  );

  if (!existsSync(shot)) throw new Error("Chrome produced no screenshot");

  // Flattened to 8-bit: an unfurled card is never worth 400 kB.
  execFileSync(
    "ffmpeg",
    ["-loglevel", "error", "-y", "-i", shot,
     "-vf", "palettegen=max_colors=128", join(work, "pal.png")],
    { stdio: "inherit" }
  );
  execFileSync(
    "ffmpeg",
    ["-loglevel", "error", "-y", "-i", shot, "-i", join(work, "pal.png"),
     "-lavfi", "paletteuse=dither=none", "public/og.png"],
    { stdio: "inherit" }
  );
  console.log("    public/og.png");
}

try {
  if (!existsSync(SOURCE)) throw new Error(`missing ${SOURCE}`);
  if (what === "all" || what === "icons") {
    console.log("- icons");
    buildIcons();
  }
  if (what === "all" || what === "og") {
    if (!existsSync(CHROME)) {
      console.error(`Chrome not found at ${CHROME} - set CHROME_PATH.`);
      process.exit(1);
    }
    console.log("- share card");
    buildOg();
  }
  console.log("\nDone. Look at the files before committing: a mark that is");
  console.log("illegible at 16px is worse than no icon at all.");
} finally {
  rmSync(work, { recursive: true, force: true });
}
