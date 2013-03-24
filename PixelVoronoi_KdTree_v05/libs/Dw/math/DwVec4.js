/**
 * project: ...
 * author: thomas diewald
 * date:   25.02.12
 */



var DwVec4 = DwVec4 || {};



DwVec4.nullvector = function () {
  return [0, 0, 0, 0];
}


DwVec4.copy_ref = function (a, dst) {
  dst[0] = a[0];
  dst[1] = a[1];
  dst[2] = a[2];
  dst[3] = a[3];
};

DwVec4.copy_new = function (a) {
  return [a[0], a[1], a[2], a[3]];
};


DwVec4.equals = function (a, b) {
  return (a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]);
};






//DwVec3.add_ref = function (a, b, dst) {
//  dst[0] = a[0]+b[0];  dst[1] = a[1]+b[1];   dst[2] = a[2]+b[2];
//};
//DwVec3.add_new = function (a, b) {
//  return [(a[0]+b[0]),  (a[1]+b[1]),   (a[2]+b[2])];
//};
//
//
//DwVec3.sub_ref = function (a, b, dst) {
//  dst[0] = a[0]-b[0];   dst[1] = a[1]-b[1];  dst[2] = a[2]-b[2];
//};
//DwVec3.sub_new = function (a, b) {
//  return [(a[0]-b[0]),  (a[1]-b[1]),  (a[2]-b[2])];
//};
//
//
//DwVec3.line_midpoint_ref = function (a, b, dst) {
//  dst[0] = (a[0] + b[0]) * 0.5;
//  dst[1] = (a[1] + b[1]) * 0.5;
//  dst[2] = (a[2] + b[2]) * 0.5;
//};
//DwVec3.line_midpoint_new = function (a, b) {
//  return [(a[0]+b[0])*0.5, (a[1]+b[1])*0.5, (a[2]+b[2])*0.5];
//};
//
//DwVec3.triangle_midpoint_ref = function (a, b, c, dst) {
//  var f = 1/3;
//  dst[0] = (a[0]+b[0]+c[0]) * f;
//  dst[1] = (a[1]+b[1]+c[1]) * f;
//  dst[2] = (a[2]+b[2]+c[2]) * f;
//};
//DwVec3.triangle_midpoint_new = function (a, b, c) {
//  var f = 1/3;
//  return [(a[0]+b[0]+c[0]) * f, (a[1]+b[1]+c[1]) * f, (a[2]+b[2]+c[2]) * f];
//};
//
//
//DwVec3.sum_ref = function(a, b, c, dst){
//  dst[0] = a[0]+b[0]+c[0];
//  dst[1] = a[1]+b[1]+c[1];
//  dst[2] = a[2]+b[2]+c[2];
//}
//DwVec3.sum_new = function(a, b, c){
//  return [a[0]+b[0]+c[0],  a[1]+b[1]+c[1], a[2]+b[2]+c[2]];
//}
//
//
//DwVec3.sumlist_ref = function(arr, dst){
//  var len = arr.length;
//  for(var i = 0; i < len; i++){
//    dst[0] += arr[i][0];
//    dst[1] += arr[i][1];
//    dst[2] += arr[i][2];
//  }
//}
//
//DwVec3.sumlist_new = function(arr){
//  var dst = [];
//  var len = arr.length;
//  for(var i = 0; i < len; i++){
//    dst[0] += arr[i][0];
//    dst[1] += arr[i][1];
//    dst[2] += arr[i][2];
//  }
//  return dst;
//}
//
//
//
//
//
//
DwVec4.multiply_ref = function (a, b, dst) {
  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
  dst[2] = a[2] * b[2];
  dst[3] = a[3] * b[3];
};
DwVec4.multiply_new = function (a, b) {
  return [a[0]*b[0], a[1]*b[1], a[2]*b[2], a[3]*b[3]];
};




//DwVec3.negate_ref = function (a, dst) {
//  dst[0] = -a[0];
//  dst[1] = -a[1];
//  dst[2] = -a[2];
//};
//DwVec3.negate_ref_slf = function (a) {
//  a[0] = -a[0];
//  a[1] = -a[1];
//  a[2] = -a[2];
//};
//DwVec3.negate_new = function (a) {
//  return [-a[0], -a[1], -a[2]];
//};
//
//
//
//DwVec3.scale_ref = function (a, val, dst) {
//  dst[0] = a[0] * val;
//  dst[1] = a[1] * val;
//  dst[2] = a[2] * val;
//};
//DwVec3.scale_ref_slf = function (a, val) {
//  a[0] *= val;
//  a[1] *= val;
//  a[2] *= val;
//};
//DwVec3.scale_new = function (a, val) {
//  return [a[0] * val, a[1] * val, a[2] * val];
//};
//
//
//
//DwVec3.normalize_ref_slf = function (a) {
//  var x = a[0], y = a[1], z = a[2];
//  var len = Math.sqrt(x*x + y*y + z*z);
//
//  if (len != 1) {
//    len = 1 / len;
//    a[0] *= len;
//    a[1] *= len;
//    a[2] *= len;
//  }
//};
//DwVec3.normalize_ref = function (a, dst) {
//  var x = a[0], y = a[1], z = a[2];
//  var len = Math.sqrt(x * x + y * y + z * z);
//
//  if (!len) {
//    dst[0] = 0;
//    dst[1] = 0;
//    dst[2] = 0;
//  } else if (len === 1) {
//    dst[0] = x;
//    dst[1] = y;
//    dst[2] = z;
//  } else {
//    len = 1 / len;
//    dst[0] = x * len;
//    dst[1] = y * len;
//    dst[2] = z * len;
//  }
//};
//DwVec3.normalize_new = function (a) {
//  var x = a[0], y = a[1], z = a[2];
//  var len = Math.sqrt(x * x + y * y + z * z);
//
//  if (!len) {
//    return [0, 0, 0];
//  } else if (len === 1) {
//    return [x, y, z];
//  } else {
//    return [x*len, y*len, z*len];
//  }
//};
//
//
//DwVec3.cross_ref = function (a, b, dst) {
//  var ax = a[0], ay = a[1], az = a[2];
//  var bx = b[0], by = b[1], bz = b[2];
//
//  dst[0] = ay * bz - az * by;
//  dst[1] = az * bx - ax * bz;
//  dst[2] = ax * by - ay * bx;
//};
//DwVec3.cross_new = function (a, b) {
//  var ax = a[0], ay = a[1], az = a[2];
//  var bx = b[0], by = b[1], bz = b[2];
//
//  return [ay*bz - az*by, az*bx - ax*bz, ax*by - ay*bx];
//};
//
//
//
//DwVec3.dot = function (a, b) {
//  return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
//};
//
//
//
//DwVec3.angleBetween = function(a, b){
//  return  Math.acos( DwVec3.dot(a,b)/(DwVec3.mag(a)*DwVec3.mag(b)) );
//}
//DwVec3.angleBetween_unit = function(a, b){
//  return  Math.acos( DwVec3.dot(a,b) );
//}
//
//
//
//DwVec3.mag = function (a) {
//  var x = a[0], y = a[1], z = a[2];
//  return Math.sqrt(x*x + y*y + z*z);
//};
//DwVec3.mag_sq = function (a) {
//  var x = a[0], y = a[1], z = a[2];
//  return x*x + y*y + z*z;
//};
//
//
//
//
//
//
//
//DwVec3.dir_unit_ref = function (a, b, dst) {
//  DwVec3.sub_ref(a, b, dst);
//  DwVec3.normalize_ref_slf(dst);
//};
//
//DwVec3.dir_unit_new = function (a, b) {
//  var dst = [];
//  DwVec3.sub_ref(a, b, dst);
//  DwVec3.normalize_ref_slf(dst);
//  return dst;
//};
//
//
//
//DwVec3.lerp_ref = function (a, b, val, dst) {
//  dst[0] = a[0] + val * (b[0] - a[0]);
//  dst[1] = a[1] + val * (b[1] - a[1]);
//  dst[2] = a[2] + val * (b[2] - a[2]);
//};
//
//DwVec3.lerp_new = function (a, b, val) {
//  return [a[0]+val*(b[0]-a[0]), a[1]+val*(b[1]-a[1]), a[2]+val*(b[2]-a[2])];
//};
//
//
//DwVec3.dist = function (a, b) {
//  var dst = DwVec3.sub_new(a, b);
//  return DwVec3.mag(dst);
//};
//
//
//
//DwVec3.toStr = function (a, prec) {
//  prec = prec || 5;
//  return "["+a[0].toFixed(prec)+", "+a[1].toFixed(prec)+", "+a[2].toFixed(prec)+"]";
//};
//
//
//DwVec3.toIntStr = function (a) {
//  return "["+a[0]+", "+a[1]+", "+a[2]+"]";
//};
