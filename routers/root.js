const express = require('express');
const app = express();
const api = require('./api');

app.use(api);

app.get('/', (req, res) =>{ 
    if(req.headers["user-agent"].toLowerCase().indexOf('postman') > -1){
        res.json("Welcome Developer");
    }else{
        res.json("Server is running again");
    }
})

module.exports = app;