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

});