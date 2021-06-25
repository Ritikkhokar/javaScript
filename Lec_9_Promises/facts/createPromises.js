const fs = require("fs");
 function myPromiseFun(filePath){
     return new Promise(function(resolve,reject){
         fs.readFile(filePath,function(error,data){
             if(data)
             {
                 resolve(data);
             }
             else
             {
                 reject(error);
             }
         });

     })
 }
 let pendingPromise = myPromiseFun("./f1.txt");
 console.log(pendingPromise);
pendingPromise.then(function(data){
     console.log(data+"");
 })