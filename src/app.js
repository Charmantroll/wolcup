const express = require('express');
const serverless = require('serverless-http')
const cors = require('cors');
const configs = require('./settings/configs');

const PORT = configs.puerto|| 8888;
const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors());
application.set('view engine', 'ejs')

const AuthRoutes = require('./routes/authRoutes.js');
application.use('/.netlify/functions/api', cors(), AuthRoutes);

application.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports.handler = serverless(application)