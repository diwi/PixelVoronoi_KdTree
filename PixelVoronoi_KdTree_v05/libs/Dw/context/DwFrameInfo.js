/**
 * project: ...
 * author: thomas diewald
 * date:   06.02.12
 */

function DwFrameInfo(dw_context){
  this.context = dw_context;

  this.framerate = null;
  this.framecount = null;
  this.time_last = 1;
  this.time_now = 1;
  this.date = new Date();
}

DwFrameInfo.prototype.update = function (){
  this.date = new Date();
  this.framecount++;
  this.time_last = this.time_now;
  this.time_now =  Date.now(); //new Date().getTime();
  var  time_dif = (this.time_now - this.time_last);
  if( time_dif == 0){
    time_dif = 1;
  }
  this.framerate = (this.framerate * .9) + 100.0 / time_dif;
}
