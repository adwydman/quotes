const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const quotes = require('./data/quotes.js');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    fs.readFile('./data/name.json', 'utf8', (err, data) => {
        const name = JSON.parse(data);
        res.send({name, quotes}).status(200);
    });
});

app.post('/name', function(req, res) {
    const name = JSON.stringify(req.body);
    fs.writeFile('./data/name.json', name, 'utf8', (err, data) => {
        if (err) throw err;
        res.status(201).send({status: "Added name"});
    });
});

app.post('/reset', function(req, res) {
    fs.writeFile('./data/name.json', '{"name": ""}', 'utf8', (err, data) => {
        if (err) throw err;
        res.status(201).send({status: "Reset"});
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
