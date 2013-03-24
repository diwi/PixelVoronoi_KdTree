
precision mediump float;

attribute vec2 IN_VEC2_POSITION;
attribute vec2 IN_VEC2_ST;

varying vec2 VRY_VEC2_ST;

void main(void)
{
  VRY_VEC2_ST = IN_VEC2_ST;
  gl_Position = vec4(IN_VEC2_POSITION,0,1); // no need for transformation when pos is in ndc.
}
