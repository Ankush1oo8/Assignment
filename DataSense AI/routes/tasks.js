const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Render task list
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('index', { tasks, error: null });
  } catch (err) {
    res.render('index', { tasks: [], error: 'Failed to fetch tasks' });
  }
});

// Render edit form
router.get('/tasks/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.render('edit', { task: null, error: 'Task not found' });
    res.render('edit', { task, error: null });
  } catch (err) {
    res.render('edit', { task: null, error: 'Failed to load task' });
  }
});

// Create task (form submission)
router.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.length < 3) {
    const tasks = await Task.find();
    return res.render('index', { tasks, error: 'Title must be at least 3 characters long' });
  }
  if (!description) {
    const tasks = await Task.find();
    return res.render('index', { tasks, error: 'Description is required' });
  }
  try {
    const task = new Task({ title, description });
    await task.save();
    res.redirect('/');
  } catch (err) {
    const tasks = await Task.find();
    res.render('index', { tasks, error: 'Failed to save task' });
  }
});

// Update task (form submission)
router.post('/tasks/edit/:id', async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.length < 3) {
    const task = await Task.findById(req.params.id);
    return res.render('edit', { task, error: 'Title must be at least 3 characters long' });
  }
  if (!description) {
    const task = await Task.findById(req.params.id);
    return res.render('edit', { task, error: 'Description is required' });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!task) return res.render('edit', { task: null, error: 'Task not found' });
    res.redirect('/');
  } catch (err) {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task, error: 'Failed to update task' });
  }
});

// Delete task
router.post('/tasks/delete/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      const tasks = await Task.find();
      return res.render('index', { tasks, error: 'Task not found' });
    }
    res.redirect('/');
  } catch (err) {
    const tasks = await Task.find();
    res.render('index', { tasks, error: 'Failed to delete task' });
  }
});

// API Routes (kept for compatibility)
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;