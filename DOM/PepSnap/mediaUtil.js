let showMediaBtn = document.querySelector("#show-media");

showMediaBtn.addEventListener("click" , function(){
    window.location.assign("./gallery.html");
});

function saveMedia(MediaType , MediaSource)
{
    let txn = db.transaction("Media","readwrite");
    let mediaStore = txn.objectStore("Media");
    let mediaFile = {
        mid : Date.now(),
        MediaType ,
        MediaSource
    }
    mediaStore.add(mediaFile);
}