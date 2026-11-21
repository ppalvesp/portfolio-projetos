import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("project details support keyboard, focus restoration and full calculator stack", async ({ page }) => {
  const opener = page.getByRole("button", { name: "Conhecer projeto: Calculadora de HP efetivo", exact: true });
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Calculadora de HP efetivo" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Fechar" })).toBeFocused();
  await expect(dialog.getByText("Web Workers", { exact: true })).toBeVisible();
  await expect(dialog.getByText("Supabase · protótipo A+", { exact: true })).toBeVisible();
  await opener.evaluate(element => element.focus());
  await expect(dialog.getByRole("button", { name: "Fechar" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await page.getByRole("button", { name: "Fechar" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("filters select matching projects while preserving the calculator", async ({ page }) => {
  const grid = page.locator(".project-grid");
  await expect(grid.getByRole("article")).toHaveCount(7);
  for (const [area, count] of [["Web", 2], ["IA", 3], ["Automação", 3], ["Discord", 1], ["Windows", 2], ["Todos", 7]]) {
    const filter = page.getByRole("button", { name: area, exact: true });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(grid.getByRole("article")).toHaveCount(count);
    await expect(page.getByRole("status")).toContainText(`${count} ${count === 1 ? "projeto" : "projetos"}`);
    await expect(page.locator("#projeto-principal")).toHaveCount(1);
  }
  await page.getByRole("button", { name: "Discord", exact: true }).click();
  await page.getByRole("button", { name: "Conhecer projeto: Bot de acompanhamento", exact: true }).click();
  await expect(page.getByRole("dialog").getByText("SQLite", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(grid.getByRole("article")).toHaveCount(1);
});

test("new projects show verified summaries and public/private repository status", async ({ page }) => {
  const grid = page.locator(".project-grid");
  await grid.getByRole("button", { name: "Conhecer projeto: Aim Log" }).click();
  const aimDialog = page.getByRole("dialog", { name: "Aim Log" });
  await expect(aimDialog.getByText("Electron", { exact: true })).toBeVisible();
  await expect(aimDialog.getByRole("link", { name: "Ver repositório público" }))
    .toHaveAttribute("href", "https://github.com/ppalvesp/aim-progress-app");
  await page.keyboard.press("Escape");

  await grid.getByRole("button", { name: "Conhecer projeto: Script de preparação pós-formatação" }).click();
  const scriptDialog = page.getByRole("dialog", { name: "Script de preparação pós-formatação" });
  await expect(scriptDialog.getByText("Código-fonte privado")).toBeVisible();
  await expect(scriptDialog.getByText("Automação", { exact: true })).toBeVisible();
});

test("navigation follows scrolling and page fits the viewport", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  for (const [label, section] of [["Destaque", "projeto-principal"], ["Projetos", "projetos"], ["Sobre", "sobre"]]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "location");
    expect(await page.locator(`#${section}`).evaluate(el => el.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(0);
  }
  await page.locator("#projeto-principal").evaluate(el => el.scrollIntoView());
  await expect(nav.getByRole("link", { name: "Destaque", exact: true })).toHaveAttribute("aria-current", "location");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("featured calculator preview shows combat stats and effective HP comparison", async ({ page }) => {
  const preview = page.locator(".featured-visual");
  await expect(preview.getByText("112.500")).toBeVisible();
  await expect(preview.getByText("DR", { exact: true })).toBeVisible();
  await expect(preview.getByText("EVASÃO")).toBeVisible();
  await expect(preview.getByText("+5,00% de HP efetivo")).toBeVisible();
  expect(await preview.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("real screenshot gallery switches captures and serves valid images", async ({ page }) => {
  await page.getByRole("button", { name: "Conhecer projeto: Calculadora de HP efetivo", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const gallery = dialog.getByRole("region", { name: "Capturas reais do projeto" });
  const image = gallery.getByRole("img");
  await expect(image).toHaveAttribute("src", "/previews/calculator-builder.png");
  await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  await gallery.getByRole("button", { name: "Captura 2" }).click();
  await expect(image).toHaveAttribute("src", "/previews/calculator-combat.png");
  await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  await expect(gallery.getByRole("link", { name: "Abrir captura em tamanho original" }))
    .toHaveAttribute("href", "/previews/calculator-combat.png");
  await expect(gallery.locator("figcaption")).toContainText("valores iniciais");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Conhecer projeto: Calculadora de HP efetivo", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAttribute("src", "/previews/calculator-builder.png");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test.describe("motion preference", () => {
  test.use({ reducedMotion: "no-preference" });

  test("explore link scrolls smoothly and reveals the projects section", async ({ page }) => {
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
    const projectsSection = page.locator("#projetos");
    await expect(projectsSection).not.toHaveClass(/is-visible/);
    await page.getByRole("link", { name: /Explorar projetos/ }).click();
    await expect(projectsSection).toHaveClass(/is-visible/);
    const sectionTop = await projectsSection.evaluate(element => element.getBoundingClientRect().top);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(sectionTop).toBeLessThan(viewportHeight);
  });
});
