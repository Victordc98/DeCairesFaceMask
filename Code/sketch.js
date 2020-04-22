/*
FACE-TRACKING -> Face Mask

A demo using Audun Mathias Øygard's great clmtrackr 
library to track facial features from the webcam.

More info on the clmtrackr.js library and to see an
image showing all the facial points that are tracked:
https://www.auduno.com/clmtrackr/docs/reference.html

(You'll need to add this library to your sketch's
index.html file – see the one here for the link)

Based on: 
https://editor.p5js.org/kerryrodden/sketches/-KkpbDv6Z

Which is based on: 
https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm

*/


// clmtrackr returns a list of points, which reference
// pre-defined features on the face – to access them,
// we need the index in the list where those features
// can be found
let leftPupil =  27;
let rightPupil = 32;
let leftEye =  [ 23, 63, 24, 64, 25, 65, 26, 66 ];
let rightEye = [ 30, 68, 29, 67, 28, 70, 31, 69 ];
let mouth =    [ 44, 61, 60, 59, 50, 58, 57, 56 ];

let webcam = null;    // webcam object
let tracker = null;   // clmtrackr object
let features = null;  // list of facial features


var mask;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // start webcam input
  webcam = createCapture(VIDEO);
  webcam.size(width, height);

  // connect face tracking to webcam
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(webcam.elt);
  
  mask=loadImage('assets/FaceMask_3.png');
  
  
  
}


function draw() {
  
  // mirror the webcam input (which will be more
  // natural-feeling) and display it
  translate(width, 0);
  scale(-1.0, 1.0);
  image(webcam, 0, 0, width,height);
  
  // get the features and, if we found some,
  // draw the mask
  features = tracker.getCurrentPosition();
  
  if (features.length > 0) { 
    drawMask();
    
    for (var i=0; i<200; i++) {
      fill(random(200,255),random(0,150),random(100,255),80);
      noStroke();
      ellipse(random(0,windowWidth/3),random(5,windowHeight),random(3,6),random(3,6));
      ellipse(random(windowWidth*(2/3),windowWidth),random(5,windowHeight),random(3,6),random(3,6));
    }
  
  }
  
  // generally, it's a good idea to think of your
  // draw() loop as a "script" – a basic outline
  // of what your sketch does
  // any complex commands should be moved to functions,
  // which makes it easier to understand what's 
  // happening in both the draw() and your various
  // functions
  // here, we move the complex mask-drawing bits
  // to another function, making it easy to see that
  // we draw the webcam image, get the features, and
  // draw something if features are found
}


function drawMask() {
  
  // various examples below!
  // you can comment out sections to see them on their own
  translate(0,0);
  scale(1,1);
  
  
 
  
  // clmtrackr looks for faces, but doesn't give us an overall
  // face dimesion – but we can use the same ideas from above
  // plus a little knowledge from figure drawing: generally, 
  // the eyes are at the center of the face
  var faceCenterX = features[33][0];
  var faceCenterY = features[33][1];
  
  // we can use two outside points to figure out the width
  // and double the distance from the eyes to the chin for
  // the overall height
  var faceWidth = features[14][0] - features[0][0];
  var faceHeight = (features[7][1] - features[0][1]) * 2;
  noStroke();
  fill(26,165,255, 160);
  ellipse(faceCenterX,faceCenterY, faceWidth,faceHeight);
  fill(20,130,255, 80);
  ellipse(faceCenterX,faceCenterY, faceWidth*.8,faceHeight*.8);
  fill(15,100,255, 30);
  ellipse(faceCenterX,faceCenterY, faceWidth*.6,faceHeight*.6);
  
  
  
  // a simple example: get the x/y location of the pupils
  // and draw them as ellipses  
  
  fill(255,50,0,80);
  noStroke();
  ellipse(features[leftPupil][0], features[leftPupil][1], 50,45);
  ellipse(features[rightPupil][0], features[rightPupil][1], 50,45);
  fill(255,50,0,80);
  noStroke();
  ellipse(features[leftPupil][0], features[leftPupil][1], 65,55);
  ellipse(features[rightPupil][0], features[rightPupil][1], 65,55);
  
  

  fill(252,237,64,80);
  noStroke();
  ellipse(features[leftPupil][0], features[leftPupil][1], 35,20);
  ellipse(features[rightPupil][0], features[rightPupil][1], 35,20);
  
  
   
  
  fill(200,100,0, 80);
  strokeWeight(4);
  stroke(255,0,0);
  rect(0,0, width,height);
  
  mask.resize((features[14][0] - features[0][0])*1.5,(features[7][1] - features[0]       [1])*1.5);
  image(mask,features[0][0],features[0][1]-40);

  
}

