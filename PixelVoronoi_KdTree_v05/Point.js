/**
 * author: thomas diewald
 * date:   15.03.13
 *
 * simple point class. (position, direction)
 */


function Point(CTX, idx, x, y, dx, dy){
  this.CTX = CTX;
  this.idx = idx;
  this.x   = x  ;
  this.y   = y  ;
  this.dx  = dx ;
  this.dy  = dy ;
}

Point.prototype.update = function(){
  var mouse = this.CTX.mouse_info;

  var mx = mouse.mouseX;
  var my = mouse.mouseY;
  var px = this.x;
  var py = this.y;
  var dx = this.dx;
  var dy = this.dy;

  var dxm = mx-px;
  var dym = my-py;

  var d_sq = (dxm*dxm)+(dym*dym);
//  var d = (Math.sqrt(d_sq));
//  var damp = 50.0/(Math.sqrt(d*d*d));
  var damp = -250.0/(d_sq);
  px += dxm * damp;
  py += dym * damp;

  px += dx*0.5;
  py += dy*0.3;

  var viewp = this.CTX.VIEWPORT;
  if( px < 0 || px > viewp.width ||
      py < 0 || py > viewp.height )
  {
    px = viewp.width *0.5 + dx*50;
    py = viewp.height*0.5 + dy*50;
  }

  this.x = px;
  this.y = py;
}



