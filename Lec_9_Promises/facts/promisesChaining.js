const fs = require("fs");
// let f1KaPromise = fs.promises.readFile("./f1.txt");
// console.log(f1KaPromise);
// f1KaPromise.then(function(data){
//     console.log("f1 ka data"+data+"");
//    let  f2KaPromise = fs.promises.readFile("./f2.txt");
//     return f2KaPromise;
// })
// .then(function(data){
//     console.log("f2 ka data"+data+"");
//    let  f3KaPromise = fs.promises.readFile("./f3.txt");
//     return f3KaPromise;
// })
// .then(function(data){
//     console.log("f3 ka data"+data+"");
   
// })

let f1KaPromise = fs.promises.readFile("./f1.txt");
console.log(f1KaPromise);
f1KaPromise.then(function(data){
    console.log("f1 ka data"+data+"");
   let  f2KaPromise = fs.promises.readFile("./f2.txt");
   console.log(f2KaPromise);
   console.log(f1KaPromise);
   return f2KaPromise;

})


.then(function(data){
        console.log("f3 ka data  "+data+"");
    //    console.log(f2KaPromise);
    })