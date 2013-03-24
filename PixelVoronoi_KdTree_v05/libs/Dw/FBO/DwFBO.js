/**
 * project: ...
 * author: thomas diewald
 * date:   23.02.12
 */


//  http://www.khronos.org/webgl/wiki_1_15/index.php/WebGL_and_OpenGL_Differences
function DwFBO(gl, width, height, datatype){
  this.gl = gl;
  this.width = width;
  this.height = height;
  this.datatype = datatype || gl.UNSIGNED_BYTE;


  // TEXTURE
  this.HANDLE_tex = gl.createTexture();
  gl.bindTexture   ( gl.TEXTURE_2D, this.HANDLE_tex);
  {
//    gl.pixelStorei   ( gl.UNPACK_FLIP_Y_WEBGL, true);
//    gl.pixelStorei   ( gl.UNPACK_ALIGNMENT, 1);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE ) ;
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE ) ;
    gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, this.datatype, null);
  //      gl.generateMipmap( gl.TEXTURE_2D);

  }
  gl.bindTexture   ( gl.TEXTURE_2D, null);


  // RENDERBUFFER / DEPTH
  this.HANDLE_rb_depth = gl.createRenderbuffer();
  gl.bindRenderbuffer   (gl.RENDERBUFFER, this.HANDLE_rb_depth);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
  gl.bindRenderbuffer   (gl.RENDERBUFFER, null);

  // RENDERBUFFER / STENCIL
  this.HANDLE_rb_stencil = gl.createRenderbuffer();
  gl.bindRenderbuffer   (gl.RENDERBUFFER, this.HANDLE_rb_stencil);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
  gl.bindRenderbuffer   (gl.RENDERBUFFER, null);


  // FBO
  this.HANDLE_FBO = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.HANDLE_FBO);
  {
    gl.framebufferTexture2D   (gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,   this.HANDLE_tex, 0);
//    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,  gl.RENDERBUFFER, this.HANDLE_rb_depth);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT,  gl.RENDERBUFFER, this.HANDLE_rb_stencil);

    DwContext.WEBGL_FBO_CHECK(gl, this.HANDLE_FBO);

  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

DwFBO.prototype.resize = function(width, height){
  this.width = width;
  this.height = height;
  var gl = this.gl;
  // TEXTURE 2D
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.HANDLE_FBO);

  gl.bindTexture   ( gl.TEXTURE_2D, this.HANDLE_tex);
  gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, this.datatype, null);
  gl.bindTexture   ( gl.TEXTURE_2D, null);

  // RENDERBUFFER / DEPTH
  gl.bindRenderbuffer   (gl.RENDERBUFFER, this.HANDLE_rb_depth);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
  gl.bindRenderbuffer   (gl.RENDERBUFFER, null);

  // RENDERBUFFER / STENCIL
  gl.bindRenderbuffer   (gl.RENDERBUFFER, this.HANDLE_rb_stencil);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
  gl.bindRenderbuffer   (gl.RENDERBUFFER, null);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

DwFBO.prototype.delete = function(width, height){
  var gl = this.gl;
  gl.deleteTexture(this.HANDLE_tex);
  gl.deleteRenderbuffer(this.HANDLE_rb_stencil);
  gl.deleteFramebuffer(this.HANDLE_FBO);
  this.HANDLE_FBO        = null;
  this.HANDLE_rb_stencil = null;
  this.HANDLE_tex        = null;
  this.gl = null;
  this.width = 0;
  this.height = 0;
  this.datatype = 0;
}



DwFBO.prototype.getTexture = function(){
  return this.HANDLE_tex;
}
DwFBO.prototype.getWidth = function(){
  return this.width;
}
DwFBO.prototype.getHeight = function(){
  return this.height;
}
DwFBO.prototype.bind = function(){
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.HANDLE_FBO);
}
DwFBO.prototype.unbind = function(){
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
}
