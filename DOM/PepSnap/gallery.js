function showMedia(){
    // assume db is open !!
    let txn = db.transaction("Media" , "readonly");
    let mediaStore = txn.objectStore("Media");
    let cursorObject = mediaStore.openCursor();

    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let media = cursor.value;
            // console.log(media);
            if(media.MediaType == "image")
            {
             appendImage(media);
            }
            else
            {
             appendVedio(media);
            }
            cursor.continue();
        }
    }
}

let iv = setInterval( function(){
    if(db){
        showMedia();
        clearInterval(iv);
    }
}   , 100);

let gallery = document.querySelector(".gallery");
let backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click" , function(){
    window.location.assign("index.html");
})
function createMediaDiv()
{
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("gallery-item");
    mediaDiv.innerHTML = ` <div class="media">
                         
                           </div>
            <div class="media-buttons">
                <div class="download"><i class="fas fa-download"></i></div>
                <div class="delete"><i class="fas fa-trash"></i></div>
            </div>`
            return mediaDiv;
}

function appendImage(media)
{
let mediaDiv = createMediaDiv();
let image = document.createElement("img");
image.src = media.MediaSource;
mediaDiv.setAttribute("mid",media.mid);
mediaDiv.querySelector(".media").append(image);
gallery.append(mediaDiv);
mediaDiv.querySelector(".download").addEventListener("click",function()
{
    downloadMedia(media);
});
mediaDiv.querySelector(".delete").addEventListener("click",function()
{
    deleteMedia(media);
});
}

function appendVedio(media)
{
    let blob = new Blob([media.MediaSource], { type: "video/mp4" });
    let videoUrl = URL.createObjectURL(blob);
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid",media.mid);

    let vedio = document.createElement("video");
    
    vedio.src = videoUrl;
    
    vedio.autoplay = "true";
  vedio.loop = "true";
  vedio.controls = "true";
  mediaDiv.querySelector(".media").append(vedio);
gallery.append(mediaDiv);
mediaDiv.querySelector(".download").addEventListener("click",function()
{
    downloadMedia(media);
});
mediaDiv.querySelector(".delete").addEventListener("click",function()
{
    deleteMedia(media);
});
}

function downloadMedia(media)
{
let atag = document.createElement("a");
if(media.MediaType == "image")
{
atag.download = "image.png";
atag.href = media.MediaSource;
}
else 
{
    let blob = new Blob([media.mediaSource], { type: "video/mp4" });
  let videoUrl = URL.createObjectURL(blob);
   atag.download = "vedio.mp4";
   atag.href = videoUrl;
}
atag.click();
atag.remove();
}

function deleteMedia(media)
{
// db delete
let mid = media.mid;
let txn = db.transaction("Media","readwrite");
let mediaStore = txn.objectStore("Media");
mediaStore.delete(mid);

// ui delete
document.querySelector(`div[mid="${mid}"]`).remove();
}