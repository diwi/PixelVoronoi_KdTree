//------------------------------------------------------------------------------
// author: thomas diewald
// date:  17.03.2013
//
// WebGL vertex shader: "PixelVoronoiKdTree_vert.glsl"
// for creating a pixel-based voronoi diagram.
// distance to nearest neighbor affects pixel-shading.
// nearest neighbor search is done by traversing a kd-tree.
//------------------------------------------------------------------------------

precision mediump float;

attribute vec2 IN_VEC2_POSITION;
attribute vec2 IN_VEC2_ST;

varying vec2 VRY_VEC2_ST;

void main(void)
{
  VRY_VEC2_ST = IN_VEC2_ST;
  gl_Position = vec4(IN_VEC2_POSITION,0,1); // no need for transformation when pos is in ndc.
}
