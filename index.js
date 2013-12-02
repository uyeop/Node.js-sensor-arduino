var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var debug = false;

var handle = {};
handle["/"] = requestHandlers.sendInterface;
handle["/interface.html"] = requestHandlers.sendInterface;
handle["/myStyle.css"] = requestHandlers.sendMyCSS;
handle["/myScript.js"] = requestHandlers.sendMyJS; 
handle["/jquery-ui-1.9.2/themes/base/jquery-ui.css"] = requestHandlers.sendJqueryuiCSS;
handle["/jquery-ui-1.9.2/ui/jquery-ui.js"] = requestHandlers.sendJqueryuiJS;
handle["/jquery-ui-1.9.2/jquery-1.8.3.js"] = requestHandlers.sendJqueryJS;
handle["/nianCat.jpg"] = requestHandlers.sendImageCat;

server.start(router.route,handle,debug);
