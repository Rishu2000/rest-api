const express = require('express');
const app = express();

app.get('/todos', (req, res) =>{
    res.json("You are in todos server.")
})

module.exports = app;