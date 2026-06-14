const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Setup Docker', status: 'done' },
  { id: 2, title: 'Configure Jenkins', status: 'done' },
  { id: 3, title: 'Deploy to Kubernetes', status: 'pending' }
];

app.get('/api/tasks', (req, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, status: 'pending' };
  tasks.push(task);
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
