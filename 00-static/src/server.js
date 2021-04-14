// src/server.js
const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');

async function bootstrap() {
  server.use(express.static(publicDir));
  await promisify(server.listen.bind(server, port))();
  console.log("服务已经启动： http:localhost:9000 ")
  console.log(`> Started on port ${port}`);
}

bootstrap();