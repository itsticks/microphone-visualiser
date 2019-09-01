window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var volumeMeter = null;
var analyser = null;
var ctx = null;
var animation = null;
var bufferLength = null;
var dataArray = null;
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
//   sampleSize: 8,
    echoCancellation: false,
    autoGainControl:false,
    noiseSuppression:false,
    highpassFilter:false
  }})
.then(function(stream) {
    analyser = audioContext.createAnalyser(stream);
    analyser.fftSize = 2048;
	bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    volumeMeter = createVolumeMeter(audioContext);
    mediaStreamSource.connect(volumeMeter);
    volumeMeter.connect(analyser);
    analyser.connect(audioContext.destination);

    draw();
})

}

function draw() {

var randomR = Math.random() * 255;
var randomB = Math.random() * 255;
var randomG = Math.random() * 255;

  //  ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "rgb("+randomR+","+randomB+","+randomG+")";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, volumeMeter.volume*3000*1.4, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    ctx.beginPath();
    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;
    for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height/2;

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height/2);
      ctx.stroke();

    animation = window.requestAnimationFrame( draw );
}
