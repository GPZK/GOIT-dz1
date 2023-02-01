const fs = require("fs").promises;
const path = require("path");
const { isNull } = require("util");

//Шлях до файлу з контактами
const contactsPath = path.resolve("./db/contacts.json");

//Виводить контакти у вигляді таблиці в консоль
function listContacts() {
  fs.readFile(contactsPath, { encoding: "utf8" })
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.error(err));
}

//знаходить контакт з визначеним id і виводить в консоль
function getContactById(contactId) {
  fs.readFile(contactsPath, { encoding: "utf8" })
  .then((data) =>{
    let contact=JSON.parse(data).find((x) => parseInt(x.id) === +contactId)
    if (contact===null){
        console.log(`Contact with id ${contactId} not found`);
        return;
    }
    console.table(contact)
  }
  );
}

//Видаляє контакт з визначеним id
function removeContact(contactId) {
  fs.readFile(contactsPath, { encoding: "utf8" }).then((data) =>{
    let parsedData=JSON.parse(data)
    let newdata=parsedData.filter((x) => parseInt(x.id) != contactId)
    fs.writeFile(contactsPath,JSON.stringify(newdata))
    if (newdata.length===parsedData.length) console.log(`Contact with id ${contactId} was not deleted`)
    else console.log(`Contact was succesfully deleted`)
    }
    
  );
}

//Додає контакт з id на 1 більше ніж останній і заданними данними
function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf8" }).then((data) => {
    let parsedData = JSON.parse(data);
    let newId=+parsedData[parsedData.length - 1]["id"] + 1 + "";
    parsedData.push({
      id: newId,
      name: name,
      email: email,
      phone: phone,
    });
    fs.writeFile(contactsPath, JSON.stringify(parsedData));
    console.log(`contact succesfully added with id ${newId}`)
  });
}

module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact
}