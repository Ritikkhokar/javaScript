let todoInput = document.querySelector(".todo-input");
let addtodoButton = document.querySelector(".add-todo");
let todoList = document.querySelector(".todo-list");


function addTodo()
{
    let todo = todoInput.value;
    if(todo)
    {
        let listItem = document.createElement("li");
        listItem.classList.add("todo-item");
    
        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;
    
        let deletButton = document.createElement("button");
        deletButton.classList.add("delete-task");
        deletButton.innerHTML = "delete";
    
        deletButton.addEventListener("click",function(e)
    {
        // console.log(e);
        e.target.parentNode.remove();
        
    });
        listItem.append(pTag);
        listItem.append(deletButton);
        todoList.append(listItem);
        todoInput.value = "";
    
    }
    else{
        alert("You Haven't Entered Any Todo !!!");
    }
}
// events
addtodoButton.addEventListener("click",function (e)
{
addTodo();
});
todoInput.addEventListener("keypress",function(e)
{
if(e.key == "Enter")
{
    addTodo();
}
});

