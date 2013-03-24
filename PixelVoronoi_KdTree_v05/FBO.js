/**
 * author: thomas diewald
 * date:   19.03.13
 *
 * FBO as a rendertarget for the distance map.
 */


function FBO(CTX){

  this.CTX = CTX;
  var gl = this.CTX.gl;

  this.HANDLE_FBO      = gl.createFramebuffer();
  this.HANDLE_texture  = null;

//  console.log("HANDLE_FBO     = "+ this.HANDLE_FBO);
//  console.log("HANDLE_texture = "+ this.HANDLE_texture);
}

FBO.prototype.delete = function(){
  this.CTX.gl.deleteFramebuffer(this.HANDLE_FBO); this.HANDLE_FBO = null;
  this.CTX.gl.deleteTexture(this.HANDLE_texture); this.HANDLE_texture = null;
}

FBO.prototype.resize = function(w, h, scale){

  // TODO im not sure if theres some memory-leak when textures get resized

  if(this.w == w && this.h == h && this.scale == scale){
    return;
  }

  var gl = this.CTX.gl;

  this.scale = scale;
  this.w = w/scale;
  this.h = h/scale;

  this.CTX.gl.deleteTexture(this.HANDLE_texture); this.HANDLE_texture = null;
//  this.delete();

//  this.HANDLE_FBO      = gl.createFramebuffer();
  gl.deleteTexture(this.HANDLE_texture);
  this.HANDLE_texture  = gl.createTexture();

//  console.log("FBO.prototype.resize "+w+", "+h);

  // TEXTURE: distance map (for framebuffer)
  gl.bindTexture   ( gl.TEXTURE_2D, this.HANDLE_texture);
  {
    gl.pixelStorei   ( gl.UNPACK_ALIGNMENT, 1);
//    gl.pixelStorei   ( gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE ) ;
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE ) ;
//    gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.RGBA, this.w, this.h, 0, gl.RGBA, gl.FLOAT, null );
    gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.RGB, this.w, this.h, 0, gl.RGB, gl.FLOAT, null );
//    gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.ALPHA, this.w, this.h, 0, gl.ALPHA, gl.FLOAT, null );
  }
  gl.bindTexture   ( gl.TEXTURE_2D, null);

  gl.bindFramebuffer(gl.FRAMEBUFFER, this.HANDLE_FBO);
  {
    gl.framebufferTexture2D  (gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.HANDLE_texture, 0);
    DwContext.WEBGL_FBO_CHECK(gl, this.HANDLE_FBO);
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}


FBO.prototype.bind = function(){
  this.CTX.gl.viewport(0, 0,this.w, this.h);
  this.CTX.gl.bindFramebuffer(this.CTX.gl.FRAMEBUFFER, this.HANDLE_FBO);
}
FBO.prototype.unbind = function(){
  this.CTX.gl.bindFramebuffer(this.CTX.gl.FRAMEBUFFER, null);
}
