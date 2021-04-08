let fs=require("fs");
let f1kadata=fs.readFileSync("./f1.txt");
f1kadata += "";
console.log(f1kadata);
//  -s removes extra spaces
let data=f1kadata.split("\r\n");

console.log(data);
let lineNumber=[];
 let removedspace=[];
let space=false;
function removingSpace(data)
{
 for(let i=0;i<data.length;i++)
 {
    if(data[i]=='' && !space)
    {
        removedspace.push(data[i]);
        space=true;

    }
    else if(data[i] != '')
    {
        removedspace.push(data[i]);
         if(i<data.length-1)
         {
             space=false;
         }
    }
 }

}
removingSpace(data);
let joinedString=removedspace.join("\n");
console.log(joinedString);

// -b for giving line numbers to empty lines
// function lineNnumberToEmptySpace()
// {
//     let count=1;

// for(let i=0;i<data.length;i++)
//  {
//     if(data[i]=='')
//     {
//         lineNumber.push('');
//         // space=true;

//     }
//     else if(data[i] != '')
//     {
//         lineNumber.push(count+" "+data[i]);
//          count++;
//     }
    
//  }
// }
// lineNnumberToEmptySpace(data);
// let joinedString=lineNumber.join("\n");
// console.log(joinedString);