const express = require('express');
const app = express();
const User = require('./models/user.js');
require('./db/mongoose.js');

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user)
    }).catch(e => e.message)
});

app.listen(port, () => {
    console.log('Server running');
});