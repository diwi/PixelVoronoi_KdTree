/**
 * project: ...
 * author: thomas diewald
 * date:   15.04.13
 */

function QuickSelect(){

}



QuickSelect.prototype.sort = function(points, dim, left, right,  m) {
  if (points == null || points.length == 0) return;
  this.pts = points;
  this.dim = dim;
  this.quickfindFirstK(left, right, m);
}


QuickSelect.prototype.partitionX = function(left, right, pivot_idx) {
  var pivot = this.pts[pivot_idx].x;
  this.swap( right, pivot_idx); // Move pivot to end

  for (var i = pivot_idx = left; i < right; i++) {
//    console.log(this.pts[i].x);
    if (this.pts[i].x < pivot) {
      this.swap( pivot_idx++, i);
    }
  }
  this.swap( right, pivot_idx); // Move pivot to its final place
  return pivot_idx;
}
QuickSelect.prototype.partitionY = function(left, right, pivot_idx) {
  var pivot = this.pts[pivot_idx].y;
  this.swap( right, pivot_idx); // Move pivot to end
  for (var i = pivot_idx = left; i < right; i++) {
    if (this.pts[i].y < pivot) {
      this.swap( pivot_idx++, i);
    }
  }
  this.swap( right, pivot_idx); // Move pivot to its final place
  return pivot_idx;
}

QuickSelect.prototype.quickfindFirstK = function( left, right, k) {
  if (right > left) {
    var pivot_idx = (left + right) >> 1;

    switch(this.dim){
      case 0: pivot_idx = this.partitionX( left, right, pivot_idx); break;
      case 1: pivot_idx = this.partitionY( left, right, pivot_idx); break;
    }

    if (pivot_idx > k)  this.quickfindFirstK( left, pivot_idx-1, k);
    if (pivot_idx < k)  this.quickfindFirstK( pivot_idx+1, right, k);
  }
}


QuickSelect.prototype.swap = function(i, j) {
  var pts_t = this.pts[i];
  this.pts[i] = this.pts[j];
  this.pts[j] = pts_t;
}

