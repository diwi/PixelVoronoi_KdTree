/**
 * project: ...
 * author: thomas diewald
 * date:   08.02.12
 */


function DwRectangleShader(gl){
  this.gl = gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/DwRectangle_vert.glsl", "SHADERS/DwRectangle_frag.glsl");
  _this.shader.onload = function(){
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}


DwRectangleShader.prototype.saveShaderLocations = function(){
  var gl = this.gl;
  gl.useProgram(this.shader.HANDLE_program);
  {
    this.IN_VEC3_POSITION   = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_POSITION");
    this.IN_VEC3_NORMAL     = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_NORMAL");
    this.IN_VEC3_COLOR      = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_COLOR");
    this.IN_VEC2_ST         = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC2_ST");

    this.UN_MAT4_PROJECTION = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_PROJECTION");
    this.UN_MAT4_MODELVIEW  = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_MODELVIEW");

    this.UN_SAMP_TEXTURE    = gl.getUniformLocation(this.shader.HANDLE_program, "UN_SAMP_TEXTURE");
  }
  gl.useProgram(null);
  //  console.log("attribute location: IN_VEC3_POSITION   = "+this.IN_VEC3_POSITION);
  //  console.log("attribute location: IN_VEC3_NORMAL     = "+this.IN_VEC3_NORMAL);
  //  console.log("attribute location: IN_VEC3_COLOR      = "+this.IN_VEC3_COLOR);
  //  console.log("attribute location: IN_VEC2_ST         = "+this.IN_VEC2_ST);
  //  console.log("uniform   location: UN_MAT4_PROJECTION = "+this.UN_MAT4_PROJECTION);
  //  console.log("uniform   location: UN_MAT4_MODELVIEW  = "+this.UN_MAT4_MODELVIEW);
//  console.log("uniform   location: UN_SAMP_TEXTURE    = "+this.UN_SAMP_TEXTURE);
}
DwRectangleShader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}


DwRectangleShader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

DwRectangleShader.prototype.setMat4_ModelView = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELVIEW, false, MAT4);
}
DwRectangleShader.prototype.activeTexture = function(tex_loc){
  this.gl.uniform1i(this.UN_SAMP_TEXTURE, tex_loc);
}

DwRectangleShader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

DwRectangleShader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
