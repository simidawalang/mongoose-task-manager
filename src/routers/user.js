const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        if(!users){
            res.status(404).send();
        }
        res.send(users);
    } catch(e){
        res.status(500).send(e.message);
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ['name', 'age', 'email', 'password'];
    const isValidUpdate = updates.every((update) => validUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(404).send({error: 'Invalid update field.'})
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

    try {
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(505).send();
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            res.status(404).send();
        }
        res.send(user);
    } catch(e){
        res.status(500).send();
    }
});


module.exports = router;