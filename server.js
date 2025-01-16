const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

let tasks = [];
let currentId = 1;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { subject, name, deadline } = req.body;
  const newTask = { id: currentId++, subject, name, deadline, status: null };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { subject, name, deadline } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (task) {
    task.subject = subject;
    task.name = name;
    task.deadline = deadline;
    task.status = null; // Reset status when task is updated
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
