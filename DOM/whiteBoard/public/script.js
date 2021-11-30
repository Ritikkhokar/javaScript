let canvas = document.querySelector("#canvas");

let {top : canvasTop} =  canvas.getBoundingClientRect();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - canvasTop;

window.addEventListener("resize",function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - canvasTop;
});

let ctx = canvas.getContext("2d");
let db=[];
let redoDB = [];
let line=[];
ctx.lineCap = 'round';
let isMouseDown = false;

canvas.addEventListener("mousedown",function(e)
{
   isMouseDown = true;
   let x = e.clientX;
   let y = e.clientY - canvasTop;
   ctx.beginPath();
   ctx.moveTo(x,y);

   let pointObject = {
    type:"md",
    x:x,
    y:y,
    color:ctx.strokeStyle,
    width:ctx.lineWidth
}
line.push(pointObject);
});

canvas.addEventListener("mousemove",function(e)
{
    if(isMouseDown)
    {
    
            let x = e.clientX;
            let y = e.clientY - canvasTop;
            ctx.lineTo(x,y);
            ctx.stroke();

            let pointObject = {
                type:"mm",
                x:x,
                y:y,
            }
            line.push(pointObject);
    }
    
});

canvas.addEventListener("mouseup",function(e)
{
isMouseDown = false;
db.push(line);
    line = [];
    console.log(db);
})
