/**
 * Regenerates the project screenshots in public/.
 *
 *   node scripts/capture-shots.mjs            # all projects with a live URL
 *   node scripts/capture-shots.mjs bangu      # just one
 *
 * Why this exists: the beneta.lt preview on the work index once showed a
 * design that had been replaced months earlier, because the screenshot was
 * taken by hand and never retaken. Anything maintained by hand goes stale,
 * so this is the only way screenshots are produced.
 *
 * Requires Chrome (or set CHROME_PATH) and ffmpeg on PATH. Deliberately no
 * npm dependencies: this runs rarely and should not add weight to the app.
 *
 * Each project yields three files, all 16:10:
 *   work-<id>.webp      1400w  - the expanded panel
 *   work-<id>-sm.webp    560w  - the hover preview
 *   work-<id>.jpg       1400w  - fallback for no-WebP clients
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** Only projects that have a public URL. Syncara is a prototype and is shot by hand. */
const TARGETS = {
  beneta: "https://www.beneta.lt/",
  fakaunas: "https://fakaunas.lt/",
  bangu: "https://banguklinika.lt/",
  velgtilbud: "https://www.velgtilbud.no/",
  sei: "https://serviceexperienceindex.com/",
  flore: "https://florestudija.lt/",
  smiletrans: "https://www.smiletrans.lt/lt",
};

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

// Shot at 1440x1250 and cropped to the top 1440x900: cookie banners and chat
// bubbles are position:fixed to the bottom of the viewport, so a taller
// window pushes them out of the crop instead of into the portfolio.
// Sites with entrance animations need longer: the screenshot is taken when
// the virtual clock runs out, and a short budget catches content mid-fade.
// Override per run: SHOT_MS=30000 node scripts/capture-shots.mjs smiletrans
const VIRTUAL_TIME = Number(process.env.SHOT_MS || 15000);

const WIDTH = 1440;
const SHOT_HEIGHT = 1250;
const CROP_HEIGHT = 900;

const only = process.argv[2];
const entries = Object.entries(TARGETS).filter(([id]) => !only || id === only);

if (!entries.length) {
  console.error(`Unknown project "${only}". Known: ${Object.keys(TARGETS).join(", ")}`);
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME} - set CHROME_PATH.`);
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), "shots-"));

try {
  for (const [id, url] of entries) {
    const raw = join(work, `${id}.png`);
    console.log(`- ${id}: ${url}`);

    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        `--user-data-dir=${join(work, "profile")}`,
        `--window-size=${WIDTH},${SHOT_HEIGHT}`,
        `--virtual-time-budget=${VIRTUAL_TIME}`,
        `--screenshot=${raw}`,
        url,
      ],
      { stdio: "ignore" }
    );

    if (!existsSync(raw)) throw new Error(`no screenshot produced for ${id}`);

    const crop = `crop=${WIDTH}:${CROP_HEIGHT}:0:0`;
    const variants = [
      [`public/work-${id}.webp`, `${crop},scale=1400:-2:flags=lanczos`, ["-quality", "80"]],
      [`public/work-${id}-sm.webp`, `${crop},scale=560:-2:flags=lanczos`, ["-quality", "72"]],
      [`public/work-${id}.jpg`, `${crop},scale=1400:-2:flags=lanczos`, ["-q:v", "4"]],
    ];

    for (const [out, filter, args] of variants) {
      execFileSync(
        "ffmpeg",
        ["-loglevel", "error", "-y", "-i", raw, "-vf", filter, ...args, out],
        { stdio: "inherit" }
      );
      console.log(`    ${out}`);
    }
  }
  console.log("\nDone. Review the images before committing - a client site may");
  console.log("have changed in ways you would not want on the work index.");
} finally {
  rmSync(work, { recursive: true, force: true });
}
