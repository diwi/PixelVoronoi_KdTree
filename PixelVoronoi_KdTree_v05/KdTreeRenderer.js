/**
 * author: thomas diewald
 * date:   23.03.13
 *
 * create a visual representation of a kd-tree.
 */



function KdTreeRenderer(CTX, kd_tree){
  this.CTX = CTX;
  this.kd_tree = kd_tree;

  var gl = this.CTX.gl;

  this.HANDLE_vbo = gl.createBuffer();

  this.shader;

  this.loadShader();
}

KdTreeRenderer.prototype.delete = function(){
  var gl = this.CTX.gl;
  gl.deleteBuffer(this.HANDLE_vbo);
  this.HANDLE_vbo = null;

  this.shader.delete();
  this.shader = null;
}



KdTreeRenderer.prototype.loadShader = function(){
  var gl = this.CTX.gl;
  var _this = this;

  var vert_shader = "SHADERS/KdTree_vert.glsl";
  var frag_shader = "SHADERS/KdTree_frag.glsl";

  _this.shader = new DwShader(gl, "", vert_shader, frag_shader);
  _this.shader.onload = function(){
//    console.log("... LOADING SHADER");
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}

KdTreeRenderer.prototype.saveShaderLocations = function(){
  var gl = this.CTX.gl;

  var HANDLE_shader = this.shader.HANDLE_program;
//  console.log("... SAVE SHADER LOCATIONS "+HANDLE_shader);
  gl.useProgram(this.HANDLE_shader);
  {
    this.IN_VEC2_POSITION   = gl.getAttribLocation (HANDLE_shader, "IN_VEC2_POSITION"   );
    this.IN_FLOAT_ALPHA     = gl.getAttribLocation (HANDLE_shader, "IN_FLOAT_ALPHA"     );
    this.UN_VEC3_RGB        = gl.getUniformLocation(HANDLE_shader, "UN_VEC3_RGB"        );
    this.UN_MAT4_PROJECTION = gl.getUniformLocation(HANDLE_shader, "UN_MAT4_PROJECTION" );
  }
  gl.useProgram(null);

//  console.log("IN_VEC2_POSITION   = "+this.IN_VEC2_POSITION   );
//  console.log("IN_FLOAT_ALPHA     = "+this.IN_FLOAT_ALPHA     );
//  console.log("UN_VEC3_RGB        = "+this.UN_VEC3_RGB        );
//  console.log("UN_MAT4_PROJECTION = "+this.UN_MAT4_PROJECTION );
}

KdTreeRenderer.prototype.resize = function(){
  var w = this.CTX.VIEWPORT.width;
  var h = this.CTX.VIEWPORT.height;
  this.Mat4_Projection = DwMat4.ortho_new(0, w, h, 0, -1, 1);
}




KdTreeRenderer.prototype.render = function(invert){

  if( this.IN_VEC2_POSITION==undefined){
    return;
  }

  var gl         = this.CTX.gl;
  var shader     = this.shader;
  var coords     = this.kd_tree.kd_tree_planes;
  var num_coords = this.kd_tree.BUF_IDX;

  var rgb = [1,1,1];
  if( invert ) rgb = [.2,.2,.2];

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  gl.lineWidth(.5);
  gl.useProgram(shader.HANDLE_program);
  {

    gl.uniformMatrix4fv(this.UN_MAT4_PROJECTION, false, this.Mat4_Projection);
    gl.uniform3fv(this.UN_VEC3_RGB, new Float32Array(rgb) );

    gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(this.IN_VEC2_POSITION, 2, gl.FLOAT, false, 12,  0 );
    gl.vertexAttribPointer(this.IN_FLOAT_ALPHA,   1, gl.FLOAT, false, 12,  8 );

    gl.enableVertexAttribArray(this.IN_VEC2_POSITION );
    gl.enableVertexAttribArray(this.IN_FLOAT_ALPHA   );

    gl.drawArrays(gl.LINES, 0, 2*num_coords/6 );
    gl.flush();
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  gl.useProgram(null);
}
