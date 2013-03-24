
precision mediump float;

attribute vec2 IN_VEC2_POSITION;
attribute float IN_FLOAT_ALPHA;

uniform mat4 UN_MAT4_PROJECTION;

varying float VRY_AlPHA;


void main(void){
  VRY_AlPHA      = IN_FLOAT_ALPHA;
  gl_Position    = UN_MAT4_PROJECTION*vec4(IN_VEC2_POSITION, 0, 1);
}

