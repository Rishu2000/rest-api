const express = require('express');
const app = express();
const todos = require('../../constants/todos');

app.get('/todos', (req, res) =>{
    res.json(todos)
})
app.get('/todos/:id', (req, res) =>{
    const index = +req.params.id;
    if(todos[index]){
        res.json(todos[index]);
    }else{
        res.status(404).json("Not Found");
    }
})

module.exports = app;