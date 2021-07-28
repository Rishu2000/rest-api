const express = require('express');
const users = require('./api/users');
const todos = require('./api/todos');
const app = express();

app.use('/api',users);
app.use('/api',todos);

app.get('/api',(req, res) => {
    res.json("Server is running on api.");
})

module.exports = app;