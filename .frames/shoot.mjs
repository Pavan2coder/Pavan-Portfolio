import { chromium } from "playwright";

const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1.5,
});
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("PAGE ERR:", m.text()); });

await page.addInitScript(() => {
  const real = window.matchMedia.bind(window);
  window.matchMedia = (q) => {
    if (q.includes("pointer: fine") || q.includes("hover: hover"))
      return { matches: true, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} };
    if (q.includes("prefers-reduced-motion"))
      return { matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} };
    return real(q);
  };
});

// first hit compiles (can be slow with three.js); allow generous time
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 120000 });
// wait through compile + boot until the hero role line appears
await page.getByText("AI Engineer", { exact: false }).first().waitFor({ state: "visible", timeout: 100000 });
await page.waitForTimeout(6500); // warm up the WebGL render loop, at rest

const clip = { x: 1030, y: 230, width: 560, height: 540 };
await page.screenshot({ path: ".frames/orb-rest.png", clip });
await page.screenshot({ path: ".frames/hero-full.png", clip: { x: 0, y: 0, width: 1600, height: 900 } });

await page.mouse.move(1300, 400, { steps: 8 });
await page.mouse.move(1440, 320, { steps: 12 });
await page.waitForTimeout(900);
await page.screenshot({ path: ".frames/orb-move.png", clip });

await browser.close();
console.log("done");
