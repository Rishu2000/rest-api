const express = require('express');
const app = express();
const users = require('../../constants/users');

let Authentication = false;

app.use(express.json());
app.get('/users', (req, res) =>{
    if(Authentication){
        res.json(users.map((u,UserId) => {
            const a = {UserId, ...u};
            delete a.Password;
            return a;
        }))
    }else{
        res.status(401).json("Please login to see.")
    }
})
app.get('/login', (req, res) => {
    res.json({Authentication});
})
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(403).json("Please enter a username and password both.");
    }else{
        const match = users.filter((u) => u.Username.toLowerCase() === username.toLowerCase() && u.Password === password);
        if(match.length == 1){
            Authentication = true;
            res.json("You are in.");
        }else{
            Authentication = false;
            res.status(404).json("Wrong");
        }
    }
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