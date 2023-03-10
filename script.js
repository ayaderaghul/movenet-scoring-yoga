// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  // createCanvas(640, 480);
  createCanvas(800,600);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

let posename='tree'

function plottreepose(){
  posename="tree"
}

function plotchairpose(){
  posename="chair"
}

function draw() {
  image(video, 0, 0, width, height);
// console.log(width,height)
  // We can call both functions to draw all keypoints and the skeletons
  if (posename=="tree"){
  drawKeypoints();
  drawSkeleton();
  } else {
    console.log(posename)
    drawKeypoints2();
  drawSkeleton();
  }
}

let X = [0.32474753, 0.31742835, 0.315193  , 0.33014518, 0.330263  ,
        0.38090655, 0.38585427, 0.27876797, 0.27838552, 0.1950332 ,
        0.19406383, 0.5454995 , 0.55252606, 0.62930524, 0.7234637 ,
        0.6545082 , 0.8363562 ]
let Y = [0.52622736, 0.53796893, 0.514909  , 0.55743146, 0.50785697,
        0.57873464, 0.4932102 , 0.56562304, 0.49372613, 0.54242104,
        0.5113031 , 0.56869173, 0.5054548 , 0.6828927 , 0.53807205,
        0.5603934 , 0.5661066 ]

let Xchair = [0.34023464, 0.3276967 , 0.32793763, 0.33311573, 0.33541682,
        0.39712426, 0.3941802 , 0.49390513, 0.49845377, 0.42812088,
        0.43213347, 0.5732867 , 0.5668779 , 0.7322788 , 0.5021988 ,
        0.8870048 , 0.6521647 ]

let Ychair = [0.4781877 , 0.4728554 , 0.47384417, 0.4453547 , 0.44738495,
        0.4402206 , 0.44152382, 0.48746884, 0.49766824, 0.5320453 ,
        0.5396985 , 0.43115434, 0.43280736, 0.4503186 , 0.57631177,
        0.45137438, 0.5604785 ]

// A function to draw ellipses over the detected keypoints
function drawKeypoints(width, height)  {
  
  
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let score = 0
    for (let k=0;k<17;k++){
        score+= Math.sqrt(Math.pow((pose.keypoints[k].position.x - X[k]),2) + Math.pow((pose.keypoints[k].position.y-Y[k]),2))
       fill(0,255,0);
      noStroke();
      ellipse(Y[k] * 800, X[k] * 600, 10,10)
    }
    // console.log(score)
  
  // const ctx = document.getElementById("canvas").getContext("2d");
  // ctx.font = "48px serif";
  // ctx.fillText("Hello world", 10, 50);
    document.getElementById("canvas").innerHTML= "score of " + posename + ": " + Math.round(900-(score/17)/9)/100
      // .toLocaleString('en-US');
    

    for (let j = 0; j < pose.keypoints.length; j++) {
      // console.log(pose)
      
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        // document.getElementById("nosex").innerHTML=Math.round(keypoint.position.x).toLocaleString('en-US');

    // document.getElementById("nosey").innerHTML=Math.round(keypoint.position.y).toLocaleString('en-US');

     
        
      }
     
    }
  }
}

function drawKeypoints2(width, height)  {
  
  
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let score = 0
    for (let k=0;k<17;k++){
        score+= Math.sqrt(Math.pow((pose.keypoints[k].position.x - Xchair[k]),2) + Math.pow((pose.keypoints[k].position.y-Ychair[k]),2))
       fill(0,255,0);
      noStroke();
      ellipse(Ychair[k] * 800, Xchair[k] * 600, 10,10)
    }
    // console.log(score)
  
  // const ctx = document.getElementById("canvas").getContext("2d");
  // ctx.font = "48px serif";
  // ctx.fillText("Hello world", 10, 50);
    document.getElementById("canvas").innerHTML= "score of " + posename + ": " + Math.round(900-(score/17)/9)/100
      // .toLocaleString('en-US');
    

    for (let j = 0; j < pose.keypoints.length; j++) {
      // console.log(pose)
      
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        // document.getElementById("nosex").innerHTML=Math.round(keypoint.position.x).toLocaleString('en-US');

    // document.getElementById("nosey").innerHTML=Math.round(keypoint.position.y).toLocaleString('en-US');

     
        
      }
     
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

