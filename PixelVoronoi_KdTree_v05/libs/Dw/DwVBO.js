/**
 * project: ...
 * author: thomas diewald
 * date:   07.02.12
 */


function DwVBO(gl){
  this.gl = gl;

  this.HANDLE_indices     = gl.createBuffer();
  this.HANDLE_vertex_data = gl.createBuffer();

  this.number_of_vertices = 0;
  this.vertices_offset    = 0;

  this.vertex_data_set;

  this.use_indices = true;

  this.drawing_mode = gl.TRIANGLES;//drawing_type;  // gl.TRIANGLES, gl.LINES, etc....

}





/**
 *
 * draw()
 *
 */
DwVBO.prototype.draw = function(){

  var gl = this.gl;
  var dataset_list = this.vertex_data_set;
  var dataset;

  // ____ ATTRIBUTES ____ (shader, enable)
  for(var i = 0; i < dataset_list.length, dataset = dataset_list[i]; i++){
    gl.enableVertexAttribArray(dataset.index);
  }

  // ____ ATTRIBUTES ____ (vbo)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vertex_data);
    for(var i = 0; i < dataset_list.length,  dataset = dataset_list[i]; i++){
//      if( dataset.index < 0)
//        continue;
      gl.vertexAttribPointer(dataset.index, dataset.size, dataset.type, dataset.normalized, dataset.stride, dataset.offset);
    }
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // ____ DRAW ____
  if( !this.use_indices ){
    gl.drawArrays(this.drawing_mode, this.vertices_offset, this.number_of_vertices);
  } else {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.HANDLE_indices);
      gl.drawElements(this.drawing_mode, this.number_of_vertices, gl.UNSIGNED_SHORT, this.vertices_offset);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  gl.flush();

  // ____ ATTRIBUTES ____ (shader, disable)
  for(var i = 0; i < dataset_list.length, dataset = dataset_list[i]; i++){
    gl.disableVertexAttribArray(dataset.index);
  }
}


//  buffer_access = [
//    gl.STREAM_DRAW,  // 0
//    gl.STATIC_DRAW, // 3
//    gl.DYNAMIC_DRAW // 6
//  ];




/**
 *
 * updateVBO_indices()
 *
 */
DwVBO.prototype.updateVBO_indices = function(buffer, data_usage){
  var gl = this.gl;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.HANDLE_indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  buffer, data_usage);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

/**
 *
 * updateVBO_vertices()
 *
 */
DwVBO.prototype.updateVBO_vertices = function(buffer, data_usage){
  var gl = this.gl;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vertex_data);
    gl.bufferData(gl.ARRAY_BUFFER,  buffer, data_usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

}


/**
 *
 * initVertexDataLayout()
 *
 */
DwVBO.prototype.initVertexDataLayout = function(){
  this.vertex_data_set = new Array();
}



/**
 *
 * addVertexDataSet()
 *
 */
DwVBO.prototype.addVertexDataSet = function(data_set_idx, description, shader_location, number_of_values){
  var dataset = {
    "description"  : description,          // description
    "index"        : shader_location,      // glVertexAttribPointer ... index
    "size"         : number_of_values,     // glVertexAttribPointer ... size, number of elements
    "type"         : this.gl.FLOAT,        // glVertexAttribPointer ... type
    "normalized"   : false,                // glVertexAttribPointer ... normalized
    "stride"       : 0,                    // glVertexAttribPointer ... stride
    "offset"       : 0,                    // glVertexAttribPointer ... offset
    "size_in_bytes": number_of_values * 4  // glVertexAttribPointer ... size in bytes
  };
  this.vertex_data_set[data_set_idx] = dataset;
}


/**
 *
 * updateVertexDataSets()
 *
 */
DwVBO.prototype.updateVertexDataSets = function (){
  //calculate overall stride (in bytes)
  var gl = this.gl;
  var stride = 0;
  var dataset = this.vertex_data_set;
  for(var i = 0; i < dataset.length; i++){
    stride += dataset[i].size_in_bytes;
  }

  // set vertex-attribute-pointer for each VertexDataSet
  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vertex_data);
  var offset = 0;
  for(var i = 0; i < dataset.length; i++){
    var ds = dataset[i];
    ds.offset = offset;
    ds.stride = stride;
    console.log("..." +ds.description +": gl.vertexAttribPointer("+ds.index+", "+ds.size+", "+ ds.type+", "+ ds.normalized+", "+ ds.stride+", "+ ds.offset+");");
//    gl.vertexAttribPointer(ds.index, ds.size, ds.type, ds.normalized, ds.stride, ds.offset);
    offset +=  ds.size_in_bytes;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}



/**
 *
 * printvertexDataSet()
 *
 */
DwVBO.prototype.printvertexDataSet = function(dataset){
   console.log("dataset: "+dataset.description+", "+dataset.index+", "+dataset.size+", "+dataset.type+", "+dataset.normalized+", "+dataset.stride+", "+dataset.size_in_bytes);
}
/**
 *
 * useIndices()
 *
 */
DwVBO.prototype.useIndices = function(use_indices){
  this.use_indices = use_indices;
}
/**
 *
 * setDrawingMode()
 *
 */
DwVBO.prototype.setDrawingMode = function(drawing_mode){
  this.drawing_mode = drawing_mode;
}



DwVBO.prototype.setDrawingRange = function(offset, length){
  this.number_of_vertices = length;
  this.vertices_offset    = offset;
}



function ERROR_CHECK(gl, debug_note, print_note) {
//  var c = gl.getError();
//  if (print_note) console.log("--------------------------<  ERROR_CHECK >--------------------------( "+debug_note+" )");
//  var has_error = c != gl.NO_ERROR;
//  if (has_error )
//    console.logn(glu.gluErrorString(c));
//  if (print_note) System.out.println("--------------------------< /ERROR_CHECK >--------------------------");
//  return has_error;
}
