/**
 * project: ...
 * author: thomas diewald
 * date:   07.02.12
 */






function DwKeyInfo(dw_context)
{
  this.context = dw_context;
  this.canvas = this.context.canvas;

  // states
  this.keypressed = false;
  this.keyreleased = false;

  this.keycode = ' ';
  this.key = ' ';
  this.keychar = ' ';
  this.ctrl  = false;
  this.alt   = false;
  this.shift = false;

  this.activate();

}


DwKeyInfo.prototype.activate = function (){
  DwKeyInfo.attachToDocument(this.canvas, this);
}


DwKeyInfo.prototype.keyPressed = function (event) {
  this.keypressed = true;
  this.keyreleased = false;
  this.getEventVal(event);
}


DwKeyInfo.prototype.keyReleased = function (event) {
  this.keypressed  = false;
  this.keyreleased = true;
  this.getEventVal(event);
//  console.log("____KEY="+this.keychar+", "+event.keyCode+", "+event.which);
}


DwKeyInfo.prototype.getEventVal = function (event){
  this.keycode = event.keyCode;
  this.key     = event.which;
  this.keychar = String.fromCharCode(this.key);
  this.ctrl    = event.ctrlKey;
  this.alt     = event.altKey;
  this.shift   = event.shiftKey;
}

DwKeyInfo.prototype.updateBegin = function (){

}
DwKeyInfo.prototype.updateEnd = function (){
  this.keyreleased = false;
}


/**
 * attachToDocument();
 * static method
 * @param mouse_info an instance of the class MouseInfo
 */
DwKeyInfo.attachToDocument = function(canvas, key_info){

//  document.onkeypress = function(event){
//    key_info.keyPressed(event);
//  };
  document.onkeydown= function(event){
    key_info.keyPressed(event);
  };

  document.onkeyup = function(event){
    key_info.keyReleased(event);
  };
};
