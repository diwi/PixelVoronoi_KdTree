/**
 * project: ...
 * author: thomas diewald
 * date:   19.02.12
 */

// http://netghost.narod.ru/gff/graphics/summary/tga.htm
//http://netghost.narod.ru/gff/graphics/book/ch09_03.htm#RUEN-CHP-09

function DwImage_TGA(path, filename ){
//  this.gl = gl;
  this.path = path || "";
  this.filename = filename;
  this.total_file_path = this.path + this.filename;
  if( !this.filename )
    throw new ("(Image_TGA) invalid filename, can't load TGA: "+this.total_file_path);

  this.onload = function(){};
  this.onerror = function(){
    console.log("ERROR while loading TGA-Image: "+this.total_file_path);
  };
}

DwImage_TGA.prototype.load = function(obj, async){
  var _this = this;

  // make request
  var XHR = new XMLHttpRequest();
  XHR.open("GET", this.total_file_path, (async === undefined) || async ); //true=asynchronous
  XHR.responseType = "arraybuffer";
  XHR.onload = function (event) {
    _this.loadTGA(XHR.response);
    _this.onload();
  };
  try{
    XHR.send(obj); // usually null
  } catch (exception){
//    console.log(exception);
    _this.onerror();
  }
}



DwImage_TGA.prototype.loadTGA = function(arraybuffer){
  var time_start = new Date().getTime();

  var buf = new Uint8Array(arraybuffer);
  var IDX = 0;
  this.ID            = buf[IDX++];  // 0=no ID, otherwise length of id(0-255
  this.col_map_type  = buf[IDX++];  // 0=not existing, 1=existing
  this.image_type    = buf[IDX++];  // 0-11
  this.col_map_start = buf[IDX++] | (buf[IDX++] << 8); // 0=standard
  this.col_map_len   = buf[IDX++] | (buf[IDX++] << 8); // number of colors
  this.col_map_depth = buf[IDX++];  // 15,16,24,32
  this.x_pos         = buf[IDX++] | (buf[IDX++] << 8); // 0=standard
  this.y_pos         = buf[IDX++] | (buf[IDX++] << 8); // 0=standard
  this.width         = buf[IDX++] | (buf[IDX++] << 8); //
  this.height        = buf[IDX++] | (buf[IDX++] << 8); //
  this.pixel_depth   = buf[IDX++];  // 8, 15,16,24,32
  this.pixel_attr    = buf[IDX++];  //

  this.pixel_count = this.width*this.height;

//  http://www.khronos.org/registry/webgl/specs/latest/#TEXIMAGE2D
  if( this.pixel_depth == 32 ){
//    this.gl_target         = this.gl.TEXTURE_2D;
//    this.gl_internalformat = this.gl.RGBA;
//    this.gl_format         = this.gl.RGBA;
//    this.gl_type           = this.gl.UNSIGNED_BYTE;
    this.pixels            = new Uint8Array(this.pixel_count * 4);
  }
  if( this.pixel_depth == 24 ){
//    this.gl_target         = this.gl.TEXTURE_2D;
//    this.gl_internalformat = this.gl.RGB;
//    this.gl_format         = this.gl.RGB;
//    this.gl_type           = this.gl.UNSIGNED_BYTE;
    this.pixels            = new Uint8Array(this.pixel_count * 3);
  }

//  this.log();

  IDX += this.ID; //skip id-content
  if( this.col_map_type == 1 ){
    throw ("TGA_Loader currently not supports color \"color map format\"");
  }

//  for(var i = 0; i < 1000; i++){
  switch( this.image_type ){
    case  0: break; //no data
    case  1: this.loadColorMap     (buf, IDX); break; // color_map_indices, uncompressed
    case  2: this.loadTrueColor    (buf, IDX); break; // true_color, uncompressed
    case  3: this.loadMonochrom    (buf, IDX); break; // monochrom/grayscale, uncompressed
    case  9: this.loadColorMap_RLE (buf, IDX); break; // color_map_indices, RLE
    case 10: this.loadTrueColor_RLE(buf, IDX); break; // true_color,, RLE
    case 11: this.loadMonochrom_RLE(buf, IDX); break; // monochrom/grayscale, RLE
  }
//  }

  if( !true ){ //TODO
    throw ("(!CORRPUT FILE!)");
  } else {
    var size = buf.length;
    this.loading_time = new Date().getTime() - time_start;
//    console.log(">>> loaded TGA-File ("+this.loading_time+" ms, "+size+" bytes): \""+this.filename+"\"");
  }
}






DwImage_TGA.prototype.loadTrueColor = function(buf, IDX){
  var pixl_idx = 0;
  var buff_idx = IDX;
  var counter =  this.pixel_count;
  if( this.pixel_depth == 32 ) {
    while(counter-- > 0){
      this.pixels[pixl_idx++] = buf[buff_idx+2];
      this.pixels[pixl_idx++] = buf[buff_idx+1];
      this.pixels[pixl_idx++] = buf[buff_idx  ];
      this.pixels[pixl_idx++] = buf[buff_idx+3];
      buff_idx+=4;
    }
  } else if( this.pixel_depth == 24 ){
    while(counter-- > 0){
      this.pixels[pixl_idx++] = buf[buff_idx+2];
      this.pixels[pixl_idx++] = buf[buff_idx+1];
      this.pixels[pixl_idx++] = buf[buff_idx  ];
      buff_idx+=3;
    }
  }
}



DwImage_TGA.prototype.loadTrueColor_RLE = function(buf, IDX){
  var pixl_idx = 0;
  var buff_idx = IDX;
  var counter =  this.pixel_count;

  if( this.pixel_depth == 32 ) {
    while (counter > 0) {
      var num = buf[buff_idx++];
      var RLE = (num & 0x80) != 0;
      if (RLE) { // compressed
//        num -= 127;  // (num & 0x7F) + 1
        while(num-- > 127 && --counter> 0){
          this.pixels[pixl_idx++] = buf[buff_idx+2];
          this.pixels[pixl_idx++] = buf[buff_idx+1];
          this.pixels[pixl_idx++] = buf[buff_idx  ];
          this.pixels[pixl_idx++] = buf[buff_idx+3];
//          --counter;
        }
        buff_idx+=4;
      } else { // uncompressed
        while(num-- >= 0 && --counter> 0){
          this.pixels[pixl_idx++] = buf[buff_idx+2];
          this.pixels[pixl_idx++] = buf[buff_idx+1];
          this.pixels[pixl_idx++] = buf[buff_idx  ];
          this.pixels[pixl_idx++] = buf[buff_idx+3];
//          --counter;
          buff_idx+=4;
        }
      }
    }
  } else if( this.pixel_depth == 24 ) { //24 bit
    while (counter > 0) {
      var num = buf[buff_idx++];
      var RLE = (num & 0x80) != 0;
      if (RLE) { // compressed
//        num -= 127;  // (num & 0x7F) + 1
        while(num-- > 127 && --counter> 0){
          this.pixels[pixl_idx++] = buf[buff_idx+2];
          this.pixels[pixl_idx++] = buf[buff_idx+1];
          this.pixels[pixl_idx++] = buf[buff_idx  ];
//          --counter;
        }
        buff_idx+=3;
      } else { // uncompressed
        while(num-- >= 0 && --counter> 0){
          this.pixels[pixl_idx++] = buf[buff_idx+2];
          this.pixels[pixl_idx++] = buf[buff_idx+1];
          this.pixels[pixl_idx++] = buf[buff_idx  ];
//          --counter;
          buff_idx+=3;
        }
      }
    }
  }
}







DwImage_TGA.prototype.loadColorMap = function(buf, IDX){
  throw ("TGA_Loader currently not supports color \"colorMap\""); // TODO
}
DwImage_TGA.prototype.loadColorMap_RLE = function(buf, IDX){
  throw ("TGA_Loader currently not supports color \"colorMap, RLE\""); // TODO
}



DwImage_TGA.prototype.loadMonochrom = function(buf, IDX){
  throw ("TGA_Loader currently not supports color \"monochrom\""); // TODO
}
DwImage_TGA.prototype.loadMonochrom_RLE = function(bufb, IDX){
  throw ("TGA_Loader currently not supports color \"monochrom, RLE\""); // TODO
}




DwImage_TGA.prototype.log = function(){
  console.log("ID            = "+ this.ID            );
  console.log("col_map_type  = "+ this.col_map_type  );
  console.log("image_type    = "+ this.image_type    );
  console.log("col_map_start = "+ this.col_map_start );
  console.log("col_map_len   = "+ this.col_map_len   );
  console.log("col_map_depth = "+ this.col_map_depth );
  console.log("x_pos         = "+ this.x_pos         );
  console.log("y_pos         = "+ this.y_pos         );
  console.log("width         = "+ this.width         );
  console.log("height        = "+ this.height        );
  console.log("pixel_depth   = "+ this.pixel_depth   );
  console.log("pixel_attr    = "+ this.pixel_attr    );
}

