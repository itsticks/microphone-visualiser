window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var meter = null;
var ctx = null;
var step = null;
var canvas = document.createElement( "canvas" );
var startButton = document.createElement('button');

startButton.innerHTML = 'Enable microphone';
document.body.append(startButton);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);



startButton.onclick = function() {
startButton.style.display = 'none';
   
    ctx = canvas.getContext("2d");
    
    audioContext = new AudioContext();

navigator.mediaDevices.getUserMedia({audio:{
    sampleSize: 8,
    echoCancellation: false,
    autoGainControl:false,
    noiseSuppression:false,
    highpassFilter:false
  }})
.then(function(stream) {
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    volumeCircle();
})

}

function volumeCircle() {

var randomR = Math.random() * 255;
var randomB = Math.random() * 255;
var randomG = Math.random() * 255;

  //  ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "rgb("+randomR+","+randomB+","+randomG+")";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, meter.volume*3000*1.4, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke(); 
    step = window.requestAnimationFrame( volumeCircle );
}
