/**
 * project: ...
 * author: thomas diewald
 * date:   13.02.12
 */

function DwInterpolationManager(cam, func_interpolate, func_finish) {
  this.cam              = cam;
  this.func_interpolate = func_interpolate;
  this.func_finish      = func_finish;

  this.animation_time = null;
  this.run_interpolation = false;

  this.value_start = null;
  this.value_end   = null;

  this.time_start = 0;
  this.time_now   = 0;
}

DwInterpolationManager.prototype.start = function(value_start, value_end, animation_time ) {
  this.run_interpolation = true;

  this.value_start = value_start;
  this.value_end   = value_end;

  this.animation_time = animation_time;
  this.time_start =  Date.now();
}


DwInterpolationManager.prototype.update = function() {
//  console.log("rotation_update: "+ this.run_interpolation);
  if( this.run_interpolation !== true)
    return;

//  this.time_now = Date.now(); //new Date().getTime();
  var fac = (Date.now()- this.time_start) / this.animation_time;
  if( fac > 1 ){ // animation time is over
    this.stop(this.value_end);
  } else {
    this.func_interpolate(this.cam, this.value_start, this.value_end, fac);
  }
}

DwInterpolationManager.prototype.stop = function(value_end) {

  this.run_interpolation = false;

  value_end = value_end || 0;
  if( value_end !== 0){
    this.func_finish(this.cam, value_end);
  }
}


