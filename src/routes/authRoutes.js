const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const querystring = require('querystring');
const configs = require('../settings/configs');
const path = require('path');

// this can be used as a seperate module
const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

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
    res.render(path.join(__dirname, '../public/html/PaginaToken'), {
        token: req.query.access_token
    })
})

router.get('/style/PaginaToken.css', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/style/PaginaToken.css'));
})

router.get('/js/index.js', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/index.js'));
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

module.exports = router;