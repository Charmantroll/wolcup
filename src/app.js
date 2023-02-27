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

module.exports = application;
module.exports.handler = serverless(application)
