const express = require('express');
const Task = require('../models/task.js');

const router = express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        if(!tasks){
            return res.status(404).send();
        }
        res.send(tasks);
    } catch(e){
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    try {
        if(!task){
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ['task', 'completed'];
    const isValidUpdate = updates.every((update) => validUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(404).send({error: 'Invalid update field.'})
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

    try {
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(505).send();
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch(e){
        res.status(500).send();
    }
});



module.exports = router;