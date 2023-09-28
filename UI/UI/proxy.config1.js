const proxyConfig = [
    {
        context: '/api',
        target: 'http://localhost:5501',
        secure: false
    },
];

module.exports = proxyConfig;

