const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const getAllMatches1=require("./getAllMatches1");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);

function cb(error,response,data)
{
    parseData(data);

}
 
function parseData(html)
{
let ch = cheerio.load(html);
let aTag=ch(".widget-items.cta-link a");
// let link = aTag['0']["attribs"]["href"];
let link = aTag.attr("href");
// console.log(link);
let completeLink= "https://www.espncricinfo.com"+link;
// console.log(completeLink);
getAllMatches1(completeLink);
}