const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const root = require('./routers/root');
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(session({
    secret:'corona',
    resave:false,
    saveUninitialized:false
}))
app.use('/',root);

app.listen(port, () => { 
    console.log("server listening to the port " + port);
});