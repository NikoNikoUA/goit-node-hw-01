const contacts = require("./contacts");
const { nanoid } = require("nanoid");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(`Contact by id is found:`, contactById);
      break;

    case "add":
      const addedContact = await contacts.addContact(
        name,
        email,
        phone,
        (id = nanoid())
      );
      console.log(`The following contact was added:`, addedContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(`The following contact was removed:`, removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
