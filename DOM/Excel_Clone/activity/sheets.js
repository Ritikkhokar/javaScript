let addSheetBtn = document.querySelector(".add-sheet");
let sheetsList = document.querySelector(".sheets-list");
let sheetId = 0;
addSheetBtn.addEventListener("click",function(e)
{
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
     let sheetDiv = document.createElement("div");
     sheetDiv.classList.add("sheet");
     sheetDiv.classList.add("active-sheet");
     sheetDiv.setAttribute("sheetid",sheetId);
     sheetDiv.innerHTML = `Sheet ${sheetId + 1}`;
     sheetsList.append(sheetDiv);
     //UI should be new
     initUI();
      // new sheet db 
  // sheetsdb.push(new sheet db)
  // db = new sheet db
  initdb();

});

sheetsList.addEventListener("click",function(e)
{
let selectedsheet = e.target;
if(selectedsheet.classList.contains("active-sheet"))
{
    return;
}
document.querySelector(".active-sheet").classList.remove("active-sheet");
selectedsheet.classList.add("active-sheet");

initUI();

  //set current db to active sheet db;
  let sheetId = selectedsheet.getAttribute("sheetid");

  // set db and visited cells
  db = sheetsDB[sheetId].db;
  visitedCells = sheetsDB[sheetId].visitedCells;

  // set UI according to that db
  setUI();
});

function setUI()
{
    for(let i=0 ; i<visitedCells.length ; i++){
        let {rowId , colId} = visitedCells[i];
        let cellObject = db[rowId][colId];
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).innerHTML = cellObject.value;
      }
}  

function initUI(){
    for(let i=0;i<visitedCells.length;i++)
    { 
        let {rowId,colId} = visitedCells[i];
        document.querySelector(`div[rowid = "${rowId}"][colid = "${colId}"]`).innerHTML = '';

    }
} 