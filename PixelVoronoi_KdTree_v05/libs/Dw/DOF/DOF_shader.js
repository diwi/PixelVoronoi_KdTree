/**
 * project: ...
 * author: thomas diewald
 * date:   23.02.12
 */


function DOF_shader(gl){
  this.gl = gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/SH_DOF_vert.glsl", "SHADERS/SH_DOF_frag.glsl");
  _this.shader.onload = function(){
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}


DOF_shader.prototype.saveShaderLocations = function(){
  var gl = this.gl;
  gl.useProgram(this.shader.HANDLE_program);
  {
    this.IN_VEC3_POSITION    = gl.getAttribLocation (this.shader.HANDLE_program,  "IN_VEC3_POSITION"    );
    this.IN_VEC2_ST          = gl.getAttribLocation (this.shader.HANDLE_program,  "IN_VEC2_ST"          );
    this.UN_MAT4_PROJECTION  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_MAT4_PROJECTION"  );

    this.UN_SAMP2D_RENDERING = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_SAMP2D_RENDERING" );
    this.UN_SAMP2D_NORMAL_Z  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_SAMP2D_NORMAL_Z"  );

    this.UN_FLOAT_CAM_FAR      = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_FLOAT_CAM_FAR" );
    this.UN_FLOAT_CAM_NEAR     = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_FLOAT_CAM_NEAR" );
    this.UN_FLOAT_DOF_DISTANCE = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_FLOAT_DOF_DISTANCE" );
    this.UN_FLOAT_DOF_STRENGTH = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_FLOAT_DOF_STRENGTH" );
    this.UN_VEC2_VIEWPORT_SIZE = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_VEC2_VIEWPORT_SIZE" );

  }
  gl.useProgram(null);
//  console.log("attribute location: IN_VEC3_POSITION          = "+this.IN_VEC3_POSITION);
//  console.log("attribute location: IN_VEC2_ST                = "+this.IN_VEC2_ST);
//  console.log("uniform   location: UN_MAT4_PROJECTION        = "+this.UN_MAT4_PROJECTION);
//
//  console.log("uniform   location: UN_SAMP2D_RENDERING       = "+this.UN_SAMP2D_RENDERING);
//  console.log("uniform   location: UN_SAMP2D_NORMAL_Z        = "+this.UN_SAMP2D_NORMAL_Z);
//
//  console.log("uniform   location: UN_FLOAT_CAM_FAR          = "+this.UN_FLOAT_CAM_FAR     );
//  console.log("uniform   location: UN_FLOAT_CAM_NEAR         = "+this.UN_FLOAT_CAM_NEAR    );
//  console.log("uniform   location: UN_FLOAT_DOF_DISTANCE     = "+this.UN_FLOAT_DOF_DISTANCE);
//  console.log("uniform   location: UN_FLOAT_DOF_STRENGTH     = "+this.UN_FLOAT_DOF_STRENGTH);
//  console.log("uniform   location: UN_VEC2_VIEWPORT_SIZE     = "+this.UN_VEC2_VIEWPORT_SIZE);
}

DOF_shader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}

DOF_shader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

DOF_shader.prototype.activeTexture = function(handle, tex_loc){
  this.gl.uniform1i(handle, tex_loc);
}
DOF_shader.prototype.setCamNearFar = function(NEAR, FAR){
  this.gl.uniform1f( this.UN_FLOAT_CAM_NEAR, NEAR);
  this.gl.uniform1f( this.UN_FLOAT_CAM_FAR, FAR);
}
DOF_shader.prototype.setDOF = function(DOF_DIS, STRENGTH){
  this.gl.uniform1f( this.UN_FLOAT_DOF_DISTANCE, DOF_DIS);
  this.gl.uniform1f( this.UN_FLOAT_DOF_STRENGTH, STRENGTH);
}
DOF_shader.prototype.setViewportSize = function(WIDTH, HEIGHT){
  this.gl.uniform2fv( this.UN_VEC2_VIEWPORT_SIZE, [WIDTH,HEIGHT ]);
}
DOF_shader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

DOF_shader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
