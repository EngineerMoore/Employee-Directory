const express = require(`express`);
const app = express();

const PORT = 3000;

app.get(`/`, (req, res) => {
  res.send(`Hello employees!`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const employees = require(`./employees`);

app.get(`/employees`, (req, res) => {
  res.json(employees);
});


/* `/employees/random` had to come before `/employees/:id`
so the api wouldn't interpret the endpoint as
.../:id */
app.get(`/employees/random`, (req, res) => {
  const random = Math.floor(Math.random()*employees.length);
  res.json(employees[random]);
});

app.get(`/employees/:id`, (req, res) => {
  const { id } = req.params;
  if (id < 0 || id >= employees.length){
    res.status(404).send(`Employee not found in directory`)
  } else {
    res.json(employees.find( (employee) => +id === employee.id))
  };
});
