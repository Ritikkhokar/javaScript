const express = require("express");


const app = express();
app.get("/",function(req,res)
{
    console.log("hello from home page");
    res.send("<h1>hello from backend</h1>");
})
let obj = {
    name: "jasbir"
}
app.get("/user",function(req,res)
{
    console.log("users");
    res.json(obj);
})

app.listen(8080,function(){
console.log("server started");
})