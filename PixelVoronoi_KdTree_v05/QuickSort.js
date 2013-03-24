/**
 * author: thomas diewald
 * date:   15.03.13
 *
 * Quicksort in Java, Version 0.6
 * Copyright 2009-2010 Lars Vogel
 *
 * http://www.vogella.com/articles/JavaAlgorithmsQuicksort/article.html
 *
 * adaptded for js by thomas diewald.
 */

function Quicksort()  {

}

Quicksort.prototype.sort = function(points, dim) {
  if (points == null || points.length == 0) return;

  var lo = 0;
  var hi = points.length - 1;
//  this.quicksort(points, lo, hi);
  if( dim == 0) this.quicksortX(points, lo, hi);
  if( dim == 1) this.quicksortY(points, lo, hi);

}



Quicksort.prototype.quicksort = function(pts, low, high) {

  var i = low, j = high;
  var pivot = pts[low + ((high-low)>>1)];

  while (i <= j) {
    switch(this.dim){
      case 0: while(pts[i].x<pivot.x)i++; while(pts[j].x>pivot.x)j--; break;
      case 1: while(pts[i].y<pivot.y)i++; while(pts[j].y>pivot.y)j--; break;
    }
    if (i <= j) this.swap(pts, i++, j--);
  }

  if (low <  j) this.quicksort(pts, low,  j);
  if (i < high) this.quicksort(pts, i, high);
}


Quicksort.prototype.quicksortX = function(pts, lo, hi) {
  var i = lo, j = hi;
  var x = pts[lo + ((hi-lo)>>1)].x;
//  var x = pts.coord(lo + ((hi-lo)>>1));
  while (i <= j) {
    while(pts[i].x<x)i++;
    while(pts[j].x>x)j--;
//    while(pts.coord(i)<x)i++;
//    while(pts.coord(j)>x)j--;
    if (i <= j) this.swap(pts, i++, j--);
  }

  if (lo < j) this.quicksortX(pts, lo, j);
  if (i < hi) this.quicksortX(pts, i, hi);
}

Quicksort.prototype.quicksortY = function(pts, lo, hi) {
  var i = lo, j = hi;
  var y = pts[lo + ((hi-lo)>>1)].y;
  while (i <= j) {
    while(pts[i].y<y)i++;
    while(pts[j].y>y)j--;
    if (i <= j) this.swap(pts, i++, j--);
  }

  if (lo < j) this.quicksortY(pts, lo, j);
  if (i < hi) this.quicksortY(pts, i, hi);
}


Quicksort.prototype.swap = function(pts, i, j) {
  var pts_t = pts[i];
  pts[i] = pts[j];
  pts[j] = pts_t;
}













































