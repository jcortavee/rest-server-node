require('./config/enviroment');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// Body Parser - Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('../controllers/user'));






mongoose.connect(process.env.URL_DATABASE, { useCreateIndex: true, useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    }

    console.log(`Connection to db was successfully`);
});


app.listen(process.env.PORT, () => {
    console.log(`Server runing in port: ${process.env.PORT}`);
});