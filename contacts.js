const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const contactsService = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// TODO: задокументувати кожну функцію
async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const data = JSON.parse(buffer);
  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contactId === contact.id) || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactToDelete = contacts.findIndex(
    (contact) => contactId === contact.id
  );
  if (contactToDelete !== -1) {
    const deletedContact = contacts.splice(contactToDelete, 1);
    await contactsService(contacts);
    return deletedContact;
  } else {
    return null;
  }
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  if (
    contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    return { message: "Contact exists" };
  } else {
    const contact = {
      name,
      email,
      phone,
      id: nanoid(),
    };

    contacts.push(contact);
    await contactsService(contacts);
    return contact;
  }
}
// ...твій код. Повертає об'єкт доданого контакту.
const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
