const express = require('express');
const app = express();
const todos = require('../../constants/todos');

app.get('/todos', (req, res) =>{
    res.json(todos)
})

module.exports = app;