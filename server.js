const express = require('express');
const app = express();
const morgan = require('morgan');
const root = require('./routers/root');
const port = 3001;

app.use(morgan("dev"));
app.use('/',root);

app.listen(port, () => { 
    console.log("server listening to the port " + port);
});