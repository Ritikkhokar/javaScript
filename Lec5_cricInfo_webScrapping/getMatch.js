const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
function getMatch(link)
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

        processData(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }   
          
        }
        console.log("################################################################################");
    }
}

function checkTeamFolder(teamName)
{
    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName,batsmanName)
{
    let batsmanPath=`./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
{
let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
let stringifiedData= fs.readFileSync(batsmanPath);
let batsmanFile = JSON.parse(stringifiedData);
let inning = {
    Runs : runs ,
    Balls : balls,
    Fours : fours,
    Sixes : sixes,
    StrikeRate : strikeRate
}
batsmanFile.push(inning);
fs.writeFileSync(batsmanPath,JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate)
{
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    let stringifiedData=JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,stringifiedData);

}
function createTeamFolder(teamName)
{
    let teamPath=`./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processData(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
{

let isTeam=checkTeamFolder(teamName);
if(isTeam)
{
let isBatsman=checkBatsmanFile(teamName,batsmanName);
if(isBatsman)
{
    updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);

}
else{
    createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
}
}
else{
    createTeamFolder(teamName);
    createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
}
}
module.exports = getMatch;