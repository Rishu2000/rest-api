const express = require('express');
const app = express();
const users = require('../../constants/users');

app.get('/users', (req, res) =>{
    res.json(users.map((u,UserId) => {
        const a = {UserId, ...u};
        delete a.Password;
        return a;
    }))
})
app.get('/users/:id', (req, res) =>{
    const index = +req.params.id;
    if(users[index]){
        const a = {"UserId": index, ...users[index]}
        delete a.Password;
        res.json(a);
    }else{
        res.status(404).json("Not Found");
    }
})

module.exports = app;