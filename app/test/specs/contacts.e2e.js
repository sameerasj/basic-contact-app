import ContactsPage from "../pageobjects/home.page";
import AddContactPage from "../pageobjects/addContact.page";
import EditContactPage from "../pageobjects/editContact.page";
import { getContacts } from "../api/contactApi";

describe("Contacts landing page", () => {
  it("should be able to view contact list", async () => {
    const contacts = await getContacts();

    await ContactsPage.open();
    const list = await ContactsPage.getItems();
    await expect(list.length).toEqual(contacts.length);
    await expect(list).toEqual(contacts);
  });

  it('should be able create contact', async () => {
      const contactName = 'Test User';
      const contactEmail = 'testuser@mail.com';
      await ContactsPage.open();
      await (await ContactsPage.createContact_button).click();

      await AddContactPage.addContact(contactName, contactEmail);
      const contacts = await getContacts();
      await expect(contacts[contacts.length-1].name).toEqual(contactName);
      await expect(contacts[contacts.length-1].email).toEqual(contactEmail);
  });

  it('should be able update contact', async () => {
    const contactName = 'Updated Test User';
    const contactEmail = 'updatedtestuser@mail.com';

    let contacts = await getContacts();
    await ContactsPage.open();
    await ContactsPage.gotoEditMode(contacts.length-1);

    await EditContactPage.updateContact(contactName, contactEmail);
    contacts = await getContacts();
    await expect(contacts[contacts.length-1].name).toEqual(contactName);
    await expect(contacts[contacts.length-1].email).toEqual(contactEmail);
});

it('should be able search contact', async () => {
    const contacts = await getContacts();

    await ContactsPage.open();
    await ContactsPage.searchContact(contacts[0].name);
    const list = await ContactsPage.getItems();
    await expect(list.length).toEqual(1);
    await expect(list[0]).toEqual(contacts[0]);
});

it('should be able delete contact', async () => {
    let contacts = await getContacts();
    await ContactsPage.open();
    await ContactsPage.deleteContact(contacts.length-1);

    const list = await ContactsPage.getItems();
    await expect(list.length).toEqual(contacts.length);
    await expect(list[list.length-1]).not.toEqual(contacts[contacts.length-1]);
});

});
