const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const getMatch1= require("./getMatch1");

function getAllMatches1(link)
{
    request(link,cb);

}

function cb(error,response,data)
{
    parseData(data);

}


function parseData(html)
{
    let  ch= cheerio.load(html);
    let aTags=ch('a[data-hover="Scorecard"]');
    for(let i=0;i<aTags.length;i++)
    {
        let aTag= ch(aTags[i]);
         let link=aTag.attr("href");
        //  console.log(link);
        let completeLink="https://www.espncricinfo.com"+link;
        getMatch1(completeLink);
    }
}
module.exports= getAllMatches1;