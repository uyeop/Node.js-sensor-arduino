// functions that will be executed when 
// typeoff handle[pathname] === a function in requestHandlers.
// the handle and function are discribed in index.js

var fs = require('fs'),
server = require('./server');


/* 
* This function answers a request for the .html files 
* from the clients 
*/
function sendHTML(response, pathname) {
  console.log("Request handler for .html files was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  if(pathname == "/") //a request for the home page is asked
  {
      pathname = "/tableView.html";
  }
  var html = fs.readFileSync(__dirname + "/pages" + pathname);
  response.end(html);
}


/* 
* This function answers a request for the .css files 
* from the clients 
*/
function sendCSS(response, pathname) {
  console.log("Request handler .css files was called.");
  response.writeHead(200, {"Content-Type": "text/css"});
  var css = fs.readFileSync(__dirname + "/pages" + pathname);
  response.end(css);
}


/* 
* This function answers a request for the .js files 
* from the clients 
*/
function sendJS(response, pathname) {
  console.log("Request handler for the .js files was called.");
  response.writeHead(200, {"Content-Type": "application/javascript"});
  var css = fs.readFileSync(__dirname + "/pages" + pathname);
  response.end(css);
}


/* 
* This function answers a request for the .jpg files 
* from the clients 
*/
function sendJPG(response, pathname) {
  console.log("Request handler for the.jpg files was called.");
  response.writeHead(200, {"Content-Type": "image/jpeg"});
  var jpg = fs.readFileSync(__dirname + "/pages" + pathname);
  response.end(jpg);
}


exports.sendHTML = sendHTML;
exports.sendCSS = sendCSS;
exports.sendJS = sendJS;
exports.sendJPG = sendJPG;
