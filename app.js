const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79 // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia ||
  navigator.webkitGetUserMedia;

const video = document.querySelector("#video");
const trackCanvas = document.querySelector("#trackCanvas");
const context = trackCanvas.getContext("2d");
const audio = document.querySelector("#audio");
let model;

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
        setInterval(runDetection, 1000);
      },
      err => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then(predictions => {
    //console.log(predictions);
    if (predictions.length > 0) {
      audio.play();
      //predictions.shift();
      console.log(predictions);
      //redraw(((predictions[predictions.length-1]["bbox"][0]+predictions[predictions.length-1]["bbox"][1])/2), ((predictions[predictions.length-1]["bbox"][1]+predictions[predictions.length-1]["bbox"][3])/2));
    }
    requestAnimationFrame(runDetection);
    //view detector
    model.renderPredictions(predictions, trackCanvas, context, video);
  });
}

handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
});

var drawCanvas = document.getElementById('drawCanvas');
var c = drawCanvas.getContext('2d');


var putLeaves = function() {
c.beginPath();
c.arc(300,300,30,0,Math.PI*2,false);
c.fillStyle ="#d57b85"
c.fill
}

drawCanvas.addEventListner('mousedown', putLeaves)