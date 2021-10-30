let db;

let openDbRequest = indexedDB.open("Gallery");

openDbRequest.onupgradeneeded = function(e)
{
    db = e.target.result;
    db.createObjectStore("Media",{keyPath : "mid"})
}

openDbRequest.onsuccess = function(e)
{
    db = e.target.result;

}

