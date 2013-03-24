/**
 * project: ...
 * author: thomas diewald
 * date:   11.02.12
 */



function DwContext(b_init, canvas_name){
  this.canvas_name = canvas_name;
  this.gl;
  this.gl_debug;

  this.VIEWPORT = {
    width : 0,
    height: 0,
    off_x : 0,
    off_y : 0
  };

  this.fullscreen = true;

  this.div_canvas;
  this.canvas;
  this.ANIMATOR = true;

  this.frame_info;
  this.mouse_info;
  this.key_info;

  var _this = this;
  this.onresize = function(){};

  window.onresize = function(){
    _this.updateVIEWPORTdimensions();
    _this.onresize();
  };
  this.onclose = function(){};

  window.onunload = function(){
    _this.onclose();
  }


  if( b_init ){
    this.init();
  }
}


DwContext.prototype.updateBegin = function(){
  this.mouse_info.updateBegin();
  this.frame_info.update();
  this.key_info  .updateBegin();
}

DwContext.prototype.updateEnd = function(){
  this.mouse_info.updateEnd();
  this.key_info  .updateEnd();
}

DwContext.prototype.updateVIEWPORTdimensions = function () {
  if( this.fullscreen ){
    this.VIEWPORT.width  = window.innerWidth;
    this.VIEWPORT.height = window.innerHeight;
    this.VIEWPORT.off_x  = 0;
    this.VIEWPORT.off_y  = 0;
    this.div_canvas.style.width = 0;
    this.div_canvas.style.height = 0;
  }
  if( !this.fullscreen ){
    this.VIEWPORT.width  = this.div_canvas.offsetWidth;
    this.VIEWPORT.height = this.div_canvas.offsetHeight;
    this.VIEWPORT.off_x  = getOffsetX(this.div_canvas);
    this.VIEWPORT.off_y  = getOffsetY(this.div_canvas);
  }
  this.canvas.width  = this.VIEWPORT.width;
  this.canvas.height = this.VIEWPORT.height;
  this.div_canvas.style.left = this.VIEWPORT.off_x ;
  this.div_canvas.style.top  = this.VIEWPORT.off_y;
}


DwContext.prototype.init = function () {
  this.canvas      = document.getElementById(this.canvas_name);
  this.div_canvas  = document.getElementById("div_webgl_canvas");
  var _this = this;

  this.updateVIEWPORTdimensions();

  try {
//    this.gl = this.canvas.getContext("experimental-webgl", antialias: !false);
    this.gl = this.canvas.getContext("webgl"); //TODO

    if( !this.gl ){
      // http://www.khronos.org/registry/webgl/specs/latest/#5.2.1
      console.log("using : experimental-webgl");
      this.gl = this.canvas.getContext("experimental-webgl"
        ,{
          alpha: true,
          depth: true,
//          antialias: true,
          stencil:true,
          preserveDrawingBuffer: true
        }
      ); //, { antialias: false,stencil: true });
    }else {
      console.log("using : webgl");
    }
//    this.gl = this.canvas.getContext("experimental-webgl",  {preserveDrawingBuffer: true});
    this.gl_debug = WebGLDebugUtils.makeDebugContext( this.gl );
    WebGLDebugUtils.init(this.gl_debug);
  } catch (e) {
    console.log(e);
  }
  if (!this.gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
  this.frame_info = new DwFrameInfo(this);
  this.mouse_info = new DwMouseInfo(this);
  this.key_info   = new DwKeyInfo(this);
}


DwContext.prototype.WEBGL_ERROR_CHECK = function (){
  var error = this.gl_debug.getError();
  var error_str = WebGLDebugUtils.glEnumToString(error);
  if (error != 0)
    alert("WebGL_ERROR: "+error_str);
}

DwContext.WEBGL_FBO_CHECK = function(gl, handle_fbo){
  if (!gl.isFramebuffer(handle_fbo)) {
    throw("Invalid framebuffer");
  }
  var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  switch (status) {
    case gl.FRAMEBUFFER_COMPLETE:
      break;
    case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
      throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
      break;
    case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
      throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
      break;
    case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
      throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
      break;
    case gl.FRAMEBUFFER_UNSUPPORTED:
      throw("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
      break;
    default:
      throw("Incomplete framebuffer: " + status);
  }
}

function getOffsetX(obj){
  var curleft = 0;
  if (obj.offsetParent){
    while (obj.offsetParent){
      curleft += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  }
  else if (obj.x) curleft += obj.x;
  return curleft;
}

function getOffsetY(obj){
  var curtop = 0;
  if (obj.offsetParent){
    while (obj.offsetParent){
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
  }
  else if (obj.y) curtop += obj.y;
  return curtop;
}
