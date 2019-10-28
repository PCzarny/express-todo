const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('~concepts/users/routes');
const taskRouter = require('~concepts/tasks/routes');

function startRestServer() {
  const app = express();

  app.use(express.urlencoded());

  // adding Helmet to enhance your API's security
  app.use(helmet());

  // parse JSON bodies into JS objects
  app.use(express.json());

  // enabling CORS for all requests
  app.use(cors());

  // adding morgan to log HTTP requests
  app.use(morgan('combined'));

  app.set('view engine', 'pug');
  app.set('views', './src/views');

  app.use('/users', userRouter);
  app.use('/tasks', taskRouter);

  app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = {
  startRestServer,
};
