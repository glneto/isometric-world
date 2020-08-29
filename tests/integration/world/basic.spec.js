import puppeteer from "puppeteer";

describe("render an isometric world correctly", () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  test("renders correctly", async () => {
    const page = await browser.newPage();
    await page.goto("https://localhost:8080");

    await removeBanners(page);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
