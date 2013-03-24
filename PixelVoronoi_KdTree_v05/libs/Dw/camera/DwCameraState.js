/**
 * project: ...
 * author: thomas diewald
 * date:   13.02.12
 */



function DwCameraState(rotation_quat4, center_vec3, distance_float) {
  this.rotation = rotation_quat4;
  this.center   = center_vec3;
  this.distance = distance_float;
}

DwCameraState.prototype.getCopy = function(){
  return new DwCameraState(DwQuat.copy_new(this.rotation), DwVec3.copy_new(this.center), this.distance);
}
DwCameraState.prototype.compareRotation = function(state){
  return (  state.rotation[0] === this.rotation[0]
         && state.rotation[1] === this.rotation[1]
         && state.rotation[2] === this.rotation[2]
         && state.rotation[3] === this.rotation[3]);
}
DwCameraState.prototype.compareCenter = function(state){
  return (  state.center[0] === this.center[0]
         && state.center[1] === this.center[1]
         && state.center[2] === this.center[2]);
}
DwCameraState.prototype.compareDistance = function(state){
  return  state.distance == this.distance;
}
DwCameraState.prototype.print = function(){
  console.log("------ CAMERA STATE ------");
  console.log("rotation = "+ this.rotation);
  console.log("center   = "+ this.center);
  console.log("distance = "+ this.distance);
}
