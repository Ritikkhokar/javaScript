
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellsContentDiv.addEventListener("scroll",function(e)
{
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";
})
for(let i=0;i<allCells.length;i++)
{
    allCells[i].addEventListener("click",function(e)
    {
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        // console.log(rowId,colId);
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
        addressInput.value = address;
        formulaInput.value = cellObject.formula;
        if(lastSelectedCell)
        {
            lastSelectedCell.classList.remove("active-cell");

        }
        e.target.classList.add("active-cell");
        cellObject.fontStyle.bold
      ? document.querySelector(".bold").classList.add("active-font-style")
      : document.querySelector(".bold").classList.remove("active-font-style");
       
      cellObject.fontStyle.italic
      ? document.querySelector(".italic").classList.add("active-font-style")
      : document.querySelector(".italic").classList.remove("active-font-style");
      
      cellObject.fontStyle.underline
      ? document.querySelector(".underline").classList.add("active-font-style")
      : document.querySelector(".underline").classList.remove("active-font-style");
    });

    allCells[i].addEventListener("focusout",function(e)
    {
        // console.log("out of focus");
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];
        // console.log(cellValue);
        if(cellObject.value == cellValue)
        {
            // console.log("same value");
            return;
        }
        if(cellObject.formula){
            removeFormula(cellObject);
            //formulaInput value = ""
            formulaInput.value="";
        }
        cellObject.value = cellValue;
        updateChildrens(cellObject);

        if(cellObject.visited)
        {
            return;
        }
        cellObject.visited = true;
        visitedCells.push({rowId:rowId , colId:colId});
        console.log(sheetsDB);
    });
    allCells[i].addEventListener("keydown" , function(e){
        if(e.key == "Backspace"){
            let cell = e.target;
            let {rowId , colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                cellObject.formula = "";
                formulaInput.value = "";
                removeFormula(cellObject);
                cell.textContent = "";
            }
        }
    });
}
//  when someone leaves the formula input
formulaInput.addEventListener("focusout",function(e)
{
    let formula = e.target.value;
    if(formula){
        let {rowId , colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        // if cellObject already had a formula
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let computedValue = solveFormula(formula,cellObject);
        // formula update
        cellObject.formula = formula;
        // cellObject value update
        cellObject.value = computedValue;
        // ui update
        lastSelectedCell.textContent = computedValue;
        // console.log(db);
         // update childrens !!!
         updateChildrens(cellObject);
         if(cellObject.visited){
            return;
        }
        cellObject.visited = true;
        visitedCells.push({rowId:rowId , colId:colId})
        console.log(sheetsDB);
    }
})
