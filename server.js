const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) =>{ 
    res.json("Srever is running");
})

app.listen(port, () => { 
    console.log("server listening to the port " + port);
});