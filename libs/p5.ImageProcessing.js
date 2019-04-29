


/**
 * 
 * Image Processing library developed on p5.js 
 *   
 *   
 * */


/**
 *
 * rgbToGray is a method that convert p5.Image object to a
 * object that has properties of graysclae image
 * 
 * @method rgbToGray
 * @param  {p5.Image} 
 *                    
 * @return {Object {pixels: height: width:}}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */

p5.prototype.rgbToGray= function (img) {
  
  if(!(img instanceof p5.Image)){
      throw "TypeError";
  }
  //Transform the RGB colour components to Intencity levels
  var gray=new Array();
  img.loadPixels();
  for (var x = 0; x < 4 * (img.width*img.height); x+=4) {
      gray.push((img.pixels[x]+img.pixels[x+1]+img.pixels[x+2])/3);      
  }
  
  console.log(gray.length);  
  return {pixels:gray, width:img.width, height: img.height};
}

/**
 *
 * displyGray is the function used to displatan image on a canvas.
 * canvas automatically get the size of the given gray image.
 * 
 * @method displayGray
 * @param  {Object} Object containing  {pixels: height: width:} properties
 *                    
 * @return {}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */

p5.prototype.displayGray= function(gray){
    
    //createCanvas(gray.width,gray.height);
    //background(0);
    // Check for errors in the code
    if (!gray.hasOwnProperty('pixels')  || !gray.hasOwnProperty('width') || !gray.hasOwnProperty('height')){
        throw "TypeError";
    }
     console.log(gray.pixels.length);
    // Draw the image on the specified canvas
     for(var x=0; x<gray.width; x++){
      for(var y=0; y< gray.height; y++){
           stroke(gray.pixels[y*gray.width+x]);          
           point(x,y);
      }
     }
}

/**
 *
 *threshold function threshold a given image. The tvalue parameter 
 *should be in between 0 to 255
 * 
 * @method threshold
 * 
 * @param  {Number} Threshold value
 * @param  {Object} Object containing  {pixels: height: width:} properties
 *                    
 * @return {Object} Return a gray image object {pixels: height: width:}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */


p5.prototype.threshold=function(tvalue, image){
  
  // Check for the threshold value range and correct image object  
  if(tvalue > 255 || tvalue < 0){
      throw "ValueError";
  }else if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  }    
  // Assign colour levels to the array
  var threshold=new Array();
  for(var x=0 ; x < image.pixels.length; x++){
      if(image.pixels[x] > tvalue){
          threshold.push(255);
      }else{
          threshold.push(0);
      }
  }
  return {pixels:threshold, width:image.width, height: image.height};
}

/**
 *
 * Return the invert of agiven image
 * 
 * @method invert
 * @param  {Object} Object containing  {pixels: height: width:} properties
 *                    
 * @return {Object} Return a gray image object {pixels: height: width:}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */

p5.prototype.invert=function(image){
    
  if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  }
  // Transform the gray levels in the array Y=255-X
  var invert=new Array();
  for(var x=0 ; x < image.pixels.length; x++){
      invert.push(255-image.pixels[x]);
  }
  return {pixels:invert, width:image.width, height: image.height};
}

/**
 *
 * Log transform the image 
 *
 * @method logTransform
 * @param  {Object} Object containing  {pixels: height: width:} properties
 * @param  {Number} The scaling factor of the resulting image default value :2
 *                                       
 * @return {Object} Return a gray image object {pixels: height: width:}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */


p5.prototype.logTransform=function(image,c=2){
    
  if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  }
  // Transform the gray levels in the array Y=c(log(X+1))
  var logtransform=new Array();
  for(var x=0 ; x < image.pixels.length; x++){
      logtransform.push(c*(Math.log(image.pixels[x]+1)));
  }
  return {pixels:logtransform, width:image.width, height: image.height};
}

/**
 *
 * Take the power low transform of the image
 *
 * @method powerLowTransform
 * @param  {Object} Object containing  {pixels: height: width:} properties
 * 
 * @param  {Number} Power value of the image (usually less than zero ) 
 * @param  {Number} The scaling factor of the resulting image default value :1
 *                                       
 * @return {Object} Return a gray image object {pixels: height: width:}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */

p5.prototype.powerLowTransform=function(image,gamma,c=1){
    
  if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  }
  //Transform the gray levles in the array Y=cX^gamma
  var logtransform=new Array();
  for(var x=0 ; x < image.pixels.length; x++){
      logtransform.push(c*(Math.pow(image.pixels[x],gamma)));
  }
  return {pixels:logtransform, width:image.width, height: image.height};
}

/**
 *
 * Rotate a given image.
 * 
 * @method rotate
 * @param  {Object} Object containing  {pixels: height: width:} properties
 * 
 * @param  {Number} Base point of rotation x0 default: h/2
 * @param  {Number} Base point of rotation y0 default: w/2
 * @param  {Number} Rotation angle in radians 
 *                                       
 * @return {Object} Return a gray image object {pixels: height: width:}
 * 
 * @example
 * 
 * @alt
 * no display.
 *
 */


p5.prototype.rotate=function(image,x0=image.height/2,y0=image.width/2,ang){
    
  if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  } 
  
  var rotate=new Array();
  for(var x=0 ; x < image.pixels.length; x++){
      rotate.push(0);
  }
  
  //Transrom the image using transfer function
  
  for(var x=0;x<image.height; x++){
      for(var y=0;y<image.width; y++){
          
          var xn=Math.round(Math.cos(ang)*(x-x0) - Math.sin(ang)*(y-y0) + x0);
          var yn=Math.round(Math.sin(ang)*(x-x0) + Math.cos(ang)*(y-y0) + y0);
          if (yn < image.width && yn > 0){
            rotate[xn*image.width+yn]=image.pixels[x*image.width+y];       
          }
      }
  }

  return {pixels:rotate, width:image.width, height: image.height};
}


p5.prototype.medianFilter=function(image,kernel){
    
  if (!image.hasOwnProperty('pixels')  || ! image.hasOwnProperty('width') || !image.hasOwnProperty('height')){
      throw "TypeError";
  }
  //Transform the gray levles in the array Y=cX^gamma
  var median=new Array();
  
  
  
  
  return {pixels:median, width:image.width, height: image.height};
}


p5.prototype.edge=function(newim){
    
  if (!newim.hasOwnProperty('pixels')  || ! newim.hasOwnProperty('width') || !newim.hasOwnProperty('height')){
      throw "TypeError";
  }
    
  var gray=new Array();
  gray.push(0);
  for(var x=1;x < newim.pixels.length;x++){
      var diffr=abs(newim.pixels[x]-newim.pixels[x-1]);
      
      gray.push(diffr);
      
      /*if(diffr > maxdiff){
        gray.push(255);
      }else{
        gray.push(0);
      }
      */
  }
  
  return {pixels:gray, width:newim.width, height: newim.height};
}