var img2;

function preload(){
    img2=loadImage("car.jpg");
}


function setup() {
   createCanvas(img2.width*2,img2.height); 
   background(0);
   var newim=rgbToGray(img2);
   var eg=edge(newim);
   
   for(var x=0;x<newim.pixels.length; x++){
       newim.pixels[x]=newim.pixels[x]+eg.pixels[x];
   }  
    
    
   displayGray(newim);
   
   image(img2,img2.width,0);
      
  
}
