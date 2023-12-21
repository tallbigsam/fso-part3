const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://main_user:${password}@dev.3xi1jux.mongodb.net/phonebook?retryWrites=true&w=majority`;

const name = process.argv[3];
const number = process.argv[4];

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  number: String,
  name: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  number: number,
  name: name,
});

if (!number || !name) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
      mongoose.connection.close();
    });
  });
} else {
  person.save().then((result) => {
    console.log(`person ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
