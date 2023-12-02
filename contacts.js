const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const buffer = await fs.readFile(contactsPath);
    return console.log((data = JSON.parse(buffer)));
  } catch (error) {
    throw error;
  }
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
}
