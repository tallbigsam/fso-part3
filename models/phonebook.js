const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const uri = process.env.MONGODB_URI;
console.log("Connecting to ", uri);

mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB ", error.message);
  });

const personSchema = new mongoose.Schema({
  number: String,
  name: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
