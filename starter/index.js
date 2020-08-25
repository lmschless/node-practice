import fs from 'fs';
import http from 'http';
import url from 'url';
import path from 'path';
import slugify from 'slugify';

import replaceTemplate from './modules/replaceTemplate.js';
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
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => {
  console.log(slugify(el.productName, { lower: true }));
});

// console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // const pathName = req.url;
  // Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj
      .map((card) => replaceTemplate(tempCard, card))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    // console.log(cardsHtml);
    res.end(output);
    // Product
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // API
  } else if (pathname === '/api') {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end(output);
    // Not Found
  } else {
    // writeHead sends a status code and a header
    // to tell the browser what to expect
    // Have to send headers before the response
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('Page not found!');
  }
});

// default to port 8000, localhost 127.0.0.1
// pass into listen(port, host, optional callback function)

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
