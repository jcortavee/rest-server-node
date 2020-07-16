const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

app.get('/users', (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    
    User.find({status: true}, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    err: err
                });
            }

            User.count({status: true}, (err, count) => {
                res.json({
                    users,
                    count
                });
            })

        });

});

app.post('/users', (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google
    });

    user.save((err, userSaved) => {

        if (err) {
            return res.status(400).json({
                err: err
            });
        }

        res.json(userSaved);

    });
});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userSaved) => {
        if (err) {
            return res.status(400).json({
                err: err
            });
        }

        res.json(userSaved);

    });
});

app.delete('/users/:id', (req, res) => {
    /*let id = req.params.id;

    User.findByIdAndDelete(id, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                err: err
            });
        }

        if (userDeleted)

        res.json({
            user: userDeleted
        });
    });*/

    let id = req.params.id;

    let body = {
        status: false
    }

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userSaved) => {
        if (err) {
            return res.status(400).json({
                err: err
            });
        }

        res.json(userSaved);

    });
    
});

module.exports = app;