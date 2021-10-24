let videoPlayer = document.querySelector("video");
let constraints = {video:true};
let recordButton = document.querySelector("#record-vedio");
let photoButton = document.querySelector("#capture-photo");
let recordedData;
let recordingState = false;


(async function(){
    // let devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices);
try

   { 
       let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(mediaStream);

    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);
    // console.log(mediaRecorder);
    mediaRecorder.onstart = function(e)
    {
        console.log("recording start");
        // console.log(e);
    }

    mediaRecorder.onstop = function(e)
    {
        console.log("recording stop");
        // console.log(e);
    }
    mediaRecorder.ondataavailable = function(e)
    {
        console.log("recording saved");
        console.log(e);
        recordedData = e.data;
        saveVedioToFs();
    }
   
   recordButton.addEventListener("click",function(){
     if(recordingState)
     {
      mediaRecorder.stop();
      recordingState = false;
      recordButton.innerHTML = "Record";
     }
     else
     {
      mediaRecorder.start();
      recordingState = true;
      recordButton.innerHTML = "Recording";
     }
   });
   photoButton.addEventListener("click", capturePhotos);
  
}
catch(error)
{

}

   
})();

function saveVedioToFs()
{
    let vedioUrl = URL.createObjectURL(recordedData);
    let atag = document.createElement("a");
    // console.log(vedioUrl);
    atag.download="vedio.mp4";
    atag.href = vedioUrl;
    atag.click();
    atag.remove();
}
function capturePhotos()
{
let canvas = document.querySelector("canvas");
canvas.height = videoPlayer.videoHeight;
canvas.width = videoPlayer.videoWidth;

let cxt = canvas.getContext("2d");
cxt.drawImage(videoPlayer,0,0);
let imgurl = canvas.toDataURL("image/jpg");
let Atag = document.createElement("a");
        Atag.download = "photo.jpg";
        Atag.href = imgurl;
        Atag.click();
       Atag.remove();


}