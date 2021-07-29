const express = require('express');
const app = express();
const users = require('../../constants/users');

app.use((req, res, next) => {
    const {Authenticated} = req.session;
    if(Authenticated || (req.path === '/users' && req.method === 'POST') || (req.path === '/login')){
        next();
    }else{
        res.status(401).json("Please login to see.")
    }
})

app.get('/users', (req, res) =>{
    res.json(users.map((u,UserId) => {
        const a = {UserId, ...u};
        delete a.Password;
        return a;
    }))
})
app.post('/users', (req, res) => {
    const {Username,Name,Password,LinkedIn} = req.body;
    if(!Username || !Name || !Password){
        res.status(400).json({
            Success:false,
            Message:"Please provide all the required fields."
        });
    }else{
        if(Username.trim().length > 3 && Password.trim().length > 4 && Name.trim().length > 4){
            const match = users.filter(u => u.Username == Username);
            console.log(match)
            if(match.length > 0){
                res.status(408).json({
                    Success:false,
                    Message:"Username is not available."
                });
            }else{
                users.push({Username,Name,Password,LinkedIn});
                res.status(201).json({
                    Success:true,
                    Message:`${Username} has been created.`
                })
            }
        }else{
            res.status(500).json({
                Success:false,
                Message:"Bad Credentisial."
            });
        }
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
            res.json({
                Success: true,
            });
        }else{
            req.session.destroy();
            res.status(404).json("Wrong Password or username.");
        }
    }
})
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({
        Success: true
    })
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
app.delete('/users/:id', (req, res) => {
    const indexNo = +req.params.id;
    if(users[indexNo]){
        delete users[indexNo];
        res.json("Succefully deleted.")
    }else{
        res.status(404).json("Not Found");
    }
})

module.exports = app;