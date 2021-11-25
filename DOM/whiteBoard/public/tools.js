let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

let activeTool = "pencil";
pencil.addEventListener("click",function(e)
{
  if(activeTool == "pencil")
  {
      
  }
  else
  {
      activeTool = "pencil";
      ctx.strokeStyle = "blue";
  }
})
eraser.addEventListener("click",function(e)
{
  if(activeTool == "eraser")
  {
      
  }
  else
  {
      activeTool = "eraser";
      ctx.strokeStyle = "white";
  }
})

