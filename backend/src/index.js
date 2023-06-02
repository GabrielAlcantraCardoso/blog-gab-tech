const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool } = require('./db');
const { routesApp } = require("./routes");
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(cors());

  app.use(express.json({ limit: '50mb' }));


  
routesApp(app);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});