const express = require('express');
const serverless = require('serverless-http')
const cors = require('cors');
const path = require('path');
const querystring = require('querystring');
const fetch = require('node-fetch');

const configs = {
  puerto: 3000,
  clienteid: "e9f6216b9d1d4090b48d418f1617f809",
  clientesecreto: "da853cae1a5b4bcba80b79721cdbaae9",
  redirecturi: "http://localhost:3000/.netlify/functions/api/logged",
  clienteredirect:"http://localhost:3000/.netlify/functions/api/token/",
}

const PORT = configs.puerto|| 8888;
const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors());
application.set('view engine', 'ejs')

// this can be used as a seperate module
const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

const router = express.Router();

router.get('/login', async (req, res) => {
  const scope =
      `user-read-playback-state`;

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
          response_type: 'code',
          client_id: configs.clienteid,
          scope: scope,
          redirect_uri: configs.redirecturi
      })
  );
});

router.get('/token', async (req, res) => {
  console.log(req.query)
  //res.send(req.query.access_token)
  //res.sendFile(path.join(__dirname, '../public/html/PaginaToken.html'));
  res.render(path.join(__dirname, './public/html/PaginaToken'), {
      token: req.query.access_token
  })
})

router.get('/style/PaginaToken.css', async (req, res) => {
  res.sendFile(path.join(__dirname, './public/style/PaginaToken.css'));
})

router.get('/js/index.js', async (req, res) => {
  res.sendFile(path.join(__dirname, './public/js/index.js'));
})

router.get('/logged', async (req, res) => {
  const body = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: configs.redirecturi,
      client_id: configs.clienteid,
      client_secret: configs.clientesecreto,
  }

  await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
          },
          body: encodeFormData(body)
      })
      .then(response => response.json())
      .then(data => {
          const query = querystring.stringify(data);
          res.redirect(`${configs.clienteredirect}?${query}`);
      });
});

application.use('/.netlify/functions/api', cors(), router);

application.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports.handler = serverless(application)