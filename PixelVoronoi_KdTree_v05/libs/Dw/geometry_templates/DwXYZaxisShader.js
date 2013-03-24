/**
 * project: ...
 * author: thomas diewald
 * date:   08.02.12
 */


function DwXYZaxisShader(gl){
  this.gl = gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/XYZaxis_vert.glsl", "SHADERS/XYZaxis_frag.glsl");
  _this.shader.onload = function(){
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}

DwXYZaxisShader.prototype.saveShaderLocations = function(){
  var gl = this.gl;
  gl.useProgram(this.shader.HANDLE_program);
  {
    this.IN_VEC3_POSITION   = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_POSITION");
    this.IN_VEC3_COLOR      = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_COLOR");
    this.UN_MAT4_PROJECTION = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_PROJECTION");
    this.UN_MAT4_MODELVIEW  = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_MODELVIEW");
  }
  gl.useProgram(null);
//    console.log("attribute location: IN_VEC3_POSITION   = "+this.IN_VEC3_POSITION);
//    console.log("attribute location: IN_VEC3_COLOR      = "+this.IN_VEC3_COLOR);
//    console.log("uniform   location: UN_MAT4_PROJECTION = "+this.UN_MAT4_PROJECTION);
//    console.log("uniform   location: UN_MAT4_MODELVIEW  = "+this.UN_MAT4_MODELVIEW);
}
DwXYZaxisShader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}

DwXYZaxisShader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

DwXYZaxisShader.prototype.setMat4_ModelView = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELVIEW, false, MAT4);
}

DwXYZaxisShader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

DwXYZaxisShader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
