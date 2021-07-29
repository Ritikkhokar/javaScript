
let filterCodes = {
    red:"#e74c3c",
    blue:"#3498db",
    green:"#2ecc71",
    black:"#34495e"
};
let selectedFilter = "black";
let allFilters = document.querySelectorAll(".ticket-filters div");
// console.log(allFilters);
let ticketContainer = document.querySelector(".tickets-container");
let openModalBtn = document.querySelector(".open-modal");

function loadTickets(){
    if(localStorage.getItem("allTickets")){
      ticketContainer.innerHTML = "";
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      for(let i=0 ; i<allTickets.length ; i++){
        let {ticketId , ticketFilter , ticketContent} = allTickets[i];
  
        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        // set the html of the ticket wala div !!
        ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketFilter}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="ticket-content">${ticketContent}</div>`;
  
        // append the ticket on the UI !!!!
        ticketContainer.append(ticketDiv);
      }
    }
  }
  loadTickets();

openModalBtn.addEventListener("click", handleOpenModal);

function handleOpenModal(e) {
  let modal = document.querySelector(".modal");
  if(modal){
    return;
  }
  let modalDiv = createModal();
  
  modalDiv
  .querySelector(".modal-textbox")
  .addEventListener("click", clearModalTextBox);
  
  modalDiv
  .querySelector(".modal-textbox")
  .addEventListener("keypress", addTicket);
  let allModalFilters = modalDiv.querySelectorAll(".modal-filter");
  
  for (let i = 0; i < allModalFilters.length; i++) {
      // add a click event on every modal filter
      allModalFilters[i].addEventListener("click", chooseModalFilter);
    }
    
    
    // append modalDiv on the ui !!
    ticketContainer.append(modalDiv)
}
function createModal()

{
let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");
modalDiv.innerHTML = `<div class="modal-textbox" data-typed="false" contenteditable="true">
Enter your task here
</div>
<div class="modal-filter-options">
<div class="modal-filter red"></div>
<div class="modal-filter blue"></div>
<div class="modal-filter green"></div>

<div class="modal-filter black active-filter"></div>
</div>`;
return modalDiv;
}
function addTicket(e) {
    if (e.key == "Enter") {
      // get the content of the modal text box !!
      let ticketId = uid();
      let modalText = e.target.textContent;
      // create a div and add class ticket to it
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");
      // set the html of the ticket wala div !!
      ticketDiv.innerHTML = ` <div class="ticket-filter ${selectedFilter}"></div>
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-content">${modalText}</div>`;
  
      // append the ticket on the UI !!!!
      ticketContainer.append(ticketDiv);
  
      // remove the modal from the ui !!!
      e.target.parentNode.remove();
    //   first time  ticket bani
      if(!localStorage.getItem('allTickets'))
      {
          let allTickets = [];
          let ticketObject = {};
          ticketObject.ticketId = ticketId;
          ticketObject.ticketFilter = selectedFilter;
          ticketObject.ticketContent = modalText;
          allTickets.push(ticketObject); 
          localStorage.setItem("allTickets",JSON.stringify(allTickets));
      }
    //   already tickets hai
      else{
          let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let ticketObject = {};
        ticketObject.ticketId = ticketId;
        ticketObject.ticketFilter = selectedFilter;
        ticketObject.ticketContent = modalText;
        allTickets.push(ticketObject); 
        localStorage.setItem("allTickets",JSON.stringify(allTickets));
      }
      // again set by default filter as black !!!
      selectedFilter = "black";
    }
}
function chooseModalFilter(e) {
    // get the filter name which is clicked !!!
    let selectedModalFilter = e.target.classList[1];
  
    // check if the clicked filter name is equals to the default filter(already selected filter) if true then go back !!!
    if (selectedModalFilter == selectedFilter) {
      return;
    }
    // set selected filter as the now choose filter !!!
    selectedFilter = selectedModalFilter;
    // remove active filter class
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    // add active filter class on now selected filter 
    e.target.classList.add("active-filter");
}
function clearModalTextBox(e){
  if(e.target.getAttribute("data-typed") == "true"){
    return;
  }
  e.target.innerHTML = "";
  e.target.setAttribute("data-typed","true");
}
for(let i=0;i<allFilters.length;i++)
{
allFilters[i].addEventListener("click",chooseFilter);

}

function chooseFilter(e)
{
  if(e.target.classList.contains("active-filter"))
  {
     e.target.classList.remove('active-filter');
    // console.log(filter);
    loadTickets();
    return;
  }
// remove active filter from already selected filter
  if(document.querySelector(".filter.active-filter"))
  {
    document.querySelector(".filter.active-filter").classList.remove("active-filter");
  }
  // add active filter on now selected filter !!
  e.target.classList.add("active-filter");
  let ticketFilter = e.target.classList[1];
  // console.log(ticketFilter);
  loadSelectedTickets(ticketFilter);
}


function loadSelectedTickets(ticketFilter)
{
  if(localStorage.getItem("allTickets"))
  {
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));

    let filteredTickets = allTickets.filter( function(filterObject){
      return filterObject.ticketFilter == ticketFilter;
    });
    // console.log(localStorage.getItem("allTickets"));
    // console.log(filteredTickets);
  
  ticketContainer.innerHTML = "";
  for(let i=0 ; i<filteredTickets.length ; i++){
    let {ticketId , ticketFilter , ticketContent} = filteredTickets[i];

    let ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");
    // set the html of the ticket wala div !!
    ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketFilter}"></div>
    <div class="ticket-id">#${ticketId}</div>
    <div class="ticket-content">${ticketContent}</div>`;

    // append the ticket on the UI !!!!
    ticketContainer.append(ticketDiv);
  }
  }
}