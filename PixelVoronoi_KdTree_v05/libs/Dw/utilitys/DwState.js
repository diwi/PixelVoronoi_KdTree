/**
 * project: ...
 * author: thomas diewald
 * date:   21.02.12
 */



var DwState = DwState || {};

DwState.mat4_stack = [];
DwState.mat3_stack = [];


DwState.pushMat4 = function(src_mat4){
  DwState.mat4_stack.push(DwMat4.copy_new(src_mat4));
}

DwState.popMat4 = function(dst_mat4){
  DwMat4.copy_ref( DwState.mat4_stack.pop(), dst_mat4);
}



DwState.pushMat3 = function(src_mat3){
  DwState.mat3_stack.push(DwMat3.copy_new(src_mat3));
}

DwState.popMat3 = function(dst_mat3){
  DwMat3.copy_ref( DwState.mat3_stack.pop(), dst_mat3);
}
