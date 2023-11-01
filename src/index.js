import http from 'http';
import config from './utils/config.js'
const app = import.meta.resolve('./app.js');
const server = http.createServer(app, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(config.PORT)