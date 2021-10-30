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
}

function appendVedio(media)
{
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid",media.mid);

    let vedio = document.createElement("video");
    let source = document.createElement("source");
    source.src = media.MediaSource;
    vedio.append(source);
    vedio.autoplay = "true";
  vedio.loop = "true";
  mediaDiv.querySelector(".media").append(vedio);
gallery.append(mediaDiv);
}