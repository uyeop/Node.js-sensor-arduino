var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var debug = false;


//need to add a handler for each new files to be requested by the clients (html, css, js, images)
var handle = {};
handle["/"] = requestHandlers.sendHTML;
handle["/tableView.html"] = requestHandlers.sendHTML;
handle["/tableViewStyle.css"] = requestHandlers.sendCSS;
handle["/tableViewScript.js"] = requestHandlers.sendJS;

handle["/game.html"] = requestHandlers.sendHTML;
handle["/gameStyle.css"] = requestHandlers.sendCSS;
handle["/gameScript.js"] = requestHandlers.sendJS;

handle["/jquery-ui-1.9.2/themes/base/jquery-ui.css"] = requestHandlers.sendCSS;
handle["/jquery-ui-1.9.2/ui/jquery-ui.js"] = requestHandlers.sendJS;
handle["/jquery-ui-1.9.2/jquery-1.8.3.js"] = requestHandlers.sendJS;
handle["/nianCat.jpg"] = requestHandlers.sendJPG;

server.start(router.route,handle,debug);
