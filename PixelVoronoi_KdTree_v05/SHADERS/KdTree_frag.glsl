

precision mediump float;

uniform vec3 UN_VEC3_RGB;
varying float VRY_AlPHA;

void main(void){
  gl_FragColor = vec4(UN_VEC3_RGB, VRY_AlPHA);
}


