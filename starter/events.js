import EventEmitter from 'events';
import http from 'http';

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});

myEmitter.on('newSale', (stock) => {
  console.log(`here are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9);

////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received!');
  res.end('Request Received!');
});

server.on('request', (req, res) => {
  console.log('Another Request received!');
  console.log('Another Request Received!');
});

server.on('close', () => {
  console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server listening');
});
