import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EditContactPage extends Page {
  /**
   * define selectors using getter methods
   */
  get name_txtbox() {
    return $('[data-testid="name"]');
  }
  get email_txtbox() {
    return $('[data-testid="email"]');
  }
  get update_button() {
    return $('[data-testid="submit button"]');
  }

  async updateContact(name, email) {
    await this.name_txtbox.setValue(name);
    await this.email_txtbox.setValue(email);
    await this.update_button.click();
  }
}

export default new EditContactPage();
