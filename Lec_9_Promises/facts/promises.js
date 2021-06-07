const fs = require("fs");

let pendingPromise = fs.promises.readFile("./f2.txt");
console.log(pendingPromise);

pendingPromise.then(function(data){
    console.log("sucess vali call");
    console.log(data+"");
    console.log(pendingPromise);
});

pendingPromise.catch(function(error)
{
    console.log("error vali call");
    console.log(error);
    console.log(pendingPromise);
})