const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const root = require('./routers/root');
const port = 3001;

app.use(cors());
app.use(morgan("dev"));
app.use('/',root);

app.listen(port, () => { 
    console.log("server listening to the port " + port);
});