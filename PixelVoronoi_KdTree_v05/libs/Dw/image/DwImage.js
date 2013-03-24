/**
 * project: ...
 * author: thomas diewald
 * date:   20.02.12
 */



function DwImage(gl, path, filename){
  this.gl = gl;
  this.path = path;
  this.filename = filename;

  this.image = null;
  this.LOADED = false;

  this.HANDLE_TEX = null;
  var _this = this;

  this.filesuffix = filename.substring(filename.lastIndexOf("."));

  // handle TGAs separately
  if( this.filesuffix === ".tga"){
//    console.log("image type: TGA");
    var tga = new DwImage_TGA(path, filename);
    tga.onload = function(){

//    http://www.khronos.org/registry/webgl/specs/latest/#TEXIMAGE2D
      if( tga.pixel_depth == 32 ){
        _this.createTextureFromTGA (_this, _this.gl.RGBA, tga.width, tga.height, _this.gl.RGBA, tga.pixels);
        _this.image = tga;

      } else if( tga.pixel_depth == 24 ){
        _this.createTextureFromTGA (_this, _this.gl.RGB, tga.width, tga.height, _this.gl.RGB, tga.pixels);
        _this.image = tga;
      }
    };
    tga.load(null);
//  http://www.khronos.org/registry/webgl/specs/latest/#TEXIMAGE2D
//    if( tga.pixel_depth == 32 ){
//      this.createTextureFromTGA (this, this.gl.RGBA, tga.width, tga.height, this.gl.RGBA, tga.pixels);
//      this.image = tga;
//
//    } else if( tga.pixel_depth == 24 ){
//      this.createTextureFromTGA (this, this.gl.RGB, tga.width, tga.height, this.gl.RGB, tga.pixels);
//      this.image = tga;
//    }
  }
  else
  if (
        this.filesuffix === ".jpg"
    ||  this.filesuffix === ".jpeg"
    ||  this.filesuffix === ".png"
    ||  this.filesuffix === ".bmp"
    ||  this.filesuffix === ".gif")
  {
    try{
      var tmp_image = new Image();
      tmp_image.src = path+filename;
      tmp_image.onload = function() {
        _this.createTexture(_this, tmp_image);
        _this.image = tmp_image;
      };
      tmp_image.onerror = function() {
        console.log("ERROR while loading Image: "+path+filename);
      };
    } catch (exception){
      console.log(exception);
    }
  }
  else
  {
    console.log("(DwImage) filename, filetype not suported: "+this.filesuffix);
  }
}

DwImage.prototype.delete = function(_this, image){
  this.gl.deleteTexture(this.HANDLE_TEX );
  this.HANDLE_TEX = null;
}



DwImage.prototype.createTextureFromTGA = function(_this, gl_internalformat, width, height,gl_format, pixels){
//  console.log("loading tga: "+_this.path +", "+_this.filename);
  var gl = _this.gl;
  _this.HANDLE_TEX = gl.createTexture();
  gl.bindTexture   ( gl.TEXTURE_2D, _this.HANDLE_TEX);
  gl.pixelStorei   ( gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT ) ;
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT ) ;
  gl.texImage2D    ( gl.TEXTURE_2D, 0, gl_internalformat, width, height, 0, gl_format, gl.UNSIGNED_BYTE, pixels);
  //      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.generateMipmap( gl.TEXTURE_2D);
  gl.bindTexture   ( gl.TEXTURE_2D, null);
  _this.LOADED = true;
}
DwImage.prototype.createTexture = function(_this, image){

  var gl = _this.gl;
  _this.HANDLE_TEX = gl.createTexture();
  gl.bindTexture   ( gl.TEXTURE_2D, _this.HANDLE_TEX);
//  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //TODO: check
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT ) ;
  gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT ) ;
  gl.texImage2D    ( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap( gl.TEXTURE_2D);
  gl.bindTexture   ( gl.TEXTURE_2D, null);
  _this.LOADED = true;
}
