/**
 * project: ...
 * author: thomas diewald
 * date:   08.02.12
 */


function DwRectangle(gl, x, y, width, height){
  this.gl = gl;

  var w = width;
  var h = height;

  var x_s = x;
  var y_s = y;
  var x_e = x+width;
  var y_e = y+height;

  var wh = w*0.5;
  var hh = h*0.5;

  this.vertex_data =
    [
      x_s, y_s, 0.0,      // vertex 0
      0.0, 0.0, 1.0,      // normal
      1.0, 0.0, 0.0,      // color red
      0.0, 0.0,           // texcoords

      x_s, y_e, 0.0,      // vertex 3
      0.0, 0.0, 1.0,      // normal
      1.0, 1.0, 1.0,      // color white
      0.0, 1.0,            // texcoords

      x_e, y_s, 0.0,      // vertex 1
      0.0, 0.0, 1.0,      // normal
      0.0, 1.0, 0.0,      // color green
      1.0, 0.0,           // texcoords
//    x_s, y_e, 0.0,      // vertex 3
//    0.0, 0.0, 1.0,      // normal
//    1.0, 1.0, 1.0,      // color white
//    0.0, 1.0,            // texcoords

      x_e, y_e, 0.0,      // vertex 2
      0.0, 0.0, 1.0,      // normal
      0.0, 0.0, 1.0,      // color blue
      1.0, 1.0           // texcoords
    ];


  this.data_Float32 = new Float32Array(this.vertex_data);

  this.HANDLE_vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
  gl.bufferData(gl.ARRAY_BUFFER, this.data_Float32, gl.STATIC_DRAW);
}

DwRectangle.prototype.delete = function(){
  this.gl.deleteBuffer(this.HANDLE_vbo);
  this.HANDLE_vbo = null;
  this.data_Float32 = null;
  this.vertex_data = [];
}



DwRectangle.prototype.draw = function(shader){
  var gl = this.gl;

  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);

  gl.vertexAttribPointer(shader.IN_VEC3_POSITION, 3, gl.FLOAT, false, 44,  0 );
  gl.vertexAttribPointer(shader.IN_VEC3_NORMAL,   3, gl.FLOAT, false, 44, 12 );
//  gl.vertexAttribPointer(shader.IN_VEC3_COLOR,    3, gl.FLOAT, false, 44, 24 );
  gl.vertexAttribPointer(shader.IN_VEC2_ST,       2, gl.FLOAT, false, 44, 36 );

  gl.enableVertexAttribArray(shader.IN_VEC3_POSITION );
  gl.enableVertexAttribArray(shader.IN_VEC3_NORMAL );
//  gl.enableVertexAttribArray(shader.IN_VEC3_COLOR );
  gl.enableVertexAttribArray(shader.IN_VEC2_ST );

  gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4 );
//  gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 6 );
  gl.flush();
}


