// functions that will be executed when 
// typeoff handle[pathname] === a function in requestHandlers.
// the handle and function are discribed in index.js

var fs = require('fs'),
server = require('./server');


/* 
* This function answers a request for an HTML file 
* from the clients 
*/
function sendInterface(response) {
  console.log("Request handler 'interface' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/interface.html");
  response.end(html);
}

/* 
* This function answers a request for the myStyle.CSS file 
* from the clients 
*/
function sendMyCSS(response) {
  console.log("Request handler 'myStyle.css' was called.");
  response.writeHead(200, {"Content-Type": "text/css"});
  var css = fs.readFileSync(__dirname + "/pages/myStyle.css");
  response.end(css);
}

/* 
* This function answers a request for the jquery-ui.CSS file 
* from the clients 
*/
function sendJqueryuiCSS(response) {
  console.log("Request handler 'jquery-ui.css' was called.");
  response.writeHead(200, {"Content-Type": "text/css"});
  var css = fs.readFileSync(__dirname + "/pages/jquery-ui-1.9.2/themes/base/jquery-ui.css");
  response.end(css);
}

/* 
* This function answers a request for the myScript.js file 
* from the clients 
*/
function sendMyJS(response) {
  console.log("Request handler 'myScript.js' was called.");
  response.writeHead(200, {"Content-Type": "application/javascript"});
  var css = fs.readFileSync(__dirname + "/pages/myScript.js");
  response.end(css);
}


/* 
* This function answers a request for the jquery-ui.js file 
* from the clients 
*/
function sendJqueryuiJS(response) {
  console.log("Request handler 'myScript.js' was called.");
  response.writeHead(200, {"Content-Type": "application/javascript"});
  var css = fs.readFileSync(__dirname + "/pages/jquery-ui-1.9.2/ui/jquery-ui.js");
  response.end(css);
}

/* 
* This function answers a request for the jquery.js file 
* from the clients 
*/
function sendJqueryJS(response) {
  console.log("Request handler 'myScript.js' was called.");
  response.writeHead(200, {"Content-Type": "application/javascript"});
  var css = fs.readFileSync(__dirname + "/pages/jquery-ui-1.9.2/jquery-1.8.3.js");
  response.end(css);
}


exports.sendInterface = sendInterface;
exports.sendMyCSS = sendMyCSS;
exports.sendJqueryuiCSS = sendJqueryuiCSS;
exports.sendMyJS = sendMyJS;
exports.sendJqueryuiJS = sendJqueryuiJS;
exports.sendJqueryJS = sendJqueryJS;
