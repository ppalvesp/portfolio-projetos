import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { mkdir, mkdtemp, readFile, writeFile, unlink, rmdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const workspace = resolve("..");
const output = resolve("public", "previews");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

async function captureCalculator() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  try {
    await page.goto("http://127.0.0.1:8180");
    await page.getByRole("button", { name: /Continuar como visitante/ }).click();
    await page.getByRole("heading", { name: "Montar build com os dados do jogo" }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(output, "calculator-builder.png") });
    await page.getByRole("button", { name: /^Calculadora/ }).click();
    await page.getByRole("heading", { name: "Montar build com os dados do jogo" }).waitFor({ state: "hidden" });
    await page.screenshot({ path: join(output, "calculator-combat.png") });
    console.log("Calculadora: capturas reais no modo visitante, com valores iniciais.");
  } finally {
    await page.close();
  }
}

async function captureMonitor() {
  const { createBackend } = await import(pathToFileURL(join(workspace, "agent-ide", "server.mjs")).href);
  const directory = await mkdtemp(join(tmpdir(), "portfolio-preview-"));
  const session = join(directory, "events.jsonl");
  await writeFile(session, "");
  let backend;
  let page;
  try {
    backend = await createBackend({ session, port: 0, copilotIconRoot: null, titleRoot: null });
    page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    await page.goto(`http://127.0.0.1:${backend.port}`);
    await page.locator("canvas").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise(accept => requestAnimationFrame(() => requestAnimationFrame(accept))));
    await page.screenshot({ path: join(output, "agent-ide.png") });
    console.log("IDE: interface real sem eventos, sem ler outras sessões.");
  } finally {
    if (page) await page.close();
    if (backend) await backend.close();
    await unlink(session);
    await rmdir(directory);
  }
}

async function captureOptimizer() {
  const root = join(workspace, "otimizador-windows", "src", "interface", "estatico");
  const assets = new Map([
    ["/", ["index.html", "text/html; charset=utf-8"]],
    ["/estilo.css", ["estilo.css", "text/css"]],
    ["/app.js", ["app.js", "text/javascript"]],
  ]);
  const server = createServer(async (request, response) => {
    const asset = assets.get(request.url);
    if (!asset) {
      response.writeHead(404).end("Not found");
      return;
    }
    try {
      const content = await readFile(join(root, asset[0]));
      response.writeHead(200, { "Content-Type": asset[1] }).end(content);
    } catch (error) {
      console.error("Falha ao servir a interface do otimizador:", error);
      response.writeHead(500).end("Preview asset unavailable");
    }
  });
  await new Promise((accept, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", accept);
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  try {
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.locator("#sem-codigo").waitFor({ state: "visible" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(output, "optimizer.png") });
    console.log("Otimizador: tela real de acesso restrito, sem backend, diagnóstico ou alterações no PC.");
  } finally {
    await page.close();
    await new Promise(accept => server.close(accept));
  }
}

try {
  await captureCalculator();
  await captureMonitor();
  await captureOptimizer();
} finally {
  await browser.close();
}
