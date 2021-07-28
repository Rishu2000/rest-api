const express = require('express');
const app = express();
const users = require('../../constants/users');

app.get('/users', (req, res) =>{
    res.json(users)
})
app.get('/users/:id', (req, res) =>{
    const index = +req.params.id;
    if(users[index]){
        res.json(users[index]);
    }else{
        res.status(404).json("Not Found");
    }
})

module.exports = app;