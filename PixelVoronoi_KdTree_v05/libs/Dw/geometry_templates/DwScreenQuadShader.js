/**
 * project: ...
 * author: thomas diewald
 * date:   22.02.12
 */



function DwScreenQuadShader(gl){
  this.gl = gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/DwScreenQuad_vert.glsl", "SHADERS/DwScreenQuad_frag.glsl");
//  console.log("DwScreenQuadShader ");
  _this.shader.onload = function(){
//    console.log("DwScreenQuadShader loading shader");
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}


DwScreenQuadShader.prototype.saveShaderLocations = function(){
  var gl = this.gl;
  gl.useProgram(this.shader.HANDLE_program);
  {
    this.IN_VEC3_POSITION   = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_POSITION");
    this.IN_VEC2_ST         = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC2_ST");

    this.UN_MAT4_PROJECTION = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_PROJECTION");
    this.UN_SAMP_TEXTURE    = gl.getUniformLocation(this.shader.HANDLE_program, "UN_SAMP_TEXTURE");
  }
  gl.useProgram(null);
  console.log("attribute location: IN_VEC3_POSITION   = "+this.IN_VEC3_POSITION);
  console.log("attribute location: IN_VEC2_ST         = "+this.IN_VEC2_ST);
  console.log("uniform   location: UN_MAT4_PROJECTION = "+this.UN_MAT4_PROJECTION);
  console.log("uniform   location: UN_SAMP_TEXTURE    = "+this.UN_SAMP_TEXTURE);
}

DwScreenQuadShader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}

DwScreenQuadShader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

DwScreenQuadShader.prototype.setMat4_ModelView = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELVIEW, false, MAT4);
}
DwScreenQuadShader.prototype.activeTexture = function(tex_loc){
  this.gl.uniform1i(this.UN_SAMP_TEXTURE, tex_loc);
}

DwScreenQuadShader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

DwScreenQuadShader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
