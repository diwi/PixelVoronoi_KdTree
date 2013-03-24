/**
 * project: ...
 * author: thomas diewald
 * date:   10.02.12
 */

/**
 *  general:
 *  m4 = (mat4x4) projection matrix
 *  p =  ([x, y, z, o]) plane3D
 */

var DwClippingPlane3D = DwClippingPlane3D || {};


DwClippingPlane3D.near_ref = function(m4, p){
  p[0] = m4[ 3] + m4[ 2];
  p[1] = m4[ 7] + m4[ 6];
  p[2] = m4[11] + m4[10];
  p[3] = m4[15] + m4[14];
}
DwClippingPlane3D.near_new = function(m4){
  return [m4[ 3] + m4[ 2],
          m4[ 7] + m4[ 6],
          m4[11] + m4[10],
          m4[15] + m4[14]];
}


DwClippingPlane3D.far_ref = function(m4, p){
  p[0] = m4[ 3] - m4[ 2];
  p[1] = m4[ 7] - m4[ 6];
  p[2] = m4[11] - m4[10];
  p[3] = m4[15] - m4[14];
}
DwClippingPlane3D.far_new = function(m4){
  return [m4[ 3] - m4[ 2],
          m4[ 7] - m4[ 6],
          m4[11] - m4[10],
          m4[15] - m4[14]];
}


DwClippingPlane3D.left_ref = function(m4, p){
  p[0] = m4[ 3] + m4[ 0];
  p[1] = m4[ 7] + m4[ 4];
  p[2] = m4[11] + m4[ 8];
  p[3] = m4[15] + m4[12];
}
DwClippingPlane3D.left_new = function(m4){
  return [m4[ 3] + m4[ 0],
          m4[ 7] + m4[ 4],
          m4[11] + m4[ 8],
          m4[15] + m4[12]];
}


DwClippingPlane3D.right_ref = function(m4, p){
  p[0] = m4[ 3] - m4[ 0];
  p[1] = m4[ 7] - m4[ 4];
  p[2] = m4[11] - m4[ 8];
  p[3] = m4[15] - m4[12];
}
DwClippingPlane3D.right_new = function(m4){
  return
   [m4[ 3] - m4[ 0],
    m4[ 7] - m4[ 4],
    m4[11] - m4[ 8],
    m4[15] - m4[12]];
}


DwClippingPlane3D.bottom_ref = function(m4, p){
  p[0] = m4[ 3] + m4[ 1];
  p[1] = m4[ 7] + m4[ 5];
  p[2] = m4[11] + m4[ 9];
  p[3] = m4[15] + m4[13];
}
DwClippingPlane3D.bottom_new = function(m4){
  return [m4[ 3] + m4[ 1],
          m4[ 7] + m4[ 5],
          m4[11] + m4[ 9],
          m4[15] + m4[13]];
}


DwClippingPlane3D.top_ref = function(m4, p){
  p[0] = m4[ 3] - m4[ 1];
  p[1] = m4[ 7] - m4[ 5];
  p[2] = m4[11] - m4[ 9];
  p[3] = m4[15] - m4[13];
}
DwClippingPlane3D.top_new = function(m4){
  return [m4[ 3] - m4[ 1],
          m4[ 7] - m4[ 5],
          m4[11] - m4[ 9],
          m4[15] - m4[13]];
}
