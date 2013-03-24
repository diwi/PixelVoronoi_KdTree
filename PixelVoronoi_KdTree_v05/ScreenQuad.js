/**
 * project: ...
 * author: thomas diewald
 * date:   19.03.13
 */


function ScreenQuad(CTX){

  this.CTX = CTX;
  var gl = this.CTX.gl;

  this.shader;

  var screenquad = new Float32Array(  [   -1, -1,   0, 0, // x,y, s,t, no matrix needed
                                          -1, +1,   0, 1,
                                          +1, -1,   1, 0,
                                          +1, +1,   1, 1   ]);

  this.HANDLE_vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
  gl.bufferData(gl.ARRAY_BUFFER, screenquad, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}


ScreenQuad.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
  this.CTX.gl.deleteBuffer( this.HANDLE_vbo);
  this.HANDLE_vbo = null;
}


ScreenQuad.prototype.loadShader = function(){
  var gl = this.CTX.gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/DwScreenQuad_vert.glsl", "SHADERS/DwScreenQuad_frag.glsl");
  _this.shader.onload = function(){
//    console.log("(ScreenQuad)... LOADING SHADER Draw");
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}

ScreenQuad.prototype.saveShaderLocations = function(){
  var gl = this.CTX.gl;

  var HANDLE_shader = this.shader.HANDLE_program;
//  console.log("(ScreenQuad)... SAVE SHADER LOCATIONS "+HANDLE_shader);
  gl.useProgram(HANDLE_shader);
  {
    this.IN_VEC2_POSITION        = gl.getAttribLocation (HANDLE_shader, "IN_VEC2_POSITION"       );
    this.IN_VEC2_ST              = gl.getAttribLocation (HANDLE_shader, "IN_VEC2_ST"             );
    this.UN_SAMP_TEXTURE         = gl.getUniformLocation(HANDLE_shader, "UN_SAMP_TEXTURE"         );
    this.UN_INT_RGB_INVERT       = gl.getUniformLocation(HANDLE_shader, "UN_INT_RGB_INVERT"      );
    this.UN_VEC3_RGB_SCALE       = gl.getUniformLocation(HANDLE_shader, "UN_VEC3_RGB_SCALE"      );
  }
  gl.useProgram(null);

//  console.log("IN_VEC2_POSITION    = "+this.IN_VEC2_POSITION  );
//  console.log("IN_VEC2_ST          = "+this.IN_VEC2_ST        );
//  console.log("UN_SAMP_TEXTURE     = "+this.UN_SAMP_TEXTURE   );
//  console.log("UN_INT_RGB_INVERT   = "+this.UN_INT_RGB_INVERT );
//  console.log("UN_VEC3_RGB_SCALE   = "+this.UN_VEC3_RGB_SCALE );
}

function map(val, a, b, A, B){
  return ((val-a)/(b-a))*(B-A)+A;
}

ScreenQuad.prototype.setUniforms = function(invert, num_points){
  var viewport = this.CTX.VIEWPORT;
  var mouse    = this.CTX.mouse_info;
  var key      = this.CTX.key_info;

  var w = viewport.width;
  var h = viewport.height;

  var mx_norm = mouse.mouseX/w;
  var my_norm = mouse.mouseY/h;

//  var fs = Math.log( Math.sqrt( (num_points ))) ;
//  fs = fs*fs*fs*0.00005;

  var px = w*w/num_points;
  var py = h*h/num_points;

  var fs = 1/(Math.sqrt(px + py)*Math.log(  num_points  )*1.5);

  var rgb_scale = [];
  rgb_scale[0] = (4*fs);
  rgb_scale[1] = (5*fs) * mx_norm;
  rgb_scale[2] = (9*fs) * my_norm;

  // clamp values [0,1]
  rgb_scale[0] = Math.min(Math.max( rgb_scale[0], 0), 1);
  rgb_scale[1] = Math.min(Math.max( rgb_scale[1], 0), 1);
  rgb_scale[2] = Math.min(Math.max( rgb_scale[2], 0), 1);

  if( invert ){
    rgb_scale[0] *= 3;
    rgb_scale[1] *= 4;
    rgb_scale[2] *= 5;
  }

  var gl = this.CTX.gl;
  var HANDLE_shader = this.shader.HANDLE_program;
  gl.useProgram(HANDLE_shader);
  {
    gl.uniform1i (this.UN_INT_RGB_INVERT,  invert?1:0);
    gl.uniform3fv(this.UN_VEC3_RGB_SCALE,  new Float32Array(rgb_scale));
  }
  gl.useProgram(null);
}

ScreenQuad.prototype.render = function(HANDLE_texture, invert, num_points){
  if( this.IN_VEC2_POSITION==undefined){
    return;
  }

  this.setUniforms(invert, num_points);

  var gl = this.CTX.gl;
  var HANDLE_shader = this.shader.HANDLE_program;
  gl.useProgram(HANDLE_shader);
  {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture  (gl.TEXTURE_2D, HANDLE_texture );
    gl.uniform1i    (this.UN_SAMP_TEXTURE, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo);
    gl.vertexAttribPointer(this.IN_VEC2_POSITION, 2, gl.FLOAT, false, 16,  0 );
    gl.vertexAttribPointer(this.IN_VEC2_ST,       2, gl.FLOAT, false, 16, 8 );

    gl.enableVertexAttribArray(this.IN_VEC2_POSITION );
    gl.enableVertexAttribArray(this.IN_VEC2_ST );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4 );
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture  (gl.TEXTURE_2D, null );

    gl.flush();
  }
  gl.useProgram(null);
}
