var editor;
var heading_v;
var states, state;
var canvas, ctx;
var sprite;
var wrapOn = true, gridOn = true;

Event.observe(window, 'load', function() {
      sprite = document.getElementById("sprite");
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      
      setupEditor();
      setupToLoadSamples();

      reset();
      draw();
   });
   
 function setupEditor()
 {
     editor = CodeMirror.fromTextArea("editBox", {
       parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
       path: "codemirror/js/",
       stylesheet: "codemirror/css/jscolors.css",
       width: "600px", height: "500px",
       content: "// js code editor\n\nfd(100);\n",
       initCallback: afterEditorInit
     });
 }
 
 function afterEditorInit()
 {
      setupRun();
      focusEditor();
 }
 
function focusEditor()
{
      editor.focus();
      // no method to put cursor at end..
      var lastLine = editor.getCode().split("\n").length;
      editor.jumpToLine(lastLine);
 }

function setupRun()
{
  var fn = function (evt) {
    if ( (evt.which == 101 || evt.which == 69) && evt.metaKey)
    {
      if (evt.shiftKey)
      {
        runSelection();
      }
      else
      {
        runCode();
      }
      Event.stop(evt);
    }
  };
  Event.observe(document, 'keydown', fn);
  Event.observe($("runBtn"), 'click', runCode);
  Event.observe($("runSelectionBtn"), 'click', runSelection);
}

 function setupToLoadSamples()
 {
 	$$("#samples a").each(function(link) {
 		Event.observe(link, 'click', function(event) {
        new Ajax.Request(link.href, {
    	  method: 'get',
  	  onSuccess: function(transport) {
  	  	editor.setCode(transport.responseText);
  	  	focusEditor();
  	  }
	});
	Event.stop(event);
 		})
 	});
 }

 function reset()
 {
     states = [];
     state = State.new();
     setPos(0, 0);
     setHeading(90);
 }

 function draw()
 {
     ctx.fillStyle = "rgb(255,255,255)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);

     ctx.save();
     
     ctx.translate(250, 250);
     ctx.scale(1.0, -1.0);

     if (gridOn)
	   {
	    	drawCoordinateGrid(ctx);
	   }

     var s1 = states.first();
     ctx.beginPath();
     ctx.moveTo(s1.v.x, s1.v.y);
     for (var i=1; i<states.length; i++)
     {
         var s2 = states[i];
         if (s2.pendown)
         {
             ctx.strokeStyle = s2.pencolor;
             ctx.lineWidth = s2.pensize;
             ctx.lineTo(s2.v.x, s2.v.y);

             // i don't like having to do this..
             ctx.stroke();
             ctx.beginPath();
             ctx.moveTo(s2.v.x, s2.v.y);
         }
         else
         {
             ctx.moveTo(s2.v.x, s2.v.y);
         }

         s1 = s2;
     }
     ctx.stroke();

     drawHeadingIndicator(ctx);

     ctx.restore();
 }

 function drawCoordinateGrid(ctx)
 {
   var lineColor = "rgba(133, 150, 203, 0.5)";
   var axisColor = "rgba(205, 81, 92, 0.5)";
   var minorStep = 50;
   for (var i=-240; i<=240; i+=10)
   {
       if (i==0)
       {
           ctx.strokeStyle = axisColor;
       }
       else
       {
           ctx.strokeStyle = lineColor;
       }
       var minor = (i % minorStep == 0);
       ctx.lineWidth = minor ? 1 : 0.5;
       ctx.beginPath();
       ctx.moveTo(i,-250);
       ctx.lineTo(i, 250);
       ctx.moveTo(-250,i);
       ctx.lineTo(250,i);
       ctx.stroke();
   }
 }


 function drawHeadingIndicator(ctx)
 {
   var theta = heading_rads();
   var lastPos = states.last().v;
   ctx.translate(lastPos.x, lastPos.y);
   ctx.rotate(theta);

   ctx.rotate(Math.PI/2);
   ctx.drawImage(sprite, -sprite.width/2.0, -sprite.height/2.0);
   ctx.rotate(-Math.PI/2);

   ctx.rotate(-theta);
   ctx.translate(-lastPos.x, -lastPos.y);
 }


 function runCode()
 {
     eval(editor.getCode());
     draw();
 }
 
 /* 
  * a smarter version would load all the function definitions even if not selected
  */
 function runSelection()
 {
 	eval(editor.selection());
 	draw();
 }


 /**
  * setpos implies that you'll be taking the pen up while you "move" to the new position
  */
 function setPos(x, y) {
     state.v = new Vector(x, y);
     states[states.length] = new State(state.v, false, state.pencolor, state.pensize);
 }
 function getPos() { return states[states.length - 1].v; }

 function heading_rads() {
     return Math.atan(heading_v.y/heading_v.x) + ((heading_v.x>=0) ? 0 : Math.PI);
 }
 function getHeading() {
     return rad2deg(heading_rads());
 }
 function setHeading(angleDegrees) {
     var rads = deg2rad(angleDegrees);
     heading_v = new Vector(Math.cos(rads), Math.sin(rads));
 }
 function setPenDown(down) { state.pendown = down; }
 function setPenSize(size) { state.pensize = size; }
 function setPenColor(color) { state.pencolor = color; }
 function setGridOn(on) { gridOn = on; }
 function setWrapOn(on) { wrapOn = on; }

 function deg2rad(deg) { return deg * 2 * Math.PI / 360; }
 function rad2deg(rad) { return rad * 360 / (2 * Math.PI); }

 function fd(distance)
 {
     state.v = states.last().v.plus(heading_v.multiply(distance));
     states[states.length] = new State(state.v, state.pendown, state.pencolor, state.pensize);
     
     if (wrapOn)
     {
   var screen = new Vector(canvas.width, canvas.height);
      var nextV = state.v.translate(250).mod(screen).translate(-250);
      if (!nextV.equals(state.v))
      {
      	var p = nextV.minus(state.v.minus(states[states.length-2].v));
      	setPos(p.x, p.y);
      	states[states.length] = new State(nextV, state.pendown, state.pencolor, state.pensize);
   }
     }

//        if (states.size() % 100 == 0)
//        {
//          draw()
//        }
 }
 
 function bk(length) { fd(-length); }
 function lt(angleDegrees)
 {
     var radians = deg2rad(angleDegrees);
     heading_v = heading_v.rotate(radians);
 }
 function rt(angle) { lt(-angle); }

 function clean()
 {
     reset();
 }

 function home()
 {
     setPos(0, 0);
     setHeading(90);
 }
 
 // ===


var Vector = Class.create({
initialize: function(x, y) {
	this.x = x;
	this.y = y;
},
size: function() {
	return Math.sqrt(this.x*this.x, this.y*this.y);
},
      plus: function(v) {
          return new Vector(this.x+v.x, this.y+v.y);
      },
      minus: function(v) {
          return new Vector(this.x-v.x, this.y-v.y);
      },
      mod: function(v) {
          var newV = new Vector(this.x % v.x, this.y % v.y);
          if (newV.x < 0) newV.x += v.x;  // expect -3 % 10 to return 7, not -3
          if (newV.y < 0) newV.y += v.y;
          return newV;
      },
      multiply: function(k) { return new Vector(k*this.x, k*this.y); },
      rotate: function(angle) {
          return this.multiply(Math.cos(angle)).plus(this.perp().multiply(Math.sin(angle)));
      },
      perp: function() { return new Vector(-this.y, this.x); },
      translate: function(amt) { return new Vector(this.x+amt, this.y+amt); },
      toString: function() {
          return "("+this.x+","+this.y+")";
      },
      equals: function(o) {
          if (o==null) return false;
          return (Math.abs(this.x-o.x) < 0.000001) && (Math.abs(this.y-o.y) < 0.000001);
      }
});

  
 var State = Class.create({
 	initialize: function(v, pendown, pencolor, pensize) {
      this.v = new Vector(v.x, v.y);
      this.pendown = pendown;
      this.pencolor = pencolor;
      this.pensize = pensize;
 	}
 });
 State.new = function() {
 	return new State(new Vector(0,0), true, "#000000", 1);
 }
