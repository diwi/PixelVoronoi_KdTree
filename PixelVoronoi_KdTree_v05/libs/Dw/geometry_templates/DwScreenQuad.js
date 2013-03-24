/**
 * project: ...
 * author: thomas diewald
 * date:   22.02.12
 */


function DwScreenQuad(gl, width, height){
  this.gl = gl;

  this.HANDLE_vbo = gl.createBuffer();

  this.resize( width, height);
}

DwScreenQuad.prototype.resize = function(width, height){
  var w = width;
  var h = height;
  var gl =  this.gl;
  this.vertex_data =
    [
      0, 0, 0,   0, 0,
      0, h, 0,   0, 1,
      w, 0, 0,   1, 0,
      w, h, 0,   1, 1
    ];

  this.data_Float32 = new Float32Array(this.vertex_data);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
  gl.bufferData(gl.ARRAY_BUFFER, this.data_Float32, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  this.Mat4_Projection = DwMat4.ortho_new(0, w, 0, h, -100, 100);
}

DwScreenQuad.prototype.delete = function(){
  this.gl.deleteBuffer(this.HANDLE_vbo);
  this.HANDLE_vbo = null;
  this.vertex_data = null;
  this.vertex_data = [];
}



DwScreenQuad.prototype.draw = function(shader){
  var gl = this.gl;

  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);

  gl.vertexAttribPointer(shader.IN_VEC3_POSITION, 3, gl.FLOAT, false, 20,  0 );
  gl.vertexAttribPointer(shader.IN_VEC2_ST,       2, gl.FLOAT, false, 20, 12 );

  gl.enableVertexAttribArray(shader.IN_VEC3_POSITION );
  gl.enableVertexAttribArray(shader.IN_VEC2_ST );

  this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4 );
  this.gl.flush();
}
