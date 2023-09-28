require('dotenv').config();
const http = require('http');
const app = require('./index.js');

const server = http.createServer(app);
const port = process.env.PORT
server.listen(port, '127.0.0.1', () => {
    console.log(`Server Works at 127.0.0.1:${port}`);
});