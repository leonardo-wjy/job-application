const http = require('http');
const express = require('express');
const app  = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoutes = require('./routes/user');
const formRoutes = require('./routes/form');

app.use(cors())

const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

global.appRoot = require("path").resolve(__dirname);

var options = {
    swaggerDefinition: {
        openapi: '3.0.1', // YOU NEED THIS
        info: {
          title: 'Your API title',
          version: '1.0.0',
          description: 'Your API description'
        },
        basePath: '/',
        components: {
          securitySchemes: {
            access_token: {
              type: 'apiKey',
              name: 'access_token',
              in: 'header'
            }
          }
        }
      },
    apis: ['./routes/index.js'], // Path to the API docs
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
