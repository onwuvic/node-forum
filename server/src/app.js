import logger from 'morgan';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

// Set up the express app
const app = express();

// set cors
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set base url for api
routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use('*', (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.status(404).json({
    status: 'fail',
    message: `Not Found. ${fullUrl} API does not exist`
  });
});

module.exports = app;
