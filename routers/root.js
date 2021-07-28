const express = require('express');
const app = express();
const api = require('./api');

app.use(api);

app.get('/', (req, res) =>{ 
    res.json("Server is running again");
})

module.exports = app;