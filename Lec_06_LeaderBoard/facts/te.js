const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");



function updateBatsmanFile(name,runs,balls,fours,sixes)
{
    let batsmanPath=`../leaderBoard.json`;
    let stringifiedData= fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    var a = parseInt(runs);
    var b = parseInt(balls);
    var c = parseInt(fours);
    var d = parseInt(sixes);

    for(let i=0;i<batsmanFile.length;i++)
    {
      if(batsmanFile[i].Name==name)
      {
        
             batsmanFile[i].Runs= batsmanFile[i].Runs + a, 
             batsmanFile[i].Balls = batsmanFile[i].Balls+ b, 
             batsmanFile[i].Fours = batsmanFile[i].Fours+ c, 
             batsmanFile[i].Sixes = batsmanFile[i].Sixes+ d; 
        
                     
      
        // batsmanFile.push(inning);
        let Data =JSON.stringify(batsmanFile);
         fs.writeFileSync(batsmanPath,Data);
      }
    }
}
updateBatsmanFile("vijjy",100,56,6,8);
updateBatsmanFile("ritik",200,50,11,16);
function process()
{
    
    let isBatsman=false;
    let batsmanPath=`../leaderBoard.json`;
    let stringifiedData= fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
   if(batsmanFile.length>0)
   {
       
   }
   else
   {
       addBatsman();
   }
      
}