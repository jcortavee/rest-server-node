require('./config/enviroment');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Body Parser - Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/users', (req, res) => {
    res.json('get User')
});

app.post('/users', (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            error: 'Name is not sent'
        });
    }

    res.json(body)
});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    })
});

app.delete('/users/:id', (req, res) => {
    res.json('get User')
});

app.listen(process.env.PORT, () => {
    console.log(`Server runing in port: ${process.env.PORT}`);
});