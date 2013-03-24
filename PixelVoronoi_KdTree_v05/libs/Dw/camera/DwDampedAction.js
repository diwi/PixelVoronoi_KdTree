/**
 * project: ...
 * author: thomas diewald
 * date:   13.02.12
 */


function DwDampedAction (cam, behave){
  this.cam = cam;
  this.velocity = 0;
  this.damping = 0.85;
//  this.damping = 0;
  this.behave = behave;
}

DwDampedAction.prototype.impulse = function(impulse) {
  this.velocity += impulse;
}

DwDampedAction.prototype.update = function() {
  if (this.velocity == 0) {
    return;
  }
  this.behave(this.cam, this.velocity);
//  this.cam.feed();
  this.velocity *= this.damping;
  if (Math.abs(this.velocity) < .001) {
    this.velocity = 0;
  }
}


DwDampedAction.prototype.stop = function(){
  this.velocity = 0;
}


