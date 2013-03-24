///**
// * project: ...
// * author: thomas diewald
// * date:   08.02.12
// */
//
//
//function DwQuad(gl, width, height){
//  var w = width;
//  var h = height;
//  this.vertex_data =
//    [
//      0.0, 0.0, 0.0,      // vertex 0
//      1.0, 0.0, 0.0,      // color red
//      0.0, 0.0,           // texcoords
//
//        w, 0.0, 0.0,      // vertex 1
//      0.0, 1.0, 0.0,      // color green
//      1.0, 0.0,           // texcoords
//
//        w,   h, 0.0,      // vertex 2
//      0.0, 0.0, 1.0,      // color blue
//      1.0, 1.0,           // texcoords
//
//      0.0,   h, 0.0,      // vertex 3
//      1.0, 1.0, 1.0,      // color white
//      0.0, 1.0            // texcoords
//    ];
//
//  this.data_Float32 = new Float32Array(this.vertex_data);
//
//  this.HANDLE_vbo = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
//  gl.bufferData(gl.ARRAY_BUFFER, this.data_Float32, gl.STATIC_DRAW);
//}
//
//DwQuad.prototype.delete = function(){
//  this.gl.deleteBuffer(this.HANDLE_vbo);
//  this.HANDLE_vbo = null;
//}
//
//
//
//
////DwQuad.prototype.draw = function(shader){
////  var gl = this.gl;
////
////  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
////
////  gl.vertexAttribPointer(shader.IN_VEC3_POSITION, 3, gl.FLOAT, false, 24,  0 );
////  gl.vertexAttribPointer(shader.IN_VEC3_COLOR,    3, gl.FLOAT, false, 24, 12 );
////  gl.vertexAttribPointer(shader.IN_VEC3_COLOR,    3, gl.FLOAT, false, 24, 12 );
////
////  gl.enableVertexAttribArray(shader.IN_VEC3_POSITION );
////  gl.enableVertexAttribArray(shader.IN_VEC3_COLOR );
////
////  this.gl.drawArrays(this.gl.LINES, 0, 6 );
////  this.gl.flush();
////}
////
//
