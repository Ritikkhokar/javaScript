let videoPlayer = document.querySelector("video");
let constraints = {video:true};
let recordButton = document.querySelector("#record-vedio");
let photoButton = document.querySelector("#capture-photo");
let recordedData;
let recordingState = false;
let zoomInButton = document.querySelector(".zoomIn");
let zoomOutButton = document.querySelector(".zoomOut");
let zoom = 1;

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
      recordButton.querySelector("div").classList.remove("record-animate");
      recordingState = false;
    //   recordButton.innerHTML = "Record";
     }
     else
     {
      mediaRecorder.start();
      recordButton.querySelector("div").classList.add("record-animate");
      recordingState = true;
    //   recordButton.innerHTML = "Recording";
     }
   });
   photoButton.addEventListener("click", capturePhotos);

   zoomInButton.addEventListener("click",function(e){
     if( zoom < 2)
     {
         zoom += 0.1;
         videoPlayer.style.transform = "scale( "+zoom+")";
     }
   });
   
   zoomOutButton.addEventListener("click",function(e){
    if(zoom>0.5)
    {
        zoom -= 0.1;
        videoPlayer.style.transform = "scale( "+zoom+")";
    }
});
  
}
catch(error)
{

}

   
})();

function saveVedioToFs()
{
    // let vedioUrl = URL.createObjectURL(recordedData);
    // console.log(vedioUrl);
    let iv = setInterval( function(){
        if(db){
          saveMedia("Video" , recordedData);
          clearInterval(iv);
        }
      }  , 100 );
    // let atag = document.createElement("a");
    // // console.log(vedioUrl);
    // atag.download="vedio.mp4";
    // atag.href = vedioUrl;
    // atag.click();
    // atag.remove();
}
function capturePhotos()
{
    photoButton.querySelector("div").classList.add("capture-animate");

    setTimeout(function(){
      photoButton.querySelector("div").classList.remove("capture-animate");
    } , 1000);
let canvas = document.querySelector("canvas");
canvas.height = videoPlayer.videoHeight;
canvas.width = videoPlayer.videoWidth;

let cxt = canvas.getContext("2d");

if(zoom != 1)
{
    cxt.translate(canvas.width/2,canvas.height/2);
    cxt.scale(zoom,zoom);
    cxt.translate(-canvas.width/2,-canvas.height/2);
}
cxt.drawImage(videoPlayer,0,0);
let imgUrl = canvas.toDataURL("image/jpg");
console.log(imgUrl);
    
      saveMedia("image" , imgUrl);
     
   

// let Atag = document.createElement("a");
//         Atag.download = "photo.jpg";
//         Atag.href = imgurl;
//         Atag.click();
//        Atag.remove();


}