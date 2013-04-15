/**

 * author: thomas diewald
 * date:   15.03.13
 *
 * KD-Tree building, debugging, etc.
 *
 *
 */


//--------------------------------------------------------------------------
// KD-TREE NODE
//--------------------------------------------------------------------------
//
// Kd-Tree Node Encoding: 32 bit Integer
//
//                      24       16        8        0
//  32 bit node:  LXXXXXXX XXXXXXXX DYYYYYYY YYYYYYYY
//
//  L ... leaf (0, 1)
//  D ... dimension (0, 1) ... could also be computet in the shader (on the fly).
//  X ... Point.x ( scaled, and converted to int)
//  Y ... Point.y ( scaled, and converted to int)
//
//
// nodes are saved in an integer array, having the root node at index 1.
// childs are at the current-index * 2 (...+0=left, ...+1= right).
// the parent node is found at current-index/2.
// due to this tree-storage, some indices contain "no nodes".
//
//--------------------------------------------------------------------------
// KD-TREE NODE
//--------------------------------------------------------------------------


// node encoding masks
KdTree.BIT_LEAF = 0x80000000; //    31
KdTree.BIT_DIM  = 0x00008000; //    15
KdTree.BIT_P_Y  = 0x00007FFF; //  0-14
KdTree.BIT_P_X  = 0x7FFF0000; // 16-30

// point-scaling (to keep some precision). !same scaling in shader!
KdTree.PNT_SCALE = 10.0;

// get node indices for: Parent, Left-child, Right-child
KdTree.GET_P = function(node_idx){ return (node_idx>>1)  ; } // parent node_idx
KdTree.GET_L = function(node_idx){ return (node_idx<<1)  ; } // left   node_idx
KdTree.GET_R = function(node_idx){ return (node_idx<<1)+1; } // right  node_idx

// get node data: leaf, dimension, point.x, point.y
KdTree.IS_LEAF = function(node_val){ return ( node_val&KdTree.BIT_LEAF )>>31; } // last bit!
KdTree.GET_DIM = function(node_val){ return ( node_val&KdTree.BIT_DIM  )>>15; }
KdTree.GET_PX  = function(node_val){ return ((node_val&KdTree.BIT_P_X  )>>16)/KdTree.PNT_SCALE; }
KdTree.GET_PY  = function(node_val){ return ((node_val&KdTree.BIT_P_Y  )>> 0)/KdTree.PNT_SCALE; }




function KdTree(){


  //--------------------------------------------------------------------------
  // KD-TREE
  //--------------------------------------------------------------------------
  this.buffer = 0;     // ArrayBuffer
  this.kd_tree = 0;    // Int32Array: view for saving values
  this.uint8Array = 0; // Uint8Array: view for texture-data

  this.max_depth = 0;

  this.points = [];    // copy of input points

  this.quick_sort = new Quicksort(); // turned out to be the fastest.
  this.quick_select = new QuickSelect(); // turned out to be the fastest.

  this.kd_tree_planes_buffer = 0;
  this.kd_tree_planes = 0;
  this.BUF_IDX = 0;
}

KdTree.prototype.delete = function(){
  this.buffer = null;
  this.kd_tree = null;
  this.uint8Array = null;
  this.points = null;
}

  //--------------------------------------------------------------------------
  // BUILD
  //--------------------------------------------------------------------------

KdTree.prototype.build = function(points, DEBUG){

  this.points = points.slice(0); // make sure original array doesn't get messed up

  this.initKdTree(points.length);

//  this.buildIterative(this.points);
//  this.printTree();

//  console.log("");
//  this.buildRecursive(1, this.points );
  this.buildRecursiveFast(1, this.points, 0, this.points.length-1 );
//  this.printTree();
  if( DEBUG ){
    this.printTree();
  }
  return this;
}

KdTree.prototype.initKdTree = function(num_points){
  var tmp_max_depth = Math.ceil( Math.log(num_points) / Math.log(2) ); // log2
  var tmp_num_nodes = (1 << (tmp_max_depth+1));

  if( tmp_num_nodes != this.num_nodes || this.kd_tree == null){
    this.max_depth  = tmp_max_depth;
    this.num_nodes  = tmp_num_nodes;
    this.buffer     = new ArrayBuffer(this.num_nodes*4);
    this.kd_tree    = new Int32Array(this.buffer);
    this.uint8Array = new Uint8Array(this.buffer);
  }

  var max   = 2;
  var depth = 0;
  var dim   = depth%2;
  for(var i = 0; i < this.num_nodes-1; i++){
    if( i == max-1 ){
      max<<=1;
      depth++;
      dim = (depth%2)<<15;
    }
    this.kd_tree[i+1] = dim; // setting  dim bits ... always the sam
  }
}



KdTree.prototype.buildIterative = function(pnts){


  var ptr_T = 0 // tree pointer for compressed tree-nodes (integer)
  var ptr_P = 1; // stack pointer for point-sets

  var stack_P = []; // FIFO
  stack_P[ptr_P++] = pnts;

  while( ptr_T++ < this.num_nodes ){

    if( (pnts = stack_P[ptr_T]) == undefined ) continue;

    var e = pnts.length;
    var m = e>>1;

    if( e > 1 ){ // not a leaf
      this.quick_sort.sort(pnts, KdTree.GET_DIM(this.kd_tree[ptr_T]) );

      stack_P[ptr_P++] = pnts.slice(0, m);
      stack_P[ptr_P++] = pnts.slice(m, e);
    } else { // leaf
      ptr_P+=2;
      this.kd_tree[ptr_T] |=  KdTree.BIT_LEAF; // mark as leaf
    }

    this.kd_tree[ptr_T] |=  Math.round( pnts[m].x * KdTree.PNT_SCALE )<<16;
    this.kd_tree[ptr_T] |=  Math.round( pnts[m].y * KdTree.PNT_SCALE );
  }

}



// slightly faster (~9%) than iterative version
KdTree.prototype.buildRecursive = function(idx, pnts){

  var e = pnts.length;
  var m = e>>1;

  if( e > 1 ){
    this.quick_sort.sort(pnts, KdTree.GET_DIM(this.kd_tree[idx]) );
    this.buildRecursive( (idx<<1),   pnts.slice(0, m) );
    this.buildRecursive( (idx<<1)+1, pnts.slice(m, e) );
  } else {
    this.kd_tree[idx] |= KdTree.BIT_LEAF; // mark as leaf
  }

  this.kd_tree[idx] |=  Math.round( pnts[m].x * KdTree.PNT_SCALE )<<16;
  this.kd_tree[idx] |=  Math.round( pnts[m].y * KdTree.PNT_SCALE );
}

// slightly faster (~9%) than iterative version
KdTree.prototype.buildRecursiveFast = function(idx, pnts, left, right){


  var m = (left+right)>>1;

  if( (right-left) >= 2 ){
//    this.quick_sort.sort(pnts, KdTree.GET_DIM(this.kd_tree[idx]) );
    this.quick_select.sort(pnts, KdTree.GET_DIM(this.kd_tree[idx]), left, right-1, m);
    this.kd_tree[idx] |=  Math.round( pnts[m].x * KdTree.PNT_SCALE )<<16;
    this.kd_tree[idx] |=  Math.round( pnts[m].y * KdTree.PNT_SCALE );

    this.buildRecursiveFast( (idx<<1),   pnts, left, m );
    this.buildRecursiveFast( (idx<<1)+1, pnts, m, right);
  } else {
    this.kd_tree[idx] |= KdTree.BIT_LEAF; // mark as leaf
    this.kd_tree[idx] |=  Math.round( pnts[m].x * KdTree.PNT_SCALE )<<16;
    this.kd_tree[idx] |=  Math.round( pnts[m].y * KdTree.PNT_SCALE );
  }


}



//--------------------------------------------------------------------------
// ANALYZE
//--------------------------------------------------------------------------

KdTree.prototype.printTree = function(){
  for(var i = 0; i < this.kd_tree.length; i++){
    if( this.kd_tree[i] == 0 ){
      console.log("tree[%d]  null", i);
    } else {
      var leaf     = KdTree.IS_LEAF (this.kd_tree[i]);
      var x        = KdTree.GET_PX  (this.kd_tree[i]);
      var y        = KdTree.GET_PY  (this.kd_tree[i]);
      var dim      = KdTree.GET_DIM (this.kd_tree[i]);
      var P        = KdTree.GET_P(i);
      var L        = KdTree.GET_L(i);
      var R        = KdTree.GET_R(i);

      console.log(
        "tree[%s]  %s  dim=%1s  [P,L,R]=[%s,%s,%s]  pnt=[%s,%s]  code=%s",
        i, leaf?"-> LEAF":"       ", dim, P,L,R, x.toFixed(2), y.toFixed(2),  this.kd_tree[i]);
    }
  }
}


//--------------------------------------------------------------------------
// DISPLAY
//--------------------------------------------------------------------------

KdTree.prototype.genVBO = function(b_points, b_planes, x_min, y_min, x_max, y_max){

  var new_len = this.num_nodes*6; // 1 line per node, 4 coordinates per line
  if( this.kd_tree_planes==undefined || new_len != this.kd_tree_planes.length ){
    this.kd_tree_planes = new Float32Array(new_len);
  }

  this.BUF_IDX = 0;

  if( b_planes ) this.genPlanesVBO(1, x_min, y_min, x_max, y_max, 1);
}

KdTree.prototype.genPlanesVBO = function(node_idx, x_min, y_min, x_max, y_max, depth){

  var node = this.kd_tree[node_idx];

  var pnt_x = KdTree.GET_PX(node);
  var pnt_y = KdTree.GET_PY(node);

  if( KdTree.GET_DIM(node) == 0 ){
    if( !KdTree.IS_LEAF(node) ){
      this.genPlanesVBO(KdTree.GET_L(node_idx), x_min, y_min, pnt_x, y_max, depth+1);
      this.genPlanesVBO(KdTree.GET_R(node_idx), pnt_x, y_min, x_max, y_max, depth+1);
    }
    this.drawLine (node_idx,  pnt_x, y_min, pnt_x, y_max, depth);
  } else {
    if( !KdTree.IS_LEAF(node) ){
      this.genPlanesVBO(KdTree.GET_L(node_idx), x_min, y_min, x_max, pnt_y, depth+1);
      this.genPlanesVBO(KdTree.GET_R(node_idx), x_min, pnt_y, x_max, y_max, depth+1);
    }
    this.drawLine(node_idx,  x_min, pnt_y, x_max, pnt_y, depth);
  }
}

KdTree.prototype.drawLine = function(node_idx, x_min, y_min, x_max, y_max, depth){
//  var dnorm = (KdTree.GET_DEPTH(kd_tree[node_idx]))/(float)(max_depth+1);
//  g.stroke(dnorm*150);
//  g.strokeWeight( Math.max((1-dnorm)*5, 1) );
//  g.line(x_min, y_min, x_max, y_max);
  var alpha = 1-depth/(this.max_depth+2);
  var buffer = this.kd_tree_planes;
  var idx = this.BUF_IDX;

  buffer[idx++] = x_min; buffer[idx++] = y_min; buffer[idx++] = alpha;
  buffer[idx++] = x_max; buffer[idx++] = y_max; buffer[idx++] = alpha;
  this.BUF_IDX = idx
}



