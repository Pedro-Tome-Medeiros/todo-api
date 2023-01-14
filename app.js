const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import Credentials
const mongo = require('./credentials/mongo');

// Imports for Routes
const todoRoutes = require('./routes/todo');

const app = express();

mongoose
  .connect(mongo.localConnString, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log(error);
    console.log('Connection failed!');
  });

// Use body-parser to parse incoming reuests
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Use Cors to avoid annoying CORS Errors
app.use(cors());

app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.baseUrl);

  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/todo', todoRoutes);

app.use('/api/info', (req, res, next) => {
  res.status(200).json({
    name: 'TODO Api',
    version: '1.0',
    description: 'RESTful API for TODO application.',
    methodsAllowed: 'GET, POST, PUT, PATCH, DELETE',
    authType: 'None'
  });
});

app.listen(8001, () => {
  console.log('server listening on port 8001');
});

// https://github.com/toslimarif/todo-api
