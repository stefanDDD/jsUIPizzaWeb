const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { mapToCanActivate } = require('@angular/router');
const app = express();

app.use(cors());
app.use(bodyparser.json());

const connection = MySql.createConnection({
    host: 'tcp://127.0.0.1:3307',
    user: 'root',
    password: 'Andreeas18MySql',
    database: 'siemensprojectdb'
});

connection.connect((error) => {
    if (error) {
        console.error('Error Connecting to DB:', error);
    } else {
        console.log('Connected to db');
    }
});

app.listen(3000, () => {
    console.log("Server is running");
})
