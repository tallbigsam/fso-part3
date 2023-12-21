const express = require("express");
let morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/phonebook");
const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  console.log("Request id: ", request.params.id);
  number = Person.findById(request.params.id).then((person) =>
    response.json(person)
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  numbers = numbers.filter((number) => {
    return number.id !== id;
  });
  console.log(numbers);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  console.log(`Request body: ${request.body}`);
  console.log(`Request name: ${request.body.name}`);
  console.log(`Request number: ${request.body.number}`);
  const newName = request.body.name;
  const newNumber = request.body.number;

  //   morgan(request, response, function (err) {
  if (newName && newNumber) {
    console.log("We're in the logic");
    const nameExists = false;
    if (nameExists) {
      return response.status(400).json({
        error: `name must be unique`,
      });
    }

    const person = new Person({ name: newName, number: newNumber });
    person.save().then((savedPerson) => {
      response.json(savedPerson);
      console.log("SAVED");
    });
  }
});

app.get("/info", (request, response) => {
  const totalPhoneNumbersResponse = `Phone book has ${numbers.length} total`;
  const responseTime = String(new Date(Date.now()));

  response.send(
    `<p>${totalPhoneNumbersResponse}</p><br /><p>${responseTime}</p>`
  );
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
