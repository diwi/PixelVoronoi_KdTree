/**
 * project: ...
 * author: thomas diewald
 * date:   10.02.12
 */


var DwPlane3D = DwPlane3D || {};

//TODO: a lot




DwPlane3D.nullplane = function(){
  return [0, 0, 0, 0];
}

DwPlane3D.yz = function(){
  return [1, 0, 0, 0];
}
DwPlane3D.xz = function(){
  return [0, 1, 0, 0];
}
DwPlane3D.xy = function(){
  return [0, 0, 1, 0];
}

DwPlane3D.setNormals_ref = function(n_v3, dst_p){
  dst_p[0] = n_v3[0];
  dst_p[1] = n_v3[1];
  dst_p[2] = n_v3[2];
}
DwPlane3D.setNormals_new = function(n_v3){
  return [n_v3[0], n_v3[1], n_v3[2], 0];
}


DwPlane3D.setOffset_ref = function(o_f, dst_p){
  dst_p[3] = o_f;
}


DwPlane3D.normalize_ref = function(p, dst_p){
  var nx = p[0], ny = p[1], nz = p[2], o = p[3];
  var dot = nx*nx + ny*ny + nz*nz;
  var len_inv = 1/Math.sqrt(dot);

  dst_p[0] = nx*len_inv;
  dst_p[1] = ny*len_inv;
  dst_p[2] = nz*len_inv;
  dst_p[3] =  o*len_inv;
}
DwPlane3D.normalize_ref_slf = function(p){
  var nx = p[0], ny = p[1], nz = p[2], o = p[3];
  var dot = nx*nx + ny*ny + nz*nz;
  var len_inv = 1/Math.sqrt(dot);

  p[0] *= len_inv;
  p[1] *= len_inv;
  p[2] *= len_inv;
  p[3] *= len_inv;
}
DwPlane3D.normalize_new = function(p){
  var nx = p[0], ny = p[1], nz = p[2], o = p[3];
  var dot = nx*nx + ny*ny + nz*nz;
  var len_inv = 1/Math.sqrt(dot);
  return[nx*len_inv, ny*len_inv, nz*len_inv, o*len_inv];
}


DwPlane3D.toStr = function (p) {
  return "[plane n_xyz,o:"+p[0]+", "+p[1]+", "+p[2]+", "+p[3]+"]";
};
