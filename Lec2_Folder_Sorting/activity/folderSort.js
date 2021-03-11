const fs=require("fs");
// const { copyFile } = require("node:fs");
const path=require("path");
let folderPath = "./Downloads";
let extensions = require("./util");
let extfolderPath;

console.log(extensions);




 function checkFolder(extension)
{
for(key in extensions)
{
if(extensions[key].includes(extension))
{
extfolderPath=`${folderPath}/${key}`
break;
}
}
return fs.existsSync(extfolderPath);
}




function moveFile(fileName){
    // copyFile
    let SourceFilePath=`${folderPath}/${fileName}`;
    let DestinationFilePath=`${extfolderPath}/${fileName}`;
   fs.copyFileSync(SourceFilePath,DestinationFilePath);
    // delete file
fs.unlinkSync(SourceFilePath);
}





function createFolder(){
    fs.mkdirSync(extfolderPath);

}






function sortFolder(folderPath){
// get content of folderpath
let content = fs.readdirSync(folderPath);
// console.log(content);
for(let i=0; i<content.length;i++)
{
let extensionname=path.extname(content[i]);
// console.log(extensioname);
let extFolderExist =checkFolder(extensionname);
if(extFolderExist)
{
    moveFile(content[i]);
}
else{
    createFolder();
    // movefile
}
}
}
sortFolder(folderPath);
