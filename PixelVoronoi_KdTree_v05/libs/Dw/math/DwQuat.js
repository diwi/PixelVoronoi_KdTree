/**
 * project: ...
 * author: thomas diewald
 * date:   10.02.12
 */



var DwQuat = DwQuat || {};



DwQuat.nullquat = function(){
  return [0, 0, 0, 0]; // [  x, y, z, angle]
}

DwQuat.identity_new = function(){
  return [0, 0, 0, 1]; // [ x, y, z, angle]
}

DwQuat.identity_ref = function(dst_q4){
  dst_q4[0] = 0;
  dst_q4[1] = 0;
  dst_q4[2] = 0;
  dst_q4[3] = 1;
}



DwQuat.fromVec3 = function(axis_v3, angle) {
  var norm = DwVec3.mag(axis_v3);

  var halfAngle = -0.5 * angle;
  var coeff = Math.sin(halfAngle) / norm;

  var dst_q = new Array(4);
  dst_q[0] = coeff * axis_v3[0];
  dst_q[1] = coeff * axis_v3[1];
  dst_q[2] = coeff * axis_v3[2];
  dst_q[3] = Math.cos(halfAngle);
  return dst_q;
}




DwQuat.copy_ref = function (q, dst_q) {
    dst_q[0] = q[0];
    dst_q[1] = q[1];
    dst_q[2] = q[2];
    dst_q[3] = q[3];
};
DwQuat.copy_new = function (q) {
  return [q[0], q[1], q[2], q[3]];
};



DwQuat.calculateW_ref = function (q, dst_q) {
  var x = q[0], y = q[1], z = q[2];
  dst_q[0] = x;
  dst_q[1] = y;
  dst_q[2] = z;
  dst_q[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
};
DwQuat.calculateW_ref_slf = function (q) {
  var x = q[0], y = q[1], z = q[2];
  q[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
};
DwQuat.calculateW_new = function (q) {
  var dst_q = new Array(4);
  var x = q[0], y = q[1], z = q[2];
  dst_q[0] = x;
  dst_q[1] = y;
  dst_q[2] = z;
  dst_q[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
  return dst_q;
};




DwQuat.dot = function(qA, qB){
  return qA[0]*qB[0] + qA[1]*qB[1] + qA[2]*qB[2] + qA[3]*qB[3];
};




DwQuat.inverse_ref = function(q, dst_q) {
  var x = q[0], y = q[1], z = q[2], w = q[2];

  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    return;
  }else if (dot === 1.0){
    dst_q[0] = -q[0]; dst_q[1] = -q[1]; dst_q[2] = -q[2]; dst_q[3] =  q[3];
    return;
  }
  var dot_inv = 1.0/dot;

  dst_q[0] = -x * dot_inv;
  dst_q[1] = -y * dot_inv;
  dst_q[2] = -z * dot_inv;
  dst_q[3] =  w * dot_inv;
};
DwQuat.inverse_ref_slf = function(q) {
  var x = q[0], y = q[1], z = q[2], w = q[2];

  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    return;
  }else if (dot === 1.0){
    q[0] = -q[0]; q[1] = -q[1];  q[2] = -q[2];
    return;
  }
  var dot_inv = 1.0/dot;

  q[0] *= -dot_inv;
  q[1] *= -dot_inv;
  q[2] *= -dot_inv;
  q[3] *=  dot_inv;
};
DwQuat.inverse_new = function(q) {
  var x = q[0], y = q[1], z = q[2], w = q[2];

  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    return DwQuat.copy_new(q);
  } else if (dot === 1.0){
    return [-x, -y, -z, w];
  }
  var dot_inv = 1.0/dot;

  return [-x*dot_inv, -y*dot_inv, -z*dot_inv, w*dot_inv];
};



DwQuat.conjugate_ref = function (q, dst_q){
  dst_q[0] = -q[0]; dst_q[1] = -q[1]; dst_q[2] = -q[2]; dst_q[3] =  q[3];
};
DwQuat.conjugate_ref_slf = function (q){
  q[0] = -q[0]; q[1] = -q[1];  q[2] = -q[2];
};
DwQuat.conjugate_new = function (q) {
  return [-q[0], -q[1], -q[2], q[3]];
};


DwQuat.length = function (q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
};



DwQuat.normalize_ref = function (q, dst_q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    dst_q[0] = 0; dst_q[1] = 0; dst_q[2] = 0; dst_q[3] = 0;
    return;
  }
  var len_inv = 1/ Math.sqrt(dot);
  dst_q[0] = x*len_inv;
  dst_q[1] = y*len_inv;
  dst_q[2] = z*len_inv;
  dst_q[3] = w*len_inv;
};
DwQuat.normalize_ref_slf = function (q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    return;
  }
  var len_inv = 1/ Math.sqrt(dot);
  q[0] *= len_inv;
  q[1] *= len_inv;
  q[2] *= len_inv;
  q[3] *= len_inv;
};
DwQuat.normalize_new = function (q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var dot = x*x + y*y + z*z + w*w;
  if( dot === 0){
    return [0, 0, 0, 0];
  }
  var len_inv = 1/ Math.sqrt(dot);
  return [x*len_inv, y*len_inv, z*len_inv, w*len_inv];
};



DwQuat.mult_ref = function (q1, q2, dst_q) {
  var x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  var x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];

  dst_q[0] = x1*w2 + w1*x2 + y1*z2 - z1*y2;
  dst_q[1] = y1*w2 + w1*y2 + z1*x2 - x1*z2;
  dst_q[2] = z1*w2 + w1*z2 + x1*y2 - y1*x2;
  dst_q[3] = w1*w2 - x1*x2 - y1*y2 - z1*z2;
};
DwQuat.mult_new = function (q1, q2) {
  var dst_q = new Array(4);
  var x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  var x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];

  dst_q[0] = x1*w2 + w1*x2 + y1*z2 - z1*y2;
  dst_q[1] = y1*w2 + w1*y2 + z1*x2 - x1*z2;
  dst_q[2] = z1*w2 + w1*z2 + x1*y2 - y1*x2;
  dst_q[3] = w1*w2 - x1*x2 - y1*y2 - z1*z2;
  return dst_q;
};




DwQuat.multVec3_ref = function (q, v3, dst_v3) {
  var vx = v3[0], vy = v3[1], vz = v3[2];
  var qx =  q[0], qy =  q[1], qz =  q[2], qw = q[3];

  // q * v3
  var
    ix =  qw*vx + qy*vz - qz*vy,
    iy =  qw*vy + qz*vx - qx*vz,
    iz =  qw*vz + qx*vy - qy*vx,
    iw = -qx*vx - qy*vy - qz*vz;

  // result * inverse quat
  dst_v3[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
  dst_v3[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
  dst_v3[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
};
DwQuat.multVec3_ref_slf = function (q, v3) {
  var vx = v3[0], vy = v3[1], vz = v3[2];
  var qx =  q[0], qy =  q[1], qz =  q[2], qw = q[3];

  // q * v3
  var
    ix =  qw*vx + qy*vz - qz*vy,
    iy =  qw*vy + qz*vx - qx*vz,
    iz =  qw*vz + qx*vy - qy*vx,
    iw = -qx*vx - qy*vy - qz*vz;

  // result * inverse quat
  v3[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
  v3[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
  v3[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
};
DwQuat.multVec3_new = function (q, v3) {
  var dst_v3 = new Array(3);
  var vx = v3[0], vy = v3[1], vz = v3[2];
  var qx =  q[0], qy =  q[1], qz =  q[2], qw = q[3];

    // q * v3
  var
    ix =  qw*vx + qy*vz - qz*vy,
    iy =  qw*vy + qz*vx - qx*vz,
    iz =  qw*vz + qx*vy - qy*vx,
    iw = -qx*vx - qy*vy - qz*vz;

  // result * inverse quat
  dst_v3[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
  dst_v3[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
  dst_v3[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
  return dst_v3;
};



DwQuat.toMat3_ref = function (q, dst_m3) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x+x, y2 = y+y, z2 = z+z;
  var
    xx = x*x2,  yy = y*y2,  wx = w*x2,
    xy = x*y2,  yz = y*z2,  wy = w*y2,
    xz = x*z2,  zz = z*z2,  wz = w*z2;

  dst_m3[0] = 1 - (yy + zz);   dst_m3[3] = xy - wz;         dst_m3[6] = xz + wy;
  dst_m3[1] = xy + wz;         dst_m3[4] = 1 - (xx + zz);   dst_m3[7] = yz - wx;
  dst_m3[2] = xz - wy;         dst_m3[5] = yz + wx;         dst_m3[8] = 1 - (xx + yy);
};
DwQuat.toMat3_new = function (q) {
  var dst_m3 = new Array(9);
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x+x, y2 = y+y, z2 = z+z;
  var
    xx = x*x2,  yy = y*y2,  wx = w*x2,
    xy = x*y2,  yz = y*z2,  wy = w*y2,
    xz = x*z2,  zz = z*z2,  wz = w*z2;

  dst_m3[0] = 1 - (yy + zz);   dst_m3[3] = xy - wz;         dst_m3[6] = xz + wy;
  dst_m3[1] = xy + wz;         dst_m3[4] = 1 - (xx + zz);   dst_m3[7] = yz - wx;
  dst_m3[2] = xz - wy;         dst_m3[5] = yz + wx;         dst_m3[8] = 1 - (xx + yy);
  return dst_m3;
};


DwQuat.toMat4_ref = function (q, dst_m4) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x+x, y2 = y+y, z2 = z+z;
  var
    xx = x*x2,  yy = y*y2,  wx = w*x2,
    xy = x*y2,  yz = y*z2,  wy = w*y2,
    xz = x*z2,  zz = z*z2,  wz = w*z2;

  dst_m4[0] = 1 - (yy + zz);   dst_m4[4] = xy - wz;        dst_m4[ 8] = xz + wy;        dst_m4[12] = 0;
  dst_m4[1] = xy + wz;         dst_m4[5] = 1 - (xx + zz);  dst_m4[ 9] = yz - wx;        dst_m4[13] = 0;
  dst_m4[2] = xz - wy;         dst_m4[6] = yz + wx;        dst_m4[10] = 1 - (xx + yy);  dst_m4[14] = 0;
  dst_m4[3] = 0;               dst_m4[7] = 0;              dst_m4[11] = 0;              dst_m4[15] = 1;
};
DwQuat.toMat4_ref = function (q) {
  var dst_m4 = new Array(16);
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x+x, y2 = y+y, z2 = z+z;
  var
    xx = x*x2,  yy = y*y2,  wx = w*x2,
    xy = x*y2,  yz = y*z2,  wy = w*y2,
    xz = x*z2,  zz = z*z2,  wz = w*z2;

  dst_m4[0] = 1 - (yy + zz);   dst_m4[4] = xy - wz;        dst_m4[ 8] = xz + wy;        dst_m4[12] = 0;
  dst_m4[1] = xy + wz;         dst_m4[5] = 1 - (xx + zz);  dst_m4[ 9] = yz - wx;        dst_m4[13] = 0;
  dst_m4[2] = xz - wy;         dst_m4[6] = yz + wx;        dst_m4[10] = 1 - (xx + yy);  dst_m4[14] = 0;
  dst_m4[3] = 0;               dst_m4[7] = 0;              dst_m4[11] = 0;              dst_m4[15] = 1;
  return dst_m4;
};



DwQuat.slerp_Version2_new = function(q1, q2, slerp) {
  var x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  var x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];

  var dot = x1*x2 + y1*y2 +z1*z2 +w1*w2;
  var theta    = Math.acos(dot);
  var sinTheta = Math.sin(theta);

  var faca, facb;
  if (sinTheta > 0.001) {
    faca = Math.sin((1.0 - slerp) * theta) / sinTheta;
    facb = Math.sin(       slerp  * theta) / sinTheta;
  } else {
    faca = 1.0 - slerp;
    facb =       slerp;
  }
  var quat_dst = [x1*faca + x2*facb,
                  y1*faca + y2*facb,
                  y1*faca + y2*facb,
                  w1*faca + w2*facb];
  return quat_dst;
}


// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

DwQuat.slerp_ref = function (q1, q2, slerp, dst_q4) {
  var x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  var x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];

  var dot = x1*x2 + y1*y2 +z1*z2 +w1*w2;
  if (Math.abs(dot) >= 1.0) {
    dst_q4[0] = x1;
    dst_q4[1] = y1;
    dst_q4[2] = y1;
    dst_q4[3] = w1;
    return ;
  }

  var dot_x_dot_inv = 1.0 - dot*dot;
  if (  dot_x_dot_inv  < 0.000001) {
    dst_q4[0] = x1*0.5 + x2*0.5;
    dst_q4[1] = y1*0.5 + y2*0.5;
    dst_q4[2] = y1*0.5 + y2*0.5;
    dst_q4[3] = w1*0.5 + w2*0.5;
    return;
  }
  var sinHalfTheta = Math.sqrt(dot_x_dot_inv);
  var halfTheta    = Math.acos(dot);
  var fac = halfTheta * slerp;
  var faca = Math.sin(halfTheta - fac) / sinHalfTheta;
  var facb = Math.sin(            fac) / sinHalfTheta;

  dst_q4[0] = x1*faca + x2*facb;
  dst_q4[1] = y1*faca + y2*facb;
  dst_q4[2] = y1*faca + y2*facb;
  dst_q4[3] = w1*faca + w2*facb;
};
DwQuat.slerp_new = function (q1, q2, slerp) {
  var x1 = q1[0], y1 = q1[1], z1 = q1[2], w1 = q1[3];
  var x2 = q2[0], y2 = q2[1], z2 = q2[2], w2 = q2[3];

  var dot = x1*x2 + y1*y2 +z1*z2 +w1*w2;
  if (Math.abs(dot) >= 1.0)
    return [x1, y1, z1, w1];

  var dot_x_dot_inv = 1.0 - dot*dot;
  if (  dot_x_dot_inv  < 0.000001)
    return [x1*0.5 + x2*0.5,  y1*0.5 + y2*0.5], z1*0.5 + z2*0.5, w1*0.5 + w2*0.5;

  var sinHalfTheta = Math.sqrt(dot_x_dot_inv);
  var halfTheta    = Math.acos(dot);
  var fac = halfTheta * slerp;
  var faca = Math.sin(halfTheta - fac) / sinHalfTheta;
  var facb = Math.sin(            fac) / sinHalfTheta;

  return [x1*faca + x2*facb, y1*faca + y2*facb, z1*faca + z2*facb, w1*faca + w2*facb];
};













DwQuat.fromEuler_new = function(order, alpha1, alpha2, alpha3) {
  var r1 = DwQuat.fromVec3(order[0], alpha1);
  var r2 = DwQuat.fromVec3(order[1], alpha2);
  var r3 = DwQuat.fromVec3(order[2], alpha3);

  DwQuat.mult_ref(r2, r3, r2);
  DwQuat.mult_ref(r1, r2, r1);
  var dst_q = r1;
  return dst_q;
}

DwQuat.fromEuler_ref = function(order, alpha1, alpha2, alpha3, dst_q4) {
  var r1 = DwQuat.fromVec3(order[0], alpha1);
  var r2 = DwQuat.fromVec3(order[1], alpha2);
  var r3 = DwQuat.fromVec3(order[2], alpha3);

  DwQuat.mult_ref(r3, r2, r2);
  DwQuat.mult_ref(r2, r1, dst_q4);
}



// no tested
DwQuat.getEulerAngles = function(order, rotation){
  if (order === DwRotationOrder.XYZ) {
    var v1 = DwQuat.apply_new       (rotation, [0, 0, 1]);
    var v2 = DwQuat.applyInverse_new(rotation, [1, 0, 0]); // var v2 = DwQuat.multVec3_new(rotation, [1, 0, 0]);
    if ((v2[2] < -0.9999999999) || (v2[2] > 0.9999999999)) {
      return [0, 0, 0]; //Throw exception
    }
    return [ Math.atan2(-v1[1], v1[2]),
             Math.asin ( v2[2]),
             Math.atan2(-v2[1], v2[0]) ];
  }
}


// TODO: compare to mult_new
DwQuat.apply_new = function(q, v3) {
  var dst_v3 = new Array(3);
  var vx = v3[0], vy = v3[1], vz = v3[2];
  var qx =  q[0], qy =  q[1], qz =  q[2], qw = q[3];

  var s  = qx*vx + qy*vy + qz*vz;
  var m0 = qw;

  dst_v3[0] = 2* (m0* (vx*m0 - (qy*vz - qz*vy)) + s*qx) - vx;
  dst_v3[1] = 2* (m0* (vy*m0 - (qz*vx - qx*vz)) + s*qy) - vy;
  dst_v3[2] = 2* (m0* (vz*m0 - (qx*vy - qy*vx)) + s*qz) - vz;
  return dst_v3;
}

DwQuat.applyInverse_new = function(q, v3) {
  var dst_v3 = new Array(3);
  var vx = v3[0], vy = v3[1], vz = v3[2];
  var qx =  q[0], qy =  q[1], qz =  q[2], qw = q[3];

  var s  = qx*vx + qy*vy + qz*vz;
  var m0 = -qw;

  dst_v3[0] = 2* (m0* (vx*m0 - (qy*vz - qz*vy)) + s*qx) - vx;
  dst_v3[1] = 2* (m0* (vy*m0 - (qz*vx - qx*vz)) + s*qy) - vy;
  dst_v3[2] = 2* (m0* (vz*m0 - (qx*vy - qy*vx)) + s*qz) - vz;
  return dst_v3;
}


DwQuat.toStr = function (q) {
  var prec = 5;
  return "[quat xyz,w:"+q[0].toFixed(prec)+", "+q[1].toFixed(prec)+", "+q[2].toFixed(prec)+", "+q[3].toFixed(prec)+"]";
};
