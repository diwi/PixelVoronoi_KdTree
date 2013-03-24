/**
 * project: ...
 * author: thomas diewald
 * date:   15.02.12
 */


function Byter(arraybuffer){

  this.buffer_is_valid = (arraybuffer instanceof ArrayBuffer);

  if( !this.buffer_is_valid){
    var err = "ERROR (Byter.js): praram \"data\" of wrong type ("+(  typeof arraybuffer)+"), MUST be of type \"ArrayBuffer\""
    console.log(err);
          alert(err);
  }

  this.bytearray = arraybuffer; // type of arrayBuffer

  this.BIG_ENDIAN    = 1;
  this.LITTLE_ENDIAN = 2;

  this.idx = 0;
  this.total_size = this.bytearray.byteLength;

  this.byte_reading_counter = 0;
  this.byte_writing_counter = 0;

  this.byte_order = this.BIG_ENDIAN;

}

Byter.prototype.isValid = function(){
  return this.buffer_is_valid;
}

Byter.prototype.getBytes = function(){
  return this.bytearray;
}


Byter.prototype.getFloat32Value = function(offset){
  return this.getFloat32Array(offset, 1)[0];
}

Byter.prototype.getFloat32Array = function(offset, number_of_elements){
  this.idx += offset;
  var values = new Float32Array (this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Float32Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Float32Array
}


Byter.prototype.getInt32Value = function(offset) {
  return this.getInt32Array(offset, 1)[0];
}
Byter.prototype.getInt32Array = function(offset, number_of_elements) {
  this.idx += offset;
  var values = new Int32Array (this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Int32Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Int32Array
}


Byter.prototype.getInt16Value = function(offset) {
  return this.getInt16Array(offset, 1)[0];
}
Byter.prototype.getInt16Array = function(offset, number_of_elements) {
  this.idx += offset;
  var values = new Int16Array (this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Int16Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Int16Array
}

Byter.prototype.getUint16Value = function(offset) {
  return this.getUint16Array(offset, 1)[0];
}
Byter.prototype.getUint16Array = function(offset, number_of_elements) {
  this.idx += offset;

  var values = new Uint16Array(this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Uint16Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Uint16Array
}




Byter.prototype.getInt8Value = function(offset) {
  return this.getInt8Array(offset, 1)[0];
}
Byter.prototype.getInt8Array = function(offset, number_of_elements) {
  this.idx += offset;
  var values = new Int8Array (this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Int8Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Int8Array
}

Byter.prototype.getUint8Value = function(offset) {
  return this.getUint8Array(offset, 1)[0];
}
Byter.prototype.getUint8Array = function(offset, number_of_elements) {
  this.idx += offset;
  var values = new Uint8Array (this.bytearray, this.idx, number_of_elements);

  var number_of_bytes = Uint8Array.BYTES_PER_ELEMENT*number_of_elements;
  this.idx += number_of_bytes;
  this.byte_reading_counter+= number_of_bytes;
  return values; // returns Uint8Array
}



Byter.prototype.getString = function(offset, number_of_elements, lastchar) {
  var chars = this.getUint8Array(offset, number_of_elements);
  var str = this.conv_byteArray_to_string(chars);
  if( lastchar ){
    var idx = str.indexOf("\0");
    if( idx >= 0){
      str = str.substring(0, idx);
    }
  }
  return str;
}



/*
 MAGIC
 http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
 http://stackoverflow.com/questions/3195865/javascript-html-converting-byte-array-to-string
 http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
 */
Byter.prototype.conv_byteArray_to_intArray = function(byte_array){
  var len = byte_array.length;
  var int_array = new Array(byte_array.length);
  for (var i = 0; i < len; i++){
    int_array[i] = byte_array[i];
  }
  return int_array; // = int/ascii array
}
Byter.prototype.conv_intArray_to_string = function(int_array){
  return String.fromCharCode.apply(String, int_array);
}
Byter.prototype.conv_byteArray_to_string = function(byte_array){
  return String.fromCharCode.apply(String, this.conv_byteArray_to_intArray(byte_array));
}


//Byter.prototype.getInteger3 = function(offset, number_of_elements) {
//  number_of_elements *= 3;
//  this.idx += offset;
//  var values = new Int32Array (this.data, idx, number_of_elements);
//
//  var number_of_bytes = Int32Array.BYTES_PER_ELEMENT*number_of_elements;
//  this.idx += number_of_bytes;
//  this.byte_reading_counter+= number_of_bytes;
//  return values; // returns Int32Array [a0, a1, a2, b0, b1, b2, ...]
//}



Byter.prototype.forward = function(offset){
  this.idx += offset;
  return this;
}
Byter.prototype.backward = function(offset){
  this.idx -= offset;
  return this;
}

Byter.prototype.available = function(){
  return this.total_size -  this.idx;
}
Byter.prototype.totalSize = function(){
  return this.total_size;
}


Byter.prototype.getPos = function(){
  return this.idx;
}
Byter.prototype.setPos = function(newpos){
  this.idx = newpos;
}
  //conversion
//  public static final long convert_UInteger2Long(int v){
//    return v & 0xffffffffL;
//  }
//
//  public static final int convert_UShort2Integer(short v){
//    return v & 0xffff;
//  }




Byter.loadBinaryFile = function(filename, callback){
  var oXHR = new XMLHttpRequest();
  oXHR.open("GET", filename, true);
  oXHR.responseType = "arraybuffer";
//      console.log("___oXHR = "+oXHR);

  oXHR.onload = function (oEvent) {
    var arrayBuffer = oXHR.response; // Note: not oXHR.responseText
//        console.log("___arrayBuffer        = "+arrayBuffer);
//        console.log("___typeof arrayBuffer = "+(typeof arrayBuffer));
    if (arrayBuffer) {
//          console.log("___arrayBuffer.length = "+arrayBuffer.byteLength);
//      loadMD3(filename, arrayBuffer);
      callback(filename, arrayBuffer);
    }
  };
  oXHR.send(null);
}


