const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://investment-v9as.onrender.com',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};