const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const messages = [];
const messagesCustom = [];

app.post('/message', (req, res) => {
    const message = req.body;
    messages.push(message);
    res.sendStatus(200);
});

app.post('/messageCustom', (req, res) => {
    const messageCustom = req.body;
    messagesCustom.push(messageCustom);
    res.sendStatus(200);
});

app.get('/messages', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(messages));
    messages.length = 0; 
});

app.get('/messagesCustom', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(messagesCustom));
    messagesCustom.length = 0;
});

app.listen(5502, () => {
    console.log('Serverul HTTP este pornit și ascultă pe portul 5502');
});