const express = require('express');
const app = express();
const users = require('../../constants/users');

app.get('/users', (req, res) =>{
    res.json(users)
})

module.exports = app;