const cherrio = require("cheerio");
const request = require("request");
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb);

function cb(error,response,data)
{
    parseData(data);

}
let baller ={};
function parseData(html)
{
    let highWicketSoFar=0;
    let nameOfHighestWicketTaker;
    let economy;
let ch = cherrio.load(html);
let bothBowlingTables = ch('.table.bowler');
fs.writeFileSync("./bowlingTables.html",bothBowlingTables+"");

for(let i=0;i<bothBowlingTables.length;i++)
{
    let bowlingTable=ch(bothBowlingTables[i]);
    let allTrs = bowlingTable.find("tbody tr");
    // {0:tr  1:tr  2:tr  3:tr  4:tr  5:tr}
    for(let j=0;j<allTrs.length;j++)
    {
        let allTds = ch(allTrs[j]).find("td");
        let wicketsTaken=ch(allTds['4']).text();
        if(wicketsTaken>highWicketSoFar)
        {
            highWicketSoFar=wicketsTaken;
            nameOfHighestWicketTaker=ch(allTds['0']).text();  //name is present on key 0
            economy=ch(allTds['5']).text();     //economy is present on key 5
        }
    }
}

baller.nane= nameOfHighestWicketTaker;
baller.wickets=highWicketSoFar;
baller.economy=economy;
console.log(baller);
}