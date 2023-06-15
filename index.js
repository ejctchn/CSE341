// express web server
const mongodb = require('./db/connect')
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();
const bodyParser = require('express');

const port = process.env.PORT || 3000;

app.use(session({secret : process.env.GITHUB_CLIENT_SECRET, resave : false, saveUninitialized : true}))

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes')); // Calls the routes to view the data

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
    // Event Listener
        app.listen(port);
        // Log message
        console.log(`Connected to DB and listening at port ${port}`);
    }
});

app.get('/login', (req, res) => 
    {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`);
    });

app.get('/oauth-callback', (req, res) => {
    console.log("Test");
    const { code } = req.query;
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => 
      {
        req.session.token = _res.data.access_token;
        res.redirect("/api-docs");
    })
      
      .catch((err) => res.status(500).json({ err: err.message }));
  });

app.get('/logout', (req, res) => 
    {
        req.session.token = null;
        res.redirect("/api-docs");
    });
