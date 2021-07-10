const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connected.');
}).catch((e) => {
    console.log(e.message);
});