/**
 * project: ...
 * author: thomas diewald
 * date:   07.02.12
 */



function DwXYZaxis(gl, size){
  this.gl = gl;
  var s = size;

  this.vertex_data =
    [
      // vertex 0
      0.0, 0.0, 0.0, // x-axis - start
      1.0, 0.0, 0.0, // x-axis - start - color

      // vertex 1
        s, 0.0, 0.0, // x-axis - end
      1.0, 0.0, 0.0, // x-axis - end - color

      // vertex 2
      0.0, 0.0, 0.0, // y-axis - start
      0.0, 1.0, 0.0, // y-axis - start - color

      // vertex 3
      0.0,   s, 0.0, // y-axis - end
      0.0, 1.0, 0.0, // y-axis - end - color

      // vertex 4
      0.0, 0.0, 0.0, // z-axis - start
      0.0, 0.0, 1.0, // z-axis - start - color

      // vertex 5
      0.0, 0.0,   s, // z-axis - end
      0.0, 0.0, 1.0  // z-axis - end - color
    ];

  this.data_Float32 = new Float32Array(this.vertex_data);

  this.HANDLE_vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
  gl.bufferData(gl.ARRAY_BUFFER, this.data_Float32, gl.STATIC_DRAW);
}
DwXYZaxis.prototype.delete = function(){
  this.gl.deleteBuffer(this.HANDLE_vbo);
  this.HANDLE_vbo = null;
  this.data_Float32 = null;
  this.vertex_data = [];
}


DwXYZaxis.prototype.draw = function(shader){
  var gl = this.gl;

  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);

  gl.vertexAttribPointer(shader.IN_VEC3_POSITION, 3, gl.FLOAT, false, 24,  0 );
  gl.vertexAttribPointer(shader.IN_VEC3_COLOR,    3, gl.FLOAT, false, 24, 12 );

  gl.enableVertexAttribArray(shader.IN_VEC3_POSITION );
  gl.enableVertexAttribArray(shader.IN_VEC3_COLOR );

  gl.drawArrays(gl.LINES, 0, 6 );
  gl.flush();
}



