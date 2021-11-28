let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = pencil.querySelector(".tool-Options-pencil");
let eraserOptions = eraser.querySelector(".tool-Options-eraser");
let pencilSize = pencil.querySelector("input");
let eraserSize = eraser.querySelector("input");
let pencilColour = pencil.querySelectorAll(".pencil-colour div");
let currentPencilSize = 1;
let currentEraserSize = 1;
let activeTool = "pencil";
let currentPencilColour = "black";

for(let i=0;i<pencilColour.length;i++)
{
    pencilColour[i].addEventListener("click",function(e)
    {
       let selectedPencilColour = e.target.className;
       ctx.strokeStyle = selectedPencilColour;
       currentPencilColour = selectedPencilColour;
    })
}
pencil.addEventListener("click",function(e)
{
  if(activeTool == "pencil")
  {
      if(pencilOptions.classList.contains("hide"))
      {
         pencilOptions.classList.remove("hide");
      }
      else{
        pencilOptions.classList.add("hide");
      }
  }
  else
  {
      activeTool = "pencil";
      ctx.strokeStyle = currentPencilColour;
      ctx.lineWidth = currentPencilSize;
      eraserOptions.classList.add("hide");
  }
})
eraser.addEventListener("click",function(e)
{
  if(activeTool == "eraser")
  {
    if(eraserOptions.classList.contains("hide"))
    {
       eraserOptions.classList.remove("hide");
    }
    else{
      eraserOptions.classList.add("hide");
    }
  }
  else
  {
      activeTool = "eraser";
      ctx.strokeStyle = "white";
      ctx.lineWidth = currentEraserSize
      pencilOptions.classList.add("hide");
  }
})

pencilSize.addEventListener("change",function()
{
   let updatedPencilSize = pencilSize.value;
   ctx.lineWidth = updatedPencilSize;
   currentPencilSize = updatedPencilSize;
});
eraserSize.addEventListener("change",function()
{
    let updatederaserSize = eraserSize.value;
    ctx.lineWidth = updatederaserSize;
    currentEraserSize = updatederaserSize;
});

