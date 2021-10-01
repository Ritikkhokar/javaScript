let onlineList = document.querySelector(".online-list");

socket.emit("userConnected",userName);

socket.on("join",function(userObject)
{
    let joinDiv = document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent = `${userObject.username} joined the chat`;
    chatWindow.append(joinDiv);
    addInOnlineList(userObject);
})

socket.on("leave",function(userObject)
{
    let leaveDiv = document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent = `${userObject.username} leave the chat`;
    chatWindow.append(leaveDiv);
    deleteFromOnlineList(userObject.id);
})

socket.on("chatLeft",function(chatObj)
{
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.textContent = chatObj.userName + ":" + chatObj.chat;
    chatWindow.append(chatDiv);
})

socket.on("online-list",function(userList)
{
    for(let i=0 ; i<userList.length ; i++){
        if(userList[i].id != socket.id){
            let userDiv = document.createElement("div");
            userDiv.classList.add("user");
            userDiv.setAttribute("id" , userList[i].id);

            userDiv.innerHTML = ` <div class="user-image">
             <img src="default.jpg" alt="">
            </div>
             <div class="user-name">${userList[i].username}</div>`

             onlineList.append(userDiv);
        }
    }
})

function addInOnlineList(userObj)
{
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.setAttribute("id" , userObj.id);

    userDiv.innerHTML = ` <div class="user-image">
     <img src="default.jpg" alt="">
    </div>
     <div class="user-name">${userObj.username}</div>`

     onlineList.append(userDiv);
} 
function  deleteFromOnlineList(id)
{
    document.querySelector(`#${id}`).remove();
}