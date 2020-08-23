import fs from 'fs';
import http from 'http';
import url from 'url';
import path from 'path';

const __dirname = path.resolve();
//////////////////////////////////
//// FILES

//// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log(`File Written!`);

//// Non-Blocking way / callback way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
// 	if (err) return console.log('ERROR!');
// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
// 		console.log(data2);
// 		fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
// 			console.log(data3);
// 			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
// 				console.log('Your file has been written!');
// 			});
// 		});
// 	});
// });
// console.log('Will read file!');
//////////////////////////////////
//// SERVER
//// need to save createServer to a variable to call it later.

// use ${__dirname} instead of ./ because it's based on wherever index.js is run. This makes it more dynamic.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;
  if (pathName === '/overview') {
    res.end('This is the overview!');
  } else if (pathName === '/product') {
    res.end('This is the product!');
  } else if (pathName === '/api') {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end(data);
  } else {
    // writeHead sends a status code and a header
    // to tell the browser what to expect
    // Have to send headers before the response
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
  }
});

// default to port 8000, localhost 127.0.0.1
// pass into listen(port, host, optional callback function)

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
