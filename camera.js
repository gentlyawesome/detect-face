"use strict";
var width = 0;
var height = 0;
var video = document.getElementById('video');
var canvas = document.getElementById('face-content');
var context = canvas.getContext('2d');
var container = $('#face-container');

function noStream(){
  alert('Access to camera was denied!');
}

//video.addEventListener('loadedmetadata', function() {
//  canvas.width = video.videoWidth;
//  canvas.height = video.videoHeight;
//});
//
//video.addEventListener('play', function() {
//  var $this = this; //cache
//  (function loop() {
//    if (!$this.paused && !$this.ended) {
//      context.drawImage($this, 0, 0);
//      setTimeout(loop, 1000 / 30); // drawing at 30fps
//    }
//  })();
//}, 0);

function gotStream(stream){
  video.setAttribute('autoplay',true);
  video.srcObject = stream;

  var rotation = 0,
      loopFrame,
      centerX,
      centerY,
      twoPI = Math.PI * 2;
  
  function loop(){
    loopFrame = requestAnimationFrame(loop);
    context.save();
    context.drawImage(video, 0, 0, width, height);
    context.restore();
  }
  
  function startLoop(){ 
    loopFrame = loopFrame || requestAnimationFrame(loop);
  }
  
  video.addEventListener('loadedmetadata',function(){
    width = canvas.width = 320;
    height = canvas.height = 240;
    context.translate(width, 0);
    context.scale(-1, 1);
    centerX = width / 2;
    centerY = height / 2;
    startLoop();
  }); 
}

function start(){
  if ((typeof window === 'undefined') || (typeof navigator === 'undefined'))
     alert('This page needs a Web browser with the objects window.* and navigator.*!');
  else if (!(video && canvas))
     alert('HTML context error!');
  else
  {
  	if (navigator.getUserMedia) 
  	  navigator.getUserMedia({video:true}, gotStream, noStream);
  	else if (navigator.oGetUserMedia)
  	  navigator.oGetUserMedia({video:true}, gotStream, noStream);
  	else if (navigator.mozGetUserMedia)
  	  navigator.mozGetUserMedia({video:true}, gotStream, noStream);
  	else if (navigator.webkitGetUserMedia)
  	  navigator.webkitGetUserMedia({video:true}, gotStream, noStream);
  	else if (navigator.msGetUserMedia)
  	  navigator.msGetUserMedia({video:true, audio:false}, gotStream, noStream);
  	else alert('getUserMedia() not available from your Web browser!');
  }
}

start();
