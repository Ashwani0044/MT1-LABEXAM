import express from 'express';

const app = express();
const PORT = 4000;

// Configure JSON middleware
app.use(express.json());

// Initialize sample employee task records (at least 3 tasks)
let tasks = [
    {
        "id": 1,
        "taskName": "Develop Login Page",
        "assignedTo": "Rahul Sharma",
        "status": "Pending",
        "priority": "High"
    },
    {
        "id": 2,
        "taskName": "Design Database Schema",
        "assignedTo": "Priya Singh",
        "status": "Completed",
        "priority": "Medium"
    },
    {
        "id": 3,
        "taskName": "Setup Project Repository",
        "assignedTo": "Amit Kumar",
        "status": "In Progress",
        "priority": "Low"
    }
];

// GET /tasks - Retrieve all employee tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;
    
    if (!id || !taskName || !assignedTo || !status) {
        return res.status(400).json({ error: 'Missing required task details' });
    }

    const newTask = { id, taskName, assignedTo, status, priority: priority || 'Medium' };
    tasks.push(newTask);
    
    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { taskName, assignedTo, status, priority } = req.body;
    
    // Update fields if provided
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(taskName && { taskName }),
        ...(assignedTo && { assignedTo }),
        ...(status && { status }),
        ...(priority && { priority })
    };

    res.status(200).json({
        message: "Task updated successfully",
        task: tasks[taskIndex]
    });
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});