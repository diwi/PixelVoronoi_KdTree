/**
 * project: ...
 * author: thomas
 * date: 05.02.12
 */




function DwShader(gl, path, shader_name_vert, shader_name_frag){

  this.gl = gl;
  this.HANDLE_program = null;
  this.HANDLE_vert = null;
  this.HANDLE_frag = null;

  this.path = path;
  this.shader_name_vert = shader_name_vert;
  this.shader_name_frag = shader_name_frag;
  this.create();

}


/**
 * static loadShaderFileContent()
 * @param filename
 */
DwShader.loadShaderFileContent = function (filename){
  var XHR = new XMLHttpRequest();
  XHR.open('GET', filename, !true);
  XHR.responseType = "text";
  XHR.send(null);
  if (XHR.readyState === 4) {
    if (XHR.status === 0) { // TODO: 200
      return XHR.responseText;
    }
//    alert("xhr.status = "+xhr.status);
    return null;
  }
//  alert("xhr.status != 4");
  return null;
}


/**
 * static getShader()
 *
 * @param gl
 * @param shader_file
 * @param shader_type
 */
DwShader.getShader = function (gl, shader_file, shader_type) {
  var shader_content = DwShader.loadShaderFileContent(shader_file);
  if( shader_content == null )
    return null;

  var handle = gl.createShader(shader_type);

  gl.shaderSource(handle, shader_content);
  gl.compileShader(handle);

  if (!gl.getShaderParameter(handle, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(handle));
    return null;
  }

  return handle;
}


DwShader.prototype.create = function (){
  var gl = this.gl;
  this.HANDLE_vert = DwShader.getShader(gl, this.path+this.shader_name_vert, gl.VERTEX_SHADER);
  this.HANDLE_frag = DwShader.getShader(gl, this.path+this.shader_name_frag, gl.FRAGMENT_SHADER);

  this.HANDLE_program = gl.createProgram();
  gl.attachShader(this.HANDLE_program, this.HANDLE_vert);
  gl.attachShader(this.HANDLE_program, this.HANDLE_frag);
  gl.linkProgram(this.HANDLE_program);

  if (!gl.getProgramParameter(this.HANDLE_program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
}


