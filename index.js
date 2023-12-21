const express = require("express");
let morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/phonebook");
const app = express();

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  }

  next(error);
};

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

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  console.log(`Request body: ${request.body}`);
  console.log(`Request name: ${request.body.name}`);
  console.log(`Request number: ${request.body.number}`);
  const newName = request.body.name;
  const newNumber = request.body.number;

  const person = new Person({
    name: newName,
    number: newNumber,
  });
  console.log(newName);
  const filter = { name: newName };
  const people = Person.find({})
    .then((result) => {
      console.log("result", result);
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    })
    .catch((error) => console.log(error));
  // console.log(`isperson: ${isPerson.name}`);
  if (newName && newNumber) {
    if (person) {
      //need to do a put here
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

app.use(errorHandler);

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
