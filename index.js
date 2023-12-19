const express = require("express");
const app = express();

app.use(express.json());

let numbers = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(numbers);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  number = numbers.find((number) => number.id === id);

  if (number) {
    return response.json(number);
  } else {
    return response.status(404).end();
  }
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
  const newName = request.body.name;
  const newNumber = request.body.number;
  if (newName && newNumber) {
    nameExists = numbers.find((number) => number.name === newName);
    console.log(nameExists);
    if (nameExists) {
      return response.status(400).json({
        error: `name must be unique`,
      });
    }
    const id =
      numbers.length > 0 ? Math.max(...numbers.map((number) => number.id)) : 0;

    const newPerson = { name: newName, number: newNumber, id: id + 1 };
    console.log(newPerson);
    numbers = numbers.concat(newPerson);
    response.json(newPerson);
  }
  return response.status(400).json({
    error: "Name and Number must be present.",
  });
});

app.get("/info", (request, response) => {
  const totalPhoneNumbersResponse = `Phone book has ${numbers.length} total`;
  const responseTime = String(new Date(Date.now()));

  response.send(
    `<p>${totalPhoneNumbersResponse}</p><br /><p>${responseTime}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
