import puppeteer from "puppeteer";

describe("render an isometric world correctly", () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  test("renders correctly", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:8081/world?format=5x5");
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
