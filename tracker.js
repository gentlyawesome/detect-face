var video = document.getElementById('video');
var canvas = document.getElementById('face-content');
var context = canvas.getContext('2d');
var tracker = new tracking.ObjectTracker('face');

//var faceDetect = document.getElementById('face-detect');
var faceDetect = document.createElement('canvas');
faceDetect.width = 320;
faceDetect.height = 240;
var faceDetectCtx = faceDetect.getContext('2d');

var faceDetectCrop = document.getElementById("face-detect-crop");
var faceDetectCropCtx = faceDetectCrop.getContext('2d');

tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

tracking.track('#video', tracker, { camera: true });

var crop = {};
tracker.on('track', function(event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  event.data.forEach(function(rect) {
    crop.x = rect.x;
    crop.y = rect.y;
    crop.width = rect.width;
    crop.height = rect.height;

    context.strokeStyle = '#a64ceb';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width - 10, rect.y - 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width - 10, rect.y - 22);

    drawVideo(faceDetectCtx, video, faceDetect.width, faceDetect.height, crop);
  });
});


function drawVideo(ctx, video, width, height, crop){
  ctx.drawImage(video, 0, 0, width, height);
  var imageData = ctx.getImageData(crop.x, crop.y, crop.width, crop.height);
  faceDetectCropCtx.putImageData(imageData, 0, 0);

  ctx.strokeStyle = '#a64ceb';
  ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
  ctx.font = '11px Helvetica';
  ctx.fillStyle = "#fff";
  ctx.fillText('x: ' + crop.x + 'px', crop.x + crop.width - 10, crop.y - 11);
  ctx.fillText('y: ' + crop.y + 'px', crop.x + crop.width - 10, crop.y - 22);

  var delay = 30;
  setTimeout(drawVideo, delay, ctx, video, width, height, crop);
}

function snapshot(){
  var img = document.getElementById('face-img');
  var dataURL = faceDetect.toDataURL();
  img.src = dataURL;
}
