const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");
let url="https://www.espncricinfo.com/series/ipl-2019-1165643/chennai-super-kings-vs-mumbai-indians-final-1181768/ball-by-ball-commentary";
request(url,cb);
function cb(error,response,body){
// fs.writeFileSync("./home.html",body+"");
parseBody(body);

}
function parseBody(html)
{
let ch=cheerio.load(html);
let need=ch('#main-container > div.match-page-wrapper.commentary-page-wrapper > div.container > div.row > div.col-16.col-md-16.col-lg-12.main-content-x > div.match-body > div.comment-container > div.mb-5 > div > div:nth-child(2) > div.match-comment > div > div.col-14.col-md-15.col-lg-14 > div > div > div.match-comment-long-text > p').text();
console.log(need);
// let comentry=ch(need['1']).text();
// console.log(comentry);

}