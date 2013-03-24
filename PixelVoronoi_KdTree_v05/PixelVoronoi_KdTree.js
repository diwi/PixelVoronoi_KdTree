/**
 * author: thomas diewald
 * date:   16.03.13
 *
 * creating the distance map.
 */



function PixelVoronoi_KdTree(CTX, kdtree) {

  this.CTX = CTX;
  this.kdtree = kdtree;

  this.tex_size = [];
  this.num_nodes = 0;

  var gl = this.CTX.gl;

  this.shader_dis;
  this.HANDLE_shader_dis;

  this.loadShaderDis();

  this.HANDLE_vbo_screen = gl.createBuffer();
//  this.HANDLE_tex_kdtree = gl.createTexture();

//  console.log("HANDLE_vbo_screen = "+ this.HANDLE_vbo_screen);
//  console.log("HANDLE_tex_kdtree = "+ this.HANDLE_tex_kdtree);

//  gl.bindTexture   ( gl.TEXTURE_2D, this.HANDLE_tex_kdtree);
//  {
//    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE ) ;
//    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE ) ;
//  }
//  gl.bindTexture   ( gl.TEXTURE_2D, null);




  this.fbo = new FBO(CTX);
  this.screenquad = new ScreenQuad(CTX);
  this.screenquad.loadShader();

  // weird thing: different values on the same system
  //   firefox ... 16384
  //   chrom   ...  8192
  this.GL_MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE);
//  console.log("GL_MAX_TEXTURE_SIZE = "+ this.GL_MAX_TEXTURE_SIZE);

}




PixelVoronoi_KdTree.prototype.loadShaderDis = function(){
  var gl = this.CTX.gl;
  var _this = this;

  var vert_shader = "SHADERS/PixelVoronoiKdTree_vert.glsl";
  var frag_shader = "SHADERS/PixelVoronoiKdTree_frag.glsl";

  _this.shader_dis = new DwShader(gl, "", vert_shader, frag_shader);
  _this.shader_dis.onload = function(){
//    console.log("... LOADING SHADER");
    _this.saveShaderDisLocations();
    _this.createDistanceMap();
  }
  _this.shader_dis.load(null);
}





PixelVoronoi_KdTree.prototype.saveShaderDisLocations = function(){
  var gl = this.CTX.gl;

  this.HANDLE_shader_dis = this.shader_dis.HANDLE_program;
//  console.log("... SAVE SHADER LOCATIONS "+this.HANDLE_shader_dis);
  gl.useProgram(this.HANDLE_shader_dis);
  {
    this.IN_VEC2_POSITION        = gl.getAttribLocation (this.HANDLE_shader_dis, "IN_VEC2_POSITION"   );
    this.IN_VEC2_ST              = gl.getAttribLocation (this.HANDLE_shader_dis, "IN_VEC2_ST"         );
    this.UN_SAMP_KDTREE          = gl.getUniformLocation(this.HANDLE_shader_dis, "UN_SAMP_KDTREE"     );
    this.UN_SAMP_KDTREE_SIZE     = gl.getUniformLocation(this.HANDLE_shader_dis, "UN_SAMP_KDTREE_SIZE");
  }
  gl.useProgram(null);


//  console.log("IN_VEC2_POSITION         = "+this.IN_VEC2_POSITION         );
//  console.log("IN_VEC2_ST               = "+this.IN_VEC2_ST               );
//  console.log("UN_SAMP_KDTREE           = "+this.UN_SAMP_KDTREE           );
//  console.log("UN_SAMP_KDTREE_SIZE      = "+this.UN_SAMP_KDTREE_SIZE      );
}





PixelVoronoi_KdTree.prototype.delete = function(){
  var gl = this.CTX.gl;
  gl.deleteTexture(this.HANDLE_tex_kdtree); this.HANDLE_tex_kdtree = null;
  gl.deleteBuffer (this.HANDLE_vbo_screen); this.HANDLE_vbo_screen = null;
  this.shader_dis.delete(); this.HANDLE_shader_dis = null;

  this.fbo.delete();
  this.screenquad.delete();
}




PixelVoronoi_KdTree.prototype.resize = function(scale){
  var gl = this.CTX.gl;
  var w = this.CTX.VIEWPORT.width;
  var h = this.CTX.VIEWPORT.height;
  //  console.log("resizing voronoi "+w+", "+h);

  // SCREEN QUAD (height is mirrored!)
  var screenquad = new Float32Array(  [  -1, -1,   0, h, // x,y, s,t ... no matrix needed
                                         -1, +1,   0, 0,
                                         +1, -1,   w, h,
                                         +1, +1,   w, 0   ]);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo_screen);
  gl.bufferData(gl.ARRAY_BUFFER, screenquad, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  this.fbo.resize(w, h, scale);
}


PixelVoronoi_KdTree.prototype.setKdTreeTexture = function(){

  // TODO i'm not sure if resizing textures is causing a memory-leak!

  var gl = this.CTX.gl;

  this.num_nodes = this.kdtree.kd_tree.length;
  var tex_w      = Math.min(Math.max(this.num_nodes,1), this.GL_MAX_TEXTURE_SIZE);
  var tex_h      = Math.floor((this.num_nodes+tex_w-1)/tex_w);
  var tex_size_new  = new Float32Array([tex_w, tex_h]);

  if( this.tex_size[0] != tex_size_new[0] ||
      this.tex_size[1] != tex_size_new[1])
  {
    gl.deleteTexture(this.HANDLE_tex_kdtree);
    this.HANDLE_tex_kdtree = gl.createTexture();
  }


  var w = this.tex_size[0] = tex_size_new[0];
  var h = this.tex_size[1] = tex_size_new[1];
  var tex_data = this.kdtree.uint8Array;

  gl.bindTexture   ( gl.TEXTURE_2D, this.HANDLE_tex_kdtree);
  {
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE ) ;
    gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE ) ;
    gl.texImage2D   ( gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex_data );
  }
  gl.bindTexture   ( gl.TEXTURE_2D, null);

}



PixelVoronoi_KdTree.prototype.createDistanceMap = function(){

  if( this.IN_VEC2_POSITION==undefined){
    return;
  }

  var gl = this.CTX.gl;

//  this.num_nodes = this.kdtree.kd_tree.length;
//  var tex_w     = Math.min(Math.max(this.num_nodes,1), this.GL_MAX_TEXTURE_SIZE);
//  var tex_h     = Math.floor((this.num_nodes+tex_w-1)/tex_w);
//  this.tex_size  = new Float32Array([tex_w, tex_h]);

  this.setKdTreeTexture();

  this.fbo.bind();

  gl.useProgram(this.HANDLE_shader_dis);
  {
    // set kdtree texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture  (gl.TEXTURE_2D, this.HANDLE_tex_kdtree );
    gl.uniform1i    (this.UN_SAMP_KDTREE, 0);
    // apply kd-tree to texture
//    gl.texImage2D ( gl.TEXTURE_2D, 0, gl.RGBA, tex_w, tex_h, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.kdtree.uint8Array );

    gl.uniform2fv( this.UN_SAMP_KDTREE_SIZE, this.tex_size );
    gl.uniform1i ( this.UN_SAMP_NUM_KDTREENODES, this.num_nodes);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.HANDLE_vbo_screen);
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

  this.fbo.unbind();
}


PixelVoronoi_KdTree.prototype.render = function(invert){
  this.screenquad.render(this.fbo.HANDLE_texture, invert, this.kdtree.points.length);
}
