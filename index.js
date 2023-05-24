// express web server
const mongodb = require('project02/db/connect')
const express = require('express');
const app = express();
const bodyParser = require('express');

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('project02/routes')); // Calls the routes to view the data

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