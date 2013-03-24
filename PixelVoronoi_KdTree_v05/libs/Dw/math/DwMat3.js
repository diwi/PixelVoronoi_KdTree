/**
 * project: ...
 * author: thomas diewald
 * date:   09.02.12
 */

var DwMat3 = DwMat3 || {};


DwMat3.nullmatrix = function(){
  return [0,0,0, 0,0,0,  0,0,0];
}


DwMat3.copy_ref = function(m3, dst) {
  dst[0] = m3[0]; dst[3] = m3[3]; dst[6] = m3[6];
  dst[1] = m3[1]; dst[4] = m3[4]; dst[7] = m3[7];
  dst[2] = m3[2]; dst[5] = m3[5]; dst[8] = m3[8];
};
DwMat3.copy_new = function(m3) {
  return [m3[0], m3[1], m3[2],  m3[3], m3[4], m3[5],  m3[6], m3[7], m3[8]  ];
};



DwMat3.identity_ref = function (dst) {
  dst[0] = 1; dst[3] = 0; dst[6] = 0;
  dst[1] = 0; dst[4] = 1; dst[7] = 0;
  dst[2] = 0; dst[5] = 0; dst[8] = 1;
};
DwMat3.identity_new = function () {
  return [1,0,0, 0,1,0,  0,0,1];
};



DwMat3.transpose_ref = function (m3, dst) {
  dst[0] = m3[0];  dst[3] = m3[1];  dst[6] = m3[2];
  dst[1] = m3[3];  dst[4] = m3[4];  dst[7] = m3[5];
  dst[2] = m3[6];  dst[5] = m3[7];  dst[8] = m3[8];
};

DwMat3.transpose_ref_slf = function (dst) {
  var a01 = dst[1], a02 = dst[2], a12 = dst[5];
  dst[1] = dst[3];
  dst[2] = dst[6];
  dst[3] = a01;
  dst[5] = dst[7];
  dst[6] = a02;
  dst[7] = a12;
};

DwMat3.transpose_new = function (m3) {
  return [ m3[0], m3[3], m3[6],   m3[1], m3[4], m3[7],   m3[2], m3[5], m3[8]  ];
};




DwMat3.toMat4_ref = function (m3, dst_m4) {
  dst_m4[ 0] = m3[0];  dst_m4[ 4] = m3[3];  dst_m4[ 8] = m3[6];  dst_m4[12] = 0;
  dst_m4[ 1] = m3[1];  dst_m4[ 5] = m3[4];  dst_m4[ 9] = m3[7];  dst_m4[13] = 0;
  dst_m4[ 2] = m3[2];  dst_m4[ 6] = m3[5];  dst_m4[10] = m3[8];  dst_m4[14] = 0;
  dst_m4[ 3] = 0;      dst_m4[ 7] = 0;      dst_m4[11] = 0;       dst_m4[15] = 1;
};
DwMat3.toMat4_new = function (m3) {
  return [m3[0], m3[1], m3[2], 0,   m3[3], m3[4], m3[5], 0,   m3[6], m3[7], m3[8],  0,  0, 0, 0, 1];
};


DwMat3.getAxisX_ref = function (m3, v3_x) {
  v3_x[0] = m3[0];
  v3_x[1] = m3[1];
  v3_x[2] = m3[2];
};
DwMat3.getAxisX_new = function (m3) {
  return [m3[0], m3[1], m3[2]];
};


DwMat3.getAxisY_ref = function (m3, v3_y) {
  v3_y[0] = m3[3];
  v3_y[1] = m3[4];
  v3_y[2] = m3[5];
};
DwMat3.getAxisY_new = function (m3) {
  return [m3[3], m3[4], m3[5]];
};


DwMat3.getAxisZ_ref = function (m3, v3_z) {
  v3_z[0] = m3[6];
  v3_z[1] = m3[7];
  v3_z[2] = m3[8];
};
DwMat3.getAxisZ_new = function (m3) {
  return [m3[6], m3[7], m3[8]];
};

DwMat3.getAisXYZ_ref = function (m3, v3_x, v3_y, v3_z) {
  v3_x[0] = m3[0];  v3_y[0] = m3[4];  v3_z[0] = m3[ 8];
  v3_x[1] = m3[1];  v3_y[1] = m3[5];  v3_z[1] = m3[ 9];
  v3_x[2] = m3[2];  v3_y[2] = m3[6];  v3_z[2] = m3[10];
};



DwMat3.setAxisX = function (m3, v3_x) {
  m3[0] = v3_x[0];
  m3[1] = v3_x[1];
  m3[2] = v3_x[2];
};
DwMat3.setAxisY = function (m3, v3_y) {
  m3[3] = v3_y[0];
  m3[4] = v3_y[1];
  m3[5] = v3_y[2];
};
DwMat3.setAxisZ = function (m3, v3_z) {
  m3[6] = v3_z[0];
  m3[7] = v3_z[1];
  m3[8] = v3_z[2];
};
DwMat3.setAxisXYZ_ref = function (m3, v3_x, v3_y, v3_z) {
  m3[0] = v3_x[0];  m3[3] = v3_y[0];  m3[6] = v3_z[0];
  m3[1] = v3_x[1];  m3[4] = v3_y[1];  m3[7] = v3_z[1];
  m3[2] = v3_x[2];  m3[5] = v3_y[2];  m3[8] = v3_z[2];
};










DwMat3.inverse_ref = function (m3, dst_m3) {
  var
    a00 = m3[0], a10 = m3[3], a20 = m3[6],
    a01 = m3[1], a11 = m3[4], a21 = m3[7],
    a02 = m3[2], a12 = m3[5], a22 = m3[8];
  var
    b01 =  a22 * a11 - a12 * a21,
    b11 = -a22 * a10 + a12 * a20,
    b21 =  a21 * a10 - a11 * a20;

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det)
    return null;
  var det_inv = 1 / det;

  dst_m3[0] = det_inv *  ( b01);
  dst_m3[1] = det_inv *  (-a22 * a01 + a02 * a21);
  dst_m3[2] = det_inv *  ( a12 * a01 - a02 * a11);

  dst_m3[3] = det_inv *  ( b11);
  dst_m3[4] = det_inv *  ( a22 * a00 - a02 * a20);
  dst_m3[5] = det_inv *  (-a12 * a00 + a02 * a10);

  dst_m3[6] = det_inv *  ( b21) ;
  dst_m3[7] = det_inv *  (-a21 * a00 + a01 * a20);
  dst_m3[8] = det_inv *  ( a11 * a00 - a01 * a10);
};

DwMat3.inverse_ref_slf = function (m3) {
  var
    a00 = m3[0], a10 = m3[3], a20 = m3[6],
    a01 = m3[1], a11 = m3[4], a21 = m3[7],
    a02 = m3[2], a12 = m3[5], a22 = m3[8];
  var
    b01 =  a22 * a11 - a12 * a21,
    b11 = -a22 * a10 + a12 * a20,
    b21 =  a21 * a10 - a11 * a20;

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det)
    return null;
  var det_inv = 1 / det;

  m3[0] = det_inv *  ( b01);
  m3[1] = det_inv *  (-a22 * a01 + a02 * a21);
  m3[2] = det_inv *  ( a12 * a01 - a02 * a11);

  m3[3] = det_inv *  ( b11);
  m3[4] = det_inv *  ( a22 * a00 - a02 * a20);
  m3[5] = det_inv *  (-a12 * a00 + a02 * a10);

  m3[6] = det_inv *  ( b21) ;
  m3[7] = det_inv *  (-a21 * a00 + a01 * a20);
  m3[8] = det_inv *  ( a11 * a00 - a01 * a10);
};


DwMat3.inverse_new = function (m3) {
  var dst_m3 = new Array(9);
  DwMat3.inverse_ref(m3, dst_m3);
  return dst_m3;
};


DwMat3.inverseTranspose_ref = function (m3, dst_m3) {
  var
    a00 = m3[0], a10 = m3[3], a20 = m3[6],
    a01 = m3[1], a11 = m3[4], a21 = m3[7],
    a02 = m3[2], a12 = m3[5], a22 = m3[8];
  var
    b01 =  a22 * a11 - a12 * a21,
    b11 = -a22 * a10 + a12 * a20,
    b21 =  a21 * a10 - a11 * a20;

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det)
    return null;

  var det_inv = 1 / det;

  dst_m3[0] = det_inv *  ( b01);
  dst_m3[3] = det_inv *  (-a22 * a01 + a02 * a21);
  dst_m3[6] = det_inv *  ( a12 * a01 - a02 * a11);

  dst_m3[1] = det_inv *  ( b11);
  dst_m3[4] = det_inv *  ( a22 * a00 - a02 * a20);
  dst_m3[7] = det_inv *  (-a12 * a00 + a02 * a10);

  dst_m3[2] = det_inv *  ( b21) ;
  dst_m3[5] = det_inv *  (-a21 * a00 + a01 * a20);
  dst_m3[8] = det_inv *  ( a11 * a00 - a01 * a10);
};
DwMat3.inverseTranspose_ref_slf = function (m3) {
  var
    a00 = m3[0], a10 = m3[3], a20 = m3[6],
    a01 = m3[1], a11 = m3[4], a21 = m3[7],
    a02 = m3[2], a12 = m3[5], a22 = m3[8];
  var
    b01 =  a22 * a11 - a12 * a21,
    b11 = -a22 * a10 + a12 * a20,
    b21 =  a21 * a10 - a11 * a20;

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det)
    return null;

  var det_inv = 1 / det;

  m3[0] = det_inv *  ( b01);
  m3[3] = det_inv *  (-a22 * a01 + a02 * a21);
  m3[6] = det_inv *  ( a12 * a01 - a02 * a11);

  m3[1] = det_inv *  ( b11);
  m3[4] = det_inv *  ( a22 * a00 - a02 * a20);
  m3[7] = det_inv *  (-a12 * a00 + a02 * a10);

  m3[2] = det_inv *  ( b21) ;
  m3[5] = det_inv *  (-a21 * a00 + a01 * a20);
  m3[8] = det_inv *  ( a11 * a00 - a01 * a10);
};

DwMat3.inverseTranspose_new = function (m3) {
  var dst_m3 = new Array(9);
  DwMat3.inverseTranspose_ref(m3, dst_m3);
  return dst_m3;
};







DwMat3.toStr = function (m3, prec) {
  prec = prec || 5;
  return (
    "[\n"+
      +m3[0].toFixed(prec)+", "+m3[3].toFixed(prec)+", "+m3[6].toFixed(prec)+",\n"+
      +m3[1].toFixed(prec)+", "+m3[4].toFixed(prec)+", "+m3[7].toFixed(prec)+",\n"+
      +m3[2].toFixed(prec)+", "+m3[5].toFixed(prec)+", "+m3[8].toFixed(prec)+"\n];"
    );
};
