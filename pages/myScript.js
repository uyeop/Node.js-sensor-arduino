// canvas request for all browsers
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 30); // 30 frames per second
  };
})();
  
var iosocket;
var sensorCoordinates = { "pos0": [0, 0, 160, 240], 
                          "pos1": [160, 0, 320, 240], 
                          "pos2": [320, 0, 480, 240], 
                          "pos3": [480, 0, 640, 240],
                          "pos4": [0, 240, 160, 480],
                          "pos5": [160, 240, 320, 480],
                          "pos6": [320, 240, 480, 480],
                          "pos7": [480, 240, 640, 480],
                        };  
  
function initSocketIO()
{
	iosocket = io.connect();
	iosocket.on('onconnection', function(value) {
	    $( "#text" ).html(value.frame); // receive start poll value from server
	    
        //init the sensors area
        drawCanvas();
    
			
	    // receive changed values by other client from server
	    iosocket.on('updateData', function (receivedData) {
		
            var states = receivedData.frame; 
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            
            $( "#text" ).html(states);
            
            for(var i=0; i<states.length; i++)
            {
                if(states.charAt(i) == "1")
                {
                    var array = sensorCoordinates["pos"+i];
                    ctx.fillStyle="#FF0000";    
                    ctx.fillRect(array[0],array[1],array[2],array[3]);
                }
                else if(states.charAt(i) == "0")
                {
                    var array = sensorCoordinates["pos"+i];
                    ctx.fillStyle="#FFFFFF";    
                    ctx.fillRect(array[0],array[1],array[2],array[3]);
                }
            }
            
            drawCanvas();
        
	    });
    });
}


//Draw the lines of the canvas  
function drawCanvas()
{
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    //draw first vertical line
    ctx.moveTo(160,0);
    ctx.lineTo(160,480);
    ctx.stroke();
    //draw second vertical line
    ctx.moveTo(320,0);
    ctx.lineTo(320,480);
    ctx.stroke();
    //draw third vertical line
    ctx.moveTo(480,0);
    ctx.lineTo(480,480);
    ctx.stroke();
    //draw the horizontal line
    ctx.moveTo(0,240);
    ctx.lineTo(640,240);
    ctx.stroke(); 
}




window.onload = function() 
{
    initSocketIO();
};
  
$(document).ready(function() 
                    {
                    });