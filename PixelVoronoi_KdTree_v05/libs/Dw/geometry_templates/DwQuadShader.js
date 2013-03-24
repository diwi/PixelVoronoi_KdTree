/**
 * project: ...
 * author: thomas diewald
 * date:   08.02.12
 */


function DwQuadShader(gl){
  this.gl = gl;
  this.shader = new DwShader(gl, "", "quad_vert.glsl", "quad_frag.glsl");

  this.gl.useProgram(this.shader.HANDLE_program);

    this.IN_VEC3_POSITION   = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_POSITION");
    this.IN_VEC2_TEXCOORDS  = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC2_TEXCOORDS");
    this.IN_VEC3_COLOR      = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_COLOR");

    this.UN_MAT4_PROJECTION = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_PROJECTION");
    this.UN_MAT4_MODELVIEW  = gl.getUniformLocation(this.shader.HANDLE_program, "UN_MAT4_MODELVIEW");
  this.gl.useProgram(null);

  console.log("attribute location: IN_VEC3_POSITION    = "+this.IN_VEC3_POSITION);
  console.log("attribute location: IN_VEC2_TEXCOORDS   = "+this.IN_VEC2_TEXCOORDS);
  console.log("attribute location: IN_VEC3_COLOR       = "+this.IN_VEC3_COLOR);
  console.log("uniform   location: UN_MAT4_PROJECTION  = "+this.UN_MAT4_PROJECTION);
  console.log("uniform   location: UN_MAT4_MODELVIEW   = "+this.UN_MAT4_MODELVIEW);

}
DwQuadShader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}

DwQuadShader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

DwQuadShader.prototype.setMat4_ModelView = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELVIEW, false, MAT4);
}


DwQuadShader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

DwQuadShader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
