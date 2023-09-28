const proxyConfig = [
    {
        context: '/api2',
        target: 'http://localhost:5502',
        secure: false
    }
];

module.exports = proxyConfig;
