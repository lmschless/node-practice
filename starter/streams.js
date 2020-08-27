import fs from 'fs';
import http from 'http';

const server = http.createServer();

// how to read a large file or send a large file in response, use streams
// send a response with test-file.txt which has 100k lines of text.

server.on('request', (req, res) => {
  //// Method 1
  //// With this solution, Node will have to load the entire file in memory before sending a response back.
  // fs.readFile('tes t-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Method 2: Streams
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   // sent data using res.write(data) so just need to end the stream here.
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });

  // Method 3
  // readableSource.pipe(writeableDest)
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server listening');
});
