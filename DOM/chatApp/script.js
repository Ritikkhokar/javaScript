let chatInput = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chatWindow");
let userName = prompt("Enter your name");
chatInput.addEventListener("keypress",function(e)
{
console.log(e);
if(e.key == "Enter")
{
    let chatDiv  = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("right");
    chatDiv.textContent = userName + ": " + chatInput.value;
    chatWindow.append(chatDiv);
    chatInput.value = "";
}
})