import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactsPage extends Page {
  /**
   * define selectors using getter methods
   */
  get itemList() {
    return $$('[class="ui celled list"] [class="item"]');
  }
  get createContact_button() {
    return $('[data-testid="add-contact-btn"]');
  }
  get search_textbox() {
    return $('[data-testid="search-input"]');
  }
  
  itemTitle = (parent) => parent.$(".header");
  itemDesciption = (parent) => parent.$(".description");

  /**
   * a method to get items visible in the contact list
   */
  async getItems() {
    const items = [];
    for (let item of await this.itemList) {
      const id = (
        await (
          await (await this.itemTitle(item)).parentElement()
        ).getAttribute("href")
      ).split("/contact/")[1];
      items.push({
        id,
        name: await (await this.itemTitle(item)).getText(),
        email: await (await this.itemDesciption(item)).getText(),
      });
    }
    return items;
  }

  async gotoEditMode(index) {
    (await (await this.itemList)[index].$('[class="edit alternate outline icon"]')).click()
  }

  async searchContact(searchString) {
    await this.search_textbox.setValue(searchString);
  }

  async deleteContact(index) {
    (await (await this.itemList)[index].$('[class="trash alternate outline icon"]')).click()
  }

  /**
   * open home page
   */
  open() {
    return super.open();
  }
}

export default new ContactsPage();
