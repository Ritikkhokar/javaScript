let title  = document.querySelectorAll(".titile");
let allOptions = document.querySelectorAll(".allOptions");
let option1 = document.getElementById('11');
let option2 = document.getElementById('12');
let option3 = document.getElementById('13');
let option4 = document.getElementById('14');
// console.log(option1);

for(let i = 0;i<title.length;i++)
{
title[i].addEventListener("click",function(e)
{
    if(e.target.classList.contains("active"))
    {  
        e.target.classList.remove("active");
        for(let i=0;i<allOptions.length;i++)
        {
            if(allOptions[i].classList.contains("hide"))
            return;
            else{
                allOptions[i].classList.add("hide");

            }
        }

        
    }
    else{
        for(let j = 0;j<title.length;j++)
        {
            if(title[j].classList.contains("active"))
            {
                title[j].classList.remove("active");
               
            }
        }
        e.target.classList.add("active");
        console.log(e.target.id);
        option1.classList.remove("hide");
         let val = document.getElementById(e.target.id+10 +"");
         console.log(val);
        val.classList.remove("hide");
        
    }
});
}