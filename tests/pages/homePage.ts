import { Page } from "@playwright/test";

/** Class can be extended to include helpers and accessors for different parts of the page */
export default class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async getHeading() {
    return await this.page.textContent("h1");
  }

  async getSelectValue() {
    return await this.page.selectOption("#select", "england");
  }

  async getTableRowById(id: string) {
    return await this.page.waitForSelector(`tr[data-testid="${id}"]`);
  }

  async getModalByTestId(id: string) {
    return await this.page.waitForSelector(`dialog[data-testid="${id}"]`);
  }

  async getModalTitle() {
    return await this.page.waitForSelector(`h2[data-testid="modal-title"]`);
  }

  async getModalCloseButton() {
    return await this.page.waitForSelector(
      "button[data-testid='modal-close-button']"
    );
  }
}
