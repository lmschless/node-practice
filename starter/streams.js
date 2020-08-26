import fs from 'fs';
import http from 'http';

const server = http.createServer();

// how to read a large file or send a large file in response, use streams
// send a response with test-file.txt which has 100k lines of text.
// With this solution, Node will have to load the entire file in memory before
// sending a response back.
server.on('request', (req, res) => {
  // Solution 1
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server listening');
});
