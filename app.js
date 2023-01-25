require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initDB = require('./initDB');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Imports for Routes
const todoRoutes = require('./routes/todo');

const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const swaggerDefinition = {
  info: {
    title: 'TODO Api',
    version: '1.0.0',
    description: 'RESTful API for TODO application'
  },
  host: `localhost:${PORT}`,
  basePath: '/api'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    })
  )
  .catch((error) => console.log('Connection failed ', error));
