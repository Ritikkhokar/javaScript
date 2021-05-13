const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
function getMatch1(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
    parseData(data);

}

function parseData(html)
{
    let ch =cheerio.load(html);
    let bothInnings=ch('.Collapsible');
    // console.log(bothInnings);
    for(let i=0;i<bothInnings.length;i++)
    {
        let inning=ch(bothInnings[i]);
        // console.log(inning);
        let teamName=inning.find("h5").text();
        // console.log(teamName);
         teamName=teamName.split("INNINGS")[0].trim();
        console.log(teamName);   

        let batsmanTable = inning.find(".table.batsman");
        // console.log(batsmanTable);
        let allTrs=ch(batsmanTable).find("tbody tr");
        for(let j=0;j<allTrs.length-1;j++)
        {
          let allTds = ch(allTrs[j]).find("td");
          if(allTds.length>1)
          {
            let batsmanName = ch(allTds['0']).text().trim();
            let runs=ch(allTds['2']).text().trim();
            let balls=ch(allTds['3']).text().trim();
            let fours = ch(allTds['5']).text().trim();
            let sixes=ch(allTds['6']).text().trim();
            let strikeRate=ch(allTds['7']).text().trim();

          
        //   console.log("Batsman name-"+ batsmanName);
        //   console.log("Runs-"+runs);
        //   console.log("balls-"+balls);
        //   console.log("fours-"+fours);
        //   console.log("sixes-"+sixes);
        //   console.log("StrikeRate-"+strikeRate);

        makingLeaderBoard(batsmanName,runs,balls,fours,sixes);
        }   
          
        }
        console.log("################################################################################");
    }
}
   


function addBatsman(name,runs,balls,fours,sixes)
{
    let batsmanPath=`./leaderBoard.json`;
    let stringifiedData= fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let details= {
        Name : name,
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
    }
    batsmanFile.push(details);
    let Data=JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,Data);
    

}

function updateBatsmanFile(name,runs,balls,fours,sixes)
{
    let batsmanPath=`./leaderBoard.json`;
    let stringifiedData= fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
   
    let isBatsman=true;

    for(let i=0;i<batsmanFile.length;i++)
    {
       if(batsmanFile[i].Name==name)
       {
        
             batsmanFile[i].Runs= batsmanFile[i].Runs + runs, 
             batsmanFile[i].Balls = batsmanFile[i].Balls+ balls, 
             batsmanFile[i].Fours = batsmanFile[i].Fours+ fours, 
             batsmanFile[i].Sixes = batsmanFile[i].Sixes+ sixes; 
            
             isBatsman=false;
           break;
       }            
    }
    let Data =JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,Data);

    if(isBatsman)
    {
        addBatsman(name,runs,balls,fours,sixes);
    }
        // batsmanFile.push(inning);
       
    
}



function makingLeaderBoard(name,runs,balls,fours,sixes)
{
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
  
    // let isBatsman=false;
    let batsmanPath=`./leaderBoard.json`;
    let stringifiedData= fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
   if(batsmanFile.length>0)
   {
    
   updateBatsmanFile(name,runs,balls,fours,sixes);

   }
   else
   {
       addBatsman(name,runs,balls,fours,sixes);
   }

       
      

}

module.exports = getMatch1;