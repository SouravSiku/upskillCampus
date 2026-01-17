const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory array to store tasks
let tasks = [
    { id: 1, title: "Initial Project Setup", desc: "Setting up Node.js environment" }
];

// Get all tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// Add new task
app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.json(newTask);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Deleted" });
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        tasks[index] = { id: parseInt(req.params.id), ...req.body };
        res.json(tasks[index]);
    }
});

app.listen(5000, () => console.log('Backend running at http://localhost:5000'));