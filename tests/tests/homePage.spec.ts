import { Browser, Page, chromium, expect, test } from "@playwright/test";
import HomePage from "../pages/homePage";
import exp from "constants";

let browser: Browser;
let page: Page;
let homePage: HomePage;
test.describe("Home Page", () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    homePage = new HomePage(page);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    await homePage.goto();
  });

  test("has title", async () => {
    const title = await homePage.getHeading();
    expect(title).toBe("Carbon intensity");
  });

  test("has a table", async () => {
    const table = await page.waitForSelector("table");
    expect(table).toBeTruthy();
  });

  test("has a table header", async () => {
    const tableHeader = await page.waitForSelector("thead");
    expect(tableHeader).toBeTruthy();
  });

  test("has a table body", async () => {
    const tableBody = await page.waitForSelector("tbody");
    expect(tableBody).toBeTruthy();
  });

  test("has a select", async () => {
    const select = await page.waitForSelector("select");
    expect(select).toBeTruthy();
  });

  test("has a default option that is selected", async () => {
    const value = await homePage.getSelectValue();
    expect(value).toContain("england");
  });

  test("Can open the modal through row click", async ({ page }) => {
    const tableRow = await homePage.getTableRowById("table-row-body-0");
    await tableRow.click();
    const modal = await homePage.getModalByTestId("carbon-intensity-modal");
    // The modal is open
    expect(await modal.isVisible()).toBeTruthy();

    // The modal should close
    const closeButton = await homePage.getModalCloseButton();
    await closeButton.dispatchEvent("click");

    expect(await modal.isVisible()).toBeFalsy();
  });

  test("The modal should display the correct title, when it is open", async () => {
    const tableRow = await homePage.getTableRowById("table-row-body-0");
    await tableRow.click();

    const modalTitle = await homePage.getModalTitle();

    expect(await modalTitle.textContent()).toBe("England");
  });

  test("The modal should display the carbon intensity index, when it is open", async () => {
    const tableRow = await homePage.getTableRowById("table-row-body-0");
    await tableRow.click();

    const carbonIntensityIndex = await page.waitForSelector(
      'span[data-testid="carbon-intensity-index-0"]'
    );

    expect(carbonIntensityIndex).toBeTruthy();

    const carbonIntensityIndexValue = await carbonIntensityIndex.textContent();
    expect(carbonIntensityIndexValue?.length).toBeGreaterThan(0);
  });

  test("The modal should display the carbon intensity graph when it is open", async () => {
    const tableRow = await homePage.getTableRowById("table-row-body-0");
    await tableRow.click();

    const graph = await page.waitForSelector('div[data-testid="pie-chart-0"]');

    expect(graph).toBeTruthy();
  });
});
