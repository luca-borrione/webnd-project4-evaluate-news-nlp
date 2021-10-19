require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

const server = app.listen(PORT, console.log(`server running on localhost ${PORT}`)); // eslint-disable-line no-console

app.get('/test', (req, res) => {
  res.send(mockAPIResponse);
});

module.exports = {
  app,
  server,
};
