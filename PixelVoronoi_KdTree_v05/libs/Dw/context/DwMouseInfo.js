/**
 * project: ...
 * author: thomas diewald
 * date:   06.02.12
 */


function DwMouseInfo(dw_context){
  this.context = dw_context;

  this.canvas   = this.context.canvas;
  this.VIEWPORT = this.context.VIEWPORT;

  // states
  this.mousepressed = false;
  this.mousereleased = false;
  this.mousemooved = false;
  this.doubleclicked = false;

  // mouse button
  this.button = -1;
  this.lmb = 0;
  this.mmb = 1;
  this.rmb = 2;

  // current mouse position, on whole document
  this.documentmouseX = 0;
  this.documentmouseY = 0;

  // current mouse position - relative to canvase
  this.mouseX = 0;
  this.mouseY = 0;

  // previous mouse position - relative to canvase
  this.pmouseX = 0;
  this.pmouseY = 0;

  this.last_time_clicked = 0;

  this.activate();
}


DwMouseInfo.prototype.activate = function(){
  DwMouseInfo.attachToDocument(this.canvas, this);
}


DwMouseInfo.prototype.handleMousePressed = function (event) {
  this.mousepressed = true;
  this.mousereleased = false;
  this.button = event.button;
}


DwMouseInfo.prototype.handleMouseReleased = function (event) {
  var time = Date.now();
  var time_diff = time - this.last_time_clicked;
  this.last_time_clicked = time;

  if( time_diff < 300 )
    this.doubleclicked = true;

  this.mousepressed = false;
  this.mousereleased = true;
}


DwMouseInfo.prototype.handleMouseMoved = function (event) {
  this.documentmouseX = event.clientX + document.body.scrollLeft;
  this.documentmouseY = event.clientY + document.body.scrollTop;

  this.mouseX = this.documentmouseX - this.VIEWPORT.off_x;
  this.mouseY = this.documentmouseY - this.VIEWPORT.off_y;

  this.mousemooved = true;
}

DwMouseInfo.prototype.updateBegin = function (){

}
DwMouseInfo.prototype.updateEnd = function (){
  this.pmouseX = this.mouseX
  this.pmouseY = this.mouseY;

  this.mousereleased = false;
  this.doubleclicked = false;
  this.mousemooved   = false;
}


DwMouseInfo.prototype.insideCanvas = function (){
  var x_min = this.VIEWPORT.off_x;
  var y_min = this.VIEWPORT.off_y;
  var x_max = x_min + this.VIEWPORT.width;
  var y_max = y_min + this.VIEWPORT.height;
//  console.log(x_min+", "+y_min+", "+x_max+", "+y_max);
  var mx = this.documentmouseX;
  var my = this.documentmouseY;
  return (
    mx >= x_min &&
    mx <= x_max &&
    my >= y_min &&
    my <= y_max
   );
}




/**
 * attachToDocument();
 * static method
 * @param mouse_info an instance of the class MouseInfo
 */
DwMouseInfo.attachToDocument = function(canvas, mouse_info){

  document.onmousemove = function(event){
    mouse_info.handleMouseMoved(event);
  };

  document.onmouseup = function(event){
    mouse_info.handleMouseReleased(event);
  };

  document.onmousedown = function(event){
    mouse_info.handleMousePressed(event);
  };

//  canvas.onmousedown = function(event){
//     mouse_info.handleMousePressed(event);
//  };
};


























/*
var mousepressed = false;
var mousereleased = false;

var canvasmouseX = 0;
var canvasmouseY = 0;

var mouseX = 0;
var mouseY = 0;

var pmouseX = 0;
var pmouseY = 0;




function handleMousePressed(event) {
  mousepressed = true;
  mousereleased = false;
  pmouseX = event.clientX;
  pmouseY = event.clientY;
}


function handleMouseReleased(event) {
  mousepressed = false;
  mousereleased = true;
}

var current_canvas = null;


function initMouse(canvas){
  current_canvas = canvas;
  current_canvas.onmousedown = handleMousePressed;
  document.onmouseup = handleMouseReleased;
  document.onmousemove = handleMouseMoved;

}

function handleMouseMoved(event) {
  canvasmouseX = event.clientX + document.body.scrollLeft;
  canvasmouseY = event.clientY + document.body.scrollTop;

  mouseX = canvasmouseX - current_canvas.offsetLeft;
  mouseY = canvasmouseY - current_canvas.offsetTop;


  var dx = mouseY - pmouseX
  var dy = mouseY - pmouseY;

  pmouseX = mouseX
  pmouseY = mouseX;
}

function insideCanvas(){
  var x_min = current_canvas.offsetLeft;
  var y_min = current_canvas.offsetTop;
  var x_max = x_min + current_canvas.width;
  var y_max = y_min + current_canvas.height;
  return (
    mouseX >= x_min &&
    mouseX <= x_max &&
    mouseY >= y_min &&
    mouseY <= y_max
    );
}
*/
