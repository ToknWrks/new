const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://api.mintscan.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODYyLCJpYXQiOjE3MzY1MjM3ODd9.BHLk1Asla3C9Gj9XCKEn9wOVBSO8rbPk3GaVZ3IeMLnUXl8IimMaNQN-9ZNybx4kv0Twd_JDWwFn4888fgwGHg`); // Replace with your actual API key
  },
}));

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3000');
});