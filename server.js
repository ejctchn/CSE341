// express web server
const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send("I am the");
});

app.get('/', (req,res) => {
  res.send("best there ever was! ");
});

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || 3000));