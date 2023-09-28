const proxyConfig = [
    {
        context: '/api',
        target: 'http://localhost:5500',
        secure: false
    },
];

module.exports = proxyConfig;

