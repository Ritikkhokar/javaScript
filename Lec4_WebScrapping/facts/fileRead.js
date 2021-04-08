const fs=require("fs");
const cheerio= require("cheerio");
  
let htmlkadata=fs.readFileSync("./index.html");
// console.log(htmlkadata+"");
let ch =cheerio.load(htmlkadata);
// console.log(ch);
let ptags=ch("p");
console.log(ch(ptags["1"]).text());
// console.log(ptags);
