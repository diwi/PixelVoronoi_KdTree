/**
 * project: ...
 * author: thomas diewald
 * date:   19.02.12
 */


var DwString = DwString || {};

DwString.startsWith = function(str, start){
  return str.substr(0, start.length) == start;
};

DwString.endsWith = function(str, end) {
  return str.substr(this.length-end.length) == end;
};
