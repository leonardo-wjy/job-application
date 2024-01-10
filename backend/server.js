const http = require('http');
const express = require('express');
const app  = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoutes = require('./routes/user');
const formRoutes = require('./routes/form');

app.use(cors())

global.appRoot = require("path").resolve(__dirname);

app.use(
    bodyParser.urlencoded({
        limit: "100mb",
        parameterLimit: 100000,
        extended: true,
    }),
    bodyParser.json({
        limit: "100mb",
    })
);
  

app.use('/user', userRoutes);
app.use('/form', formRoutes);

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port);
