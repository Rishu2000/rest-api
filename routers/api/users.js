const express = require('express');
const app = express();
const users = require('../../constants/users');

app.get('/users', (req, res) =>{
    const {Authenticated} = req.session;
    if(Authenticated){
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
    const {Authenticated} = req.session;
    res.json({Authenticated});
})
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(403).json("Please enter a username and password both.");
    }else{
        const match = users.filter((u) => u.Username.toLowerCase() === username.toLowerCase() && u.Password === password);
        if(match.length == 1){
            const user = {...match[0]};
            delete user.Password;
            req.session.Authenticated = user;
            res.json("You are in.");
        }else{
            req.session.destroy();
            res.status(404).json("Wrong Password or username.");
        }
    }
})
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.json("Logout")
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