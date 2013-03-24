/**
 * project: ...
 * author: thomas diewald
 * date:   09.02.12
 */



var DwVec2 = DwVec2 || {};



DwVec2.nullvector = function () {
  return [0, 0];
}

DwVec2.copy_ref = function (a, dst) {
  dst[0] = a[0];
  dst[1] = a[1];
};

DwVec2.copy_new = function (a) {
  return [a[0], a[1]];
};


DwVec2.equals = function (a, b) {
  return (a[0] === b[0] && a[1] === b[1] );
};


DwVec2.add_ref = function (a, b, dst) {
  dst[0] = a[0]+b[0];  dst[1] = a[1]+b[1];
};
DwVec2.add_new = function (a, b) {
  return [(a[0]+b[0]),  (a[1]+b[1])];
};


DwVec2.sub_ref = function (a, b, dst) {
  dst[0] = a[0]-b[0];   dst[1] = a[1]-b[1];
};
DwVec2.sub_new = function (a, b) {
  return [(a[0]-b[0]),  (a[1]-b[1])];
};


DwVec2.line_midpoint_ref = function (a, b, dst) {
  dst[0] = (a[0] + b[0]) * 0.5;
  dst[1] = (a[1] + b[1]) * 0.5;
};
DwVec2.line_midpoint_new = function (a, b) {
  return [(a[0]+b[0])*0.5, (a[1]+b[1])*0.5];
};

DwVec2.triangle_midpoint_ref = function (a, b, c, dst) {
  var f = 1/3;
  dst[0] = (a[0]+b[0]+c[0]) * f;
  dst[1] = (a[1]+b[1]+c[1]) * f;
};
DwVec2.triangle_midpoint_new = function (a, b, c) {
  var f = 1/3;
  return [(a[0]+b[0]+c[0]) * f, (a[1]+b[1]+c[1]) * f];
};


DwVec2.sum_ref = function(a, b, c, dst){
  dst[0] = a[0]+b[0]+c[0];
  dst[1] = a[1]+b[1]+c[1];
}
DwVec2.sum_new = function(a, b, c){
  return [a[0]+b[0]+c[0],  a[1]+b[1]+c[1]];
}


DwVec2.sumlist_ref = function(arr, dst){
  var len = arr.length;
  for(var i = 0; i < len; i++){
    dst[0] += arr[i][0];
    dst[1] += arr[i][1];
  }
}

DwVec2.sumlist_new = function(arr){
  var dst = [];
  var len = arr.length;
  for(var i = 0; i < len; i++){
    dst[0] += arr[i][0];
    dst[1] += arr[i][1];
  }
  return dst;
}






DwVec2.multiply_ref = function (a, b, dst) {
  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
};
DwVec2.multiply_new = function (a, b) {
  return [a[0]*b[0], a[1]*b[1]];
};



DwVec2.negate_ref = function (a, dst) {
  dst[0] = -a[0];
  dst[1] = -a[1];
};
DwVec2.negate_ref_slf = function (a) {
  a[0] = -a[0];
  a[1] = -a[1];
};
DwVec2.negate_new = function (a) {
  return [-a[0], -a[1]];
};



DwVec2.scale_ref = function (a, val, dst) {
  dst[0] = a[0] * val;
  dst[1] = a[1] * val;
};
DwVec2.scale_ref_slf = function (a, val) {
  a[0] *= val;
  a[1] *= val;
};
DwVec2.scale_new = function (a, val) {
  return [a[0] * val, a[1] * val];
};



DwVec2.normalize_ref_slf = function (a) {
  var x = a[0], y = a[1];
  var len = Math.sqrt(x*x + y*y);

  if (len != 1) {
    len = 1 / len;
    a[0] *= len;
    a[1] *= len;
  }
};
DwVec2.normalize_ref = function (a, dst) {
  var x = a[0], y = a[1];
  var len = Math.sqrt(x*x + y*y);

  if (!len) {
    dst[0] = 0;
    dst[1] = 0;
  } else if (len === 1) {
    dst[0] = x;
    dst[1] = y;
  } else {
    len = 1 / len;
    dst[0] = x * len;
    dst[1] = y * len;
  }
};
DwVec2.normalize_new = function (a) {
  var x = a[0], y = a[1];
  var len = Math.sqrt(x*x + y*y);

  if (!len) {
    return [0, 0, 0];
  } else if (len === 1) {
    return [x, y];
  } else {
    return [x*len, y*len];
  }
};


//DwVec2.cross_ref = function (a, b, dst) {
//  var ax = a[0], ay = a[1], az = a[2];
//  var bx = b[0], by = b[1], bz = b[2];
//
//  dst[0] = ay * bz - az * by;
//  dst[1] = az * bx - ax * bz;
//  dst[2] = ax * by - ay * bx;
//};
//DwVec2.cross_new = function (a, b) {
//  var ax = a[0], ay = a[1], az = a[2];
//  var bx = b[0], by = b[1], bz = b[2];
//
//  return [ay*bz - az*by, az*bx - ax*bz, ax*by - ay*bx];
//};



DwVec2.dot = function (a, b) {
  return a[0]*b[0] + a[1]*b[1];
};



DwVec2.angleBetween = function(a, b){
  return  Math.acos( DwVec2.dot(a,b)/(DwVec2.mag(a)*DwVec2.mag(b)) );
}
DwVec2.angleBetween_unit = function(a, b){
  return  Math.acos( DwVec2.dot(a,b) );
}



DwVec2.mag = function (a) {
  var x = a[0], y = a[1];
  return Math.sqrt(x*x + y*y);
};
DwVec2.mag_sq = function (a) {
  var x = a[0], y = a[1];
  return x*x + y*y;
};







DwVec2.dir_unit_ref = function (a, b, dst) {
  DwVec2.sub_ref(a, b, dst);
  DwVec2.normalize_ref_slf(dst);
};

DwVec2.dir_unit_new = function (a, b) {
  var dst = [];
  DwVec2.sub_ref(a, b, dst);
  DwVec2.normalize_ref_slf(dst);
  return dst;
};



DwVec2.lerp_ref = function (a, b, val, dst) {
  dst[0] = a[0] + val * (b[0] - a[0]);
  dst[1] = a[1] + val * (b[1] - a[1]);
};

DwVec2.lerp_new = function (a, b, val) {
  return [a[0]+val*(b[0]-a[0]), a[1]+val*(b[1]-a[1])];
};


DwVec2.dist = function (a, b) {
  var dst = DwVec2.sub_new(a, b);
  return DwVec2.mag(dst);
};



DwVec2.toStr = function (a, prec) {
  prec = prec || 5;
  return "["+a[0].toFixed(prec)+", "+a[1].toFixed(prec)+"]";
};


DwVec2.toIntStr = function (a) {
  return "["+a[0]+", "+a[1]+"]";
};


