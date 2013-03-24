

precision mediump float;

uniform sampler2D UN_SAMP_TEXTURE;
uniform int  UN_INT_RGB_INVERT;
uniform vec3 UN_VEC3_RGB_SCALE;
varying vec2 VRY_VEC2_ST;


void main(void){

  float dis = texture2D (UN_SAMP_TEXTURE, VRY_VEC2_ST).r;
  vec3  rgb = UN_VEC3_RGB_SCALE * dis;

  if( UN_INT_RGB_INVERT == 1 ){
    rgb = 1.0-rgb;
  }

  gl_FragColor = vec4(rgb, 1.0);
}


