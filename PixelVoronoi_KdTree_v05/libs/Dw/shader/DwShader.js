/**
 * project: ...
 * author: thomas
 * date: 05.02.12
 */

//http://www.opengl.org/wiki/OpenGL_Shading_Language#Building_shaders
function DwShader(gl, path, shader_name_vert, shader_name_frag){
  this.gl = gl;
  this.path = path;
  this.shader_name_vert = shader_name_vert;
  this.shader_name_frag = shader_name_frag;

  this.HANDLE_program = null;
  this.HANDLE_vert = null;
  this.HANDLE_frag = null;

  this.onload = function(){};
}

DwShader.prototype.load = function(obj){
  var _this = this;

  var shader_vert = new DwShaderElement(_this.gl,_this.path, _this.shader_name_vert, _this.gl.VERTEX_SHADER);
  var shader_frag = new DwShaderElement(_this.gl,_this.path, _this.shader_name_frag, _this.gl.FRAGMENT_SHADER);

  // fragment shader is loaded after vertex shader
  shader_frag.onload = function(){
    _this.createShaderProgram(shader_vert, shader_frag);
    _this.onload(); // defined by caller!!!
  };

  // vertex shader is loaded at first, ... on load the fragmentshader is getting loaded
  shader_vert.onload = function(){
    shader_frag.load(obj);
  };

  // now, init the loading process (asynchronous)
  shader_vert.load(obj);
}
DwShader.prototype.delete = function(){
  this.gl.deleteShader (this.HANDLE_vert);
  this.gl.deleteShader (this.HANDLE_frag);
  this.gl.deleteProgram(this.HANDLE_program);
  this.HANDLE_vert = null;
  this.HANDLE_frag = null;
  this.HANDLE_program = null;
}


DwShader.prototype.createShaderProgram = function(vert, frag){
  this.HANDLE_vert = vert.HANDLE;
  this.HANDLE_frag = frag.HANDLE;
  this.HANDLE_program = this.gl.createProgram();
  this.gl.attachShader(this.HANDLE_program, vert.HANDLE);
  this.gl.attachShader(this.HANDLE_program, frag.HANDLE);
  this.gl.validateProgram(this.HANDLE_program);
  this.gl.linkProgram (this.HANDLE_program);

  if (!this.gl.getProgramParameter(this.HANDLE_program, this.gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
    console.log(this.gl.getProgramInfoLog(this.HANDLE_program));
  }
}





function DwShaderElement(gl, path, filename, shader_type){
  this.gl = gl;
  this.HANDLE = null;
  this.total_file_path = path + filename;
  this.shader_type = shader_type;
  var _this = this;
  this.onload = function(){};
  this.onerror = function(){
    console.log("ERROR while loading SHADER-file: "+_this.total_file_path);
  };
}

//https://developer.mozilla.org/en/XMLHttpRequest
DwShaderElement.prototype.load = function(obj, async){
  var _this = this;
  var XHR = new XMLHttpRequest();
  XHR.open("GET", this.total_file_path, (async === undefined) || async ); //true=asynchronous
  XHR.responseType = "text";
  XHR.onload = function (event) {

    _this.HANDLE = _this.gl.createShader(_this.shader_type);
    _this.gl.shaderSource(_this.HANDLE, XHR.responseText);
    _this.gl.compileShader(_this.HANDLE);
    if (!_this.gl.getShaderParameter(_this.HANDLE, _this.gl.COMPILE_STATUS)) {
//      alert("ERROR ON COMPILING SHADER");
//      _this.onerror();
      alert("ERROR on compiling shader: "+_this.total_file_path+"\n"+_this.gl.getShaderInfoLog(_this.HANDLE));
    }else {
      _this.onload();
    }
  };

  try{
    XHR.send(obj); // usually null
  } catch (exception){
//    console.log(exception);
//    console.log("ERROR while loading SHADER-file: "+this.total_file_path);
    _this.onerror();
  }
}
DwShaderElement.prototype.delete = function(){
  this.gl.deleteShader(this.HANDLE);
  this.HANDLE = null;
}



///**
// * static loadShaderFileContent()
// * @param filename
// */
//DwShader.loadShaderFileContent = function (filename){
//  var XHR = new XMLHttpRequest();
//  XHR.open('GET', filename, !true);
//  XHR.responseType = "text";
//  XHR.send(null);
//  if (XHR.readyState === 4) {
//    if (XHR.status === 0) { // TODO: 200
//      return XHR.responseText;
//    }
////    alert("xhr.status = "+xhr.status);
//    return null;
//  }
////  alert("xhr.status != 4");
//  return null;
//}
//
//
///**
// * static getShader()
// *
// * @param gl
// * @param shader_file
// * @param shader_type
// */
//DwShader.getShader = function (gl, shader_file, shader_type) {
//  var shader_content = DwShader.loadShaderFileContent(shader_file);
//  if( shader_content == null )
//    return null;
//
//  var handle = gl.createShader(shader_type);
//
//  gl.shaderSource(handle, shader_content);
//  gl.compileShader(handle);
//
//  if (!gl.getShaderParameter(handle, gl.COMPILE_STATUS)) {
//    alert(gl.getShaderInfoLog(handle));
//    return null;
//  }
//
//  return handle;
//}
//
//DwShader.prototype.create = function (){
//  var gl = this.gl;
//  this.HANDLE_vert = DwShader.getShader(gl, this.path+this.shader_name_vert, gl.VERTEX_SHADER);
//  this.HANDLE_frag = DwShader.getShader(gl, this.path+this.shader_name_frag, gl.FRAGMENT_SHADER);
//
//  this.HANDLE_program = gl.createProgram();
//  gl.attachShader(this.HANDLE_program, this.HANDLE_vert);
//  gl.attachShader(this.HANDLE_program, this.HANDLE_frag);
//  gl.linkProgram(this.HANDLE_program);
//
//  if (!gl.getProgramParameter(this.HANDLE_program, gl.LINK_STATUS)) {
//    alert("Could not initialise shaders");
//  }
//}
//

