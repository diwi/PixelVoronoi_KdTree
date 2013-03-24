/**
 * project: Dw WebGL ToolKit
 * author: thomas diewald
 * date:   13.02.12
 *
 * description: camera, code is based on Peasycam (processing library)
 *   http://mrfeinberg.com/peasycam/
 */



function DwCamera(CTX, lookAt, distance){
  this.ctx = CTX;
  this.mouse = this.ctx.mouse_info;
  this.key   = this.ctx.key_info;
  this.LOOK = [0, 0, 1];
  this.UP   = [0, 1, 0];


  this.minimumDistance = 1.001;
  this.maximumDistance = 1000000000;


  // update methods
  this.rotateX    = new DwDampedAction(this, this.behave_rx);
  this.rotateY    = new DwDampedAction(this, this.behave_ry);
  this.rotateZ    = new DwDampedAction(this, this.behave_rz);
  this.dampedZoom = new DwDampedAction(this, this.behave_zoom);
  this.dampedPanX = new DwDampedAction(this, this.behave_panx);
  this.dampedPanY = new DwDampedAction(this, this.behave_pany);

  this.rotationInterps = new DwInterpolationManager(this, this.interpolation_Rotation, this.interpolationFinish_Rotation );
  this.centerInterps   = new DwInterpolationManager(this, this.interpolation_Center,   this.interpolationFinish_Center   );
  this.distanceInterps = new DwInterpolationManager(this, this.interpolation_Distance, this.interpolationFinish_Distance );


  // parameters for the camera orientation
  this.distance = distance;    // double
  this.center   = lookAt;      // vec3
  this.rotation = DwQuat.identity_new();// quat4

  this.startDistance = distance;
  this.startCenter   = DwVec3.copy_new(lookAt);

  // constrain on Key-Shift
  this.ConstraintX = 0;
  this.ConstraintY = 1;
  this.dragConstraint = -1;

  // assign functionality to mouseButtons
  this.wheelHandler      = this.zoomWheelHandler;
  this.centerDragHandler = this.panHandler;
  this.leftDragHandler   = this.rotateHandler;
  this.rightDraghandler  = this.zoomHandler;
  this.resetOnDoubleClick = true;

  this.wheelScale = 1.0;

  // mouse can modify camera
  this.isActive = true;

  this.MATRIX_modelView  = DwMat4.identity_new();
  this.MATRIX_projection = DwMat4.perspective_new(45,  this.ctx.VIEWPORT.width / this.ctx.VIEWPORT.height, 25, 1500.0);
  this.feed();
};

DwCamera.prototype.setActive = function(active) {
  if (active == this.isActive) {
    return;
  }
  this.isActive = active;
//  if (this.isActive) {
//  } else {
//  }
};

DwCamera.prototype.update = function() {
  if( this.isActive !== true )
    return;

  var m = this.mouse;
  var k = this.key;

  if (this.resetOnDoubleClick && m.doubleclicked) {
    this.reset();
  }
//  else
//  if (m.mousereleased ) {
//    this.dragConstraint = -1;
//  }
  else
  if (m.mousepressed && k.keypressed) {
    var dx = m.mouseX - m.pmouseX;
    var dy = m.mouseY - m.pmouseY;
//    console.log("dx/dy = "+dx+", "+dy);
    dx /= 2; //TODO
    dy /= 2;//TODO
//    if (k.key == 67) {
//      if (this.dragConstraint === -1 && Math.abs(dx - dy) > 1) {
//        this.dragConstraint = Math.abs(dx) > Math.abs(dy) ? this.ConstraintX : this.Constraint.Y;
//      }
//    } else {
//      this.dragConstraint = -1;
//    }

    var button = m.button;

    if (button == m.lmb && k.shift) {
      this.centerDragHandler(dx, dy);
    }
    else if (button == m.lmb && k.alt) {
      this.leftDragHandler(dx, dy);
    }
    else if (button == m.lmb && k.ctrl) {
      this.rightDraghandler(dx, dy);
    }
  }

  // update damped rotations
  this.rotateX.update();
  this.rotateY.update();
  this.rotateZ.update();
  // update damped zoom
  this.dampedZoom.update();
  // update damped pan
  this.dampedPanX.update();
  this.dampedPanY.update();

  // update orientation (interpolated), only if its active
  this.rotationInterps.update();
  this.centerInterps  .update();
  this.distanceInterps.update();

  this.feed();
};



// BUILT THE FINAL MATRIX
DwCamera.prototype.feed = function() {
  this.newCameraMatrix(this.center, this.rotation, this.distance);
};
DwCamera.prototype.newCameraMatrix = function(center_v3, rotation_quat, distance) {
  var rup = DwQuat.multVec3_new(rotation_quat, this.UP);
  var pos = DwQuat.multVec3_new(rotation_quat, this.LOOK);
  DwVec3.scale_ref_slf(pos, distance);
  DwVec3.add_ref(pos, center_v3, pos);
  DwMat4.lookAt_ref(pos, center_v3, rup,  this.MATRIX_modelView);
};



// GET FINAL MODELVIEW MATRIX
DwCamera.prototype.getMat_ModelView_cpy = function(){
  return DwMat4.copy_new(this.MATRIX_modelView);
};
// GET FINAL MATRIX
DwCamera.prototype.getMat_ModelView_ref = function(){
  return this.MATRIX_modelView;
};
// GET FINAL PROJECTION MATRIX
DwCamera.prototype.getMat_Projection_cpy = function(){
  return DwMat4.copy_new(this.MATRIX_projection);
};
// GET FINAL MATRIX
DwCamera.prototype.getMat_Projection_ref = function(){
  return this.MATRIX_projection;
};


// ZOOM - PAN - ROTATION
DwCamera.prototype.mouseZoom = function(delta) {
  this.safeSetDistance(this.distance + delta * Math.log(this.distance));
};
DwCamera.prototype.mousePan = function(dxMouse, dyMouse) {
  var panScale = Math.sqrt(this.distance * .005);
  this.pan(  this.dragConstraint === this.ConstraintY ? 0 : -dxMouse * panScale,
             this.dragConstraint === this.ConstraintX ? 0 :  dyMouse * panScale); //TODO changed -dyMouse to dyMouse
};
DwCamera.prototype.mouseRotate = function(dx, dy) {
//  console.log("DwCameraArcBall.prototype.mouseRotate: cam.rotation = "+this.rotation);
  var u = DwVec3.scale_new(this.LOOK, 100 + .6 * this.startDistance);
  DwVec3.negate_ref_slf(u);

  var width  = this.ctx.VIEWPORT.width;  //TODO
  var height = this.ctx.VIEWPORT.height; //TODO

  var m = this.mouse;

  if (this.dragConstraint != this.ConstraintX ) {
    var rho = Math.abs((width *0.5) - m.mouseX) / (width *0.5);
    var adz = Math.abs(dy) * rho;
    var ady = Math.abs(dy) * (1 - rho);
    var ySign = dy < 0 ? -1 : 1;
    var vy = DwVec3.add_new(u, [0, ady, 0]);
    var vz = DwVec3.add_new(u, [0, adz, 0]);

    this.rotateX.impulse(DwVec3.angleBetween(u,vy) *  ySign);
    this.rotateZ.impulse(DwVec3.angleBetween(u,vz) * -ySign * ( m.mouseX < width*0.5 ? -1 : 1));
  }

  if (this.dragConstraint != this.ConstraintY ) {
    var eccentricity = Math.abs((height*0.5) - m.mouseY)/ (height*0.5);
    var xSign = dx > 0 ? -1 : 1;
    var adz = Math.abs(dx) * eccentricity;
    var adx = Math.abs(dx) * (1 - eccentricity);
    var vx = DwVec3.add_new(u, [adx, 0, 0]);
    var vz = DwVec3.add_new(u, [0, adz, 0]);
    this.rotateY.impulse(DwVec3.angleBetween(u,vx) * -xSign); //TODO changed -xSign to xSign
    this.rotateZ.impulse(DwVec3.angleBetween(u,vz) *  xSign* (m.mouseY > height*0.5 ? -1 : 1));
  }
};



// DISTANCE
DwCamera.prototype.safeSetDistance = function(distance) {
  this.distance = Math.min(this.maximumDistance, Math.max(this.minimumDistance, distance));
  this.feed();
};
DwCamera.prototype.setMinimumDistance = function(minimumDistance) {
  if(minimumDistance <= 1  )
    minimumDistance = 1.001;
  this.minimumDistance = minimumDistance;
  this.safeSetDistance(this.distance);
};
DwCamera.prototype.setMaximumDistance = function(maximumDistance) {
  this.maximumDistance = maximumDistance;
  this.safeSetDistance(this.distance);
};
DwCamera.prototype.getDistance = function() {
  return this.distance;
};
DwCamera.prototype.setDistance = function(newDistance, animationTimeMillis) {
  animationTimeMillis = animationTimeMillis || 300;
  this.distanceInterps.start(this.distance, newDistance, animationTimeMillis);
};


  // CENTER
DwCamera.prototype.getLookAt = function() {
  return DwVec3.copy_new(this.center);
};
DwCamera.prototype.lookAt_xyz = function(xyz, animationTimeMillis) {
  animationTimeMillis = animationTimeMillis || 300;
  this.centerInterps.start(this.center, xyz, animationTimeMillis);
};
DwCamera.prototype.lookAt_xyzd = function(xyz, distance, animationTimeMillis) {
  animationTimeMillis = animationTimeMillis || 300;
  this.lookAt_xyz(xyz, animationTimeMillis);
  this.setDistance(distance, animationTimeMillis);
};


// EYE
DwCamera.prototype.getPosition = function() {
  var pos = DwQuat.multVec3_new(this.rotation, this.LOOK);
  DwVec3.scale_ref_slf(pos, this.distance);
  DwVec3.add_ref(pos, this.center, pos);
  return pos;
};


// RESET
DwCamera.prototype.reset = function(animationTimeMillis) {
  animationTimeMillis = animationTimeMillis || 300;
  var state = new DwCameraState( DwQuat.identity_new(), this.startCenter, this.startDistance);
  this.setState(state, animationTimeMillis);
};

// RESET ON DOUBLECLICK
DwCamera.prototype.setResetOnDoubleClick = function(resetOnDoubleClick) {
  this.resetOnDoubleClick = resetOnDoubleClick;
};



// APPLY ROTATIONS
// for extern calls
DwCamera.prototype.apply_rotateX = function(angle) {
  var q4 = DwQuat.fromVec3([1, 0, 0], angle);
  DwQuat.mult_ref(this.rotation, q4, this.rotation);
  this.feed();
};
DwCamera.prototype.apply_rotateY = function(angle) {
  var q4 = DwQuat.fromVec3([0, 1, 0], angle);
  DwQuat.mult_ref(this.rotation, q4, this.rotation);
  this.feed();
};

DwCamera.prototype.apply_rotateZ = function(angle) {
  var q4 = DwQuat.fromVec3([0, 0, 1], angle);
  DwQuat.mult_ref(this.rotation, q4, this.rotation);
  this.feed();
};



DwCamera.prototype.setRotations = function(pitch, yaw, roll) {
  this.rotationInterps.stop();
  DwQuat.fromEuler_ref(DwRotationOrder.XYZ, pitch, yaw, roll, this.rotation);
  this.feed();
};
DwCamera.prototype.getRotations = function() {
//  try {
  return DwQuat.getEulerAngles(DwRotationOrder.XYZ, this.rotation); // returns[pitch, yaw, roll];
//  } catch (e) {
//  }
//  try {
//    var angles = rotation.getAngles(RotationOrder.YXZ);
//    return angles;
//  } catch (e) {
//  }
//  try {
//    var angles = rotation.getAngles(RotationOrder.ZXY);
//    return angles;
//  } catch (e) {
//  }
//  return [0, 0, 0];
};














DwCamera.prototype.pan = function(dx, dy) {
  var v3_rot = DwQuat.multVec3_new(this.rotation, [dx, dy, 0]);
  DwVec3.add_ref(this.center, v3_rot , this.center);
};



DwCamera.prototype.panHandler = function(dx, dy) {
  this.dampedPanX.impulse(dx / 8.0);
  this.dampedPanY.impulse(dy / 8.0);
};
DwCamera.prototype.rotateHandler = function(dx, dy) {
  this.mouseRotate(dx, dy);
};

DwCamera.prototype.zoomHandler = function(dx, dy) {
  this.dampedZoom.impulse(dy / 10.0);
};

DwCamera.prototype.zoomWheelHandler = function(delta) {
  this.dampedZoom.impulse(this.wheelScale * delta);
};







// callbacks for DampedAction
DwCamera.prototype.behave_rx = function(cam, velocity){
  DwQuat.mult_ref(cam.rotation,   DwQuat.fromVec3([1, 0, 0], velocity),  cam.rotation);
};
DwCamera.prototype.behave_ry = function(cam, velocity){
  DwQuat.mult_ref(cam.rotation,   DwQuat.fromVec3([0, 1, 0], velocity),  cam.rotation);
};
DwCamera.prototype.behave_rz = function(cam, velocity){
  DwQuat.mult_ref(cam.rotation,   DwQuat.fromVec3([0, 0, 1], velocity),  cam.rotation);
};

DwCamera.prototype.behave_zoom = function(cam, velocity){
  cam.mouseZoom(velocity);
};
DwCamera.prototype.behave_panx = function(cam, velocity){
  cam.mousePan(velocity, 0);
};
DwCamera.prototype.behave_pany = function(cam, velocity){
  cam.mousePan(0, velocity);
};



// STATE
DwCamera.prototype.getState = function() {
  return new DwCameraState(this.rotation, this.center, this.distance).getCopy();
};
DwCamera.prototype.setState = function(state, animationTimeMillis) {
  state = state || null;
  if( state == null )
    return;

  state = state.getCopy(); // in case the original state would get changed
  animationTimeMillis = animationTimeMillis || 300;
  if (animationTimeMillis > 0) {
    // stop current rotations
    this.rotateX.stop();
    this.rotateY.stop();
    this.rotateZ.stop();

    // check if given state is different to current state
    var current_state = this.getState();
    var new_distance  = !state.compareDistance(current_state);
    var new_center    = !state.compareCenter  (current_state);
    var new_rotation  = !state.compareRotation(current_state);

    // start interpolated transformations
    if( new_rotation ) this.rotationInterps.start(this.rotation, state.rotation, animationTimeMillis );
    if( new_center )   this.centerInterps  .start(this.center  , state.center  , animationTimeMillis );
    if( new_distance ) this.distanceInterps.start(this.distance, state.distance, animationTimeMillis );
  } else {
    this.rotation = state.rotation;
    this.center   = state.center;
    this.distance = state.distance;
  }
  this.feed();
};


// callbacks for interpolation (state change)
DwCamera.prototype.interpolation_Rotation = function(cam, value_start, value_end, fac){
  cam.rotation = DwQuat.slerp_new(value_start, value_end, fac);
};
DwCamera.prototype.interpolationFinish_Rotation = function(cam, value_end){
  cam.rotation = value_end;
};


DwCamera.prototype.interpolation_Center = function(cam, value_start, value_end, fac){
  cam.center = smooth_Vec3(value_start, value_end, fac);
};
DwCamera.prototype.interpolationFinish_Center = function(cam, value_end){
  cam.center = value_end;
};


DwCamera.prototype.interpolation_Distance = function(cam, value_start, value_end, fac){
  cam.distance = smooth_float(value_start, value_end, fac);
};
DwCamera.prototype.interpolationFinish_Distance = function(cam, value_end){
  cam.distance = value_end;
};


function smooth_float(a, b, t) {
  var smooth = (t*t * (3 - 2*t));
  return (b*smooth) + (a*(1 - smooth));
};


function smooth_Vec3(a_v3, b_v3, t) {
  return [ smooth_float(a_v3[0], b_v3[0], t),
           smooth_float(a_v3[1], b_v3[1], t),
           smooth_float(a_v3[2], b_v3[2], t)];
};

