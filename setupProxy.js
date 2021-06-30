const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://118.47.21.114:5000/api',
      changeOrigin: true,
    }),
  );
};
