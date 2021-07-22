const puppeteer = require("puppeteer");
const id = "sosowa8283@pidhoes.com";
const pw = "123456789";
let tab;
let idx;
let gcode;
let browserOpenPromise = puppeteer.launch({ 
    headless : false,
    defaultViewport : null,
    args :["--start-maximized"],
});
// console.log(browserOpenPromise);


 browserOpenPromise.then(function(browser){
     console.log("browser opened");
    //  console.log(browser);
     let allPagesPromise = browser.pages();
     return allPagesPromise;
 })

 .then(function(pages){
      tab = pages[0];
    //  console.log(tab);
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;

 })
 .then(function(){
     let idTypePromise = tab.type("#input-1",id);
     return idTypePromise;
 })
 .then(function(){
      let pwTypePromise = tab.type("#input-2",pw);
      return pwTypePromise;
 })
 .then(function(){
     console.log("id and password type");
 })
 .then(function(){
     let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
     return loginPromise;
 })

 .then(function(){
     console.log("logged in hackerRank");
     let waitAndClickPromise = waitAndClick("#base-card-1-link");
     return waitAndClickPromise;
 })
 .then(function(){
    
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
 })
 
 .then(function(){
     let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item",{visible : true});
     return waitPromise;
 })

 .then(function(){
     let allQuesATagsPromise = tab.$$(".js-track-click.challenge-list-item");
     return allQuesATagsPromise;
 })

 .then(function(allATags){
     let allLinksPromise =[];

     for(let i=0;i < allATags.length;i++)
     {
        let ATag = allATags[i];
        let linkPromise = tab.evaluate(function (elem) {
            return elem.getAttribute("href");
          }, ATag);
          allLinksPromise.push(linkPromise);
        }
        // allLinksPromise = [ Promise<link> , Promise<link> , Promise<link> , Promise<link> ];
        let sbkaPromise = Promise.all(allLinksPromise);
        // return Promise<Pending>
        return sbkaPromise; //Promise<Pending> => Promise<[link , link , link , link]>
      })

      .then(function(allLinks){
          let completeLinks = allLinks.map(function(link)
          {
              return "https://www.hackerrank.com"+link;
          });
          
          let oneQuestionSolvePromise = solveQuestion(completeLinks[0]);
           
          for(let i=1;i<completeLinks.length;i++)
          {
              oneQuestionSolvePromise = oneQuestionSolvePromise.then(function(){
                  let nextQuestionSolvePromise = solveQuestion(completeLinks[i]);
                  return nextQuestionSolvePromise;

              })
          }
          return oneQuestionSolvePromise;

        })
          .then(function(){
              console.log("all questions solved sucessfully");
            
        })
        .catch(function(error){
            console.log(error);
        });

      

function solveQuestion(qLink)
{
    return new Promise(function(resolve,reject){
        let gotoPromise = tab.goto(qLink);
        gotoPromise.then(function(){
       let waitPromise = waitAndClick('div[data-attr2="Editorial"]');
       return waitPromise;

        })
        .then(function(){
              let lockBtnPromise = handleLockBtn();
              return lockBtnPromise;
            })
        .then(function(){
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            let pasteCodePromise = pasteCode();
            return pasteCodePromise;
        })
        .then(function () {
            let submitPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
            return submitPromise;
          })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}

function pasteCode(){
    return new Promise(function(resolve,reject){
        let problemTabClickPromise = tab.click('div[data-attr2="Problem"]');
        
        problemTabClickPromise.then(function(){
            let waitAndClickPromise = waitAndClick(".checkbox-input");
            return waitAndClickPromise;
        })
        .then(function(){
            let waitForTextBoxPromise = tab.waitForSelector("#input-1") //*********************************** */
             return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypePromise = tab.type("#input-1",gcode);
            return codeTypePromise;
        })
        .then(function(){
            let controlKeyDownPromise = tab.keyboard.down("Control");
            return controlKeyDownPromise;
        })
        .then(function(){
            let aKeyPressPromise = tab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let xKeyPressPromise = tab.keyboard.press("X");
            return xKeyPressPromise;
        })
        .then(function(){
            let clickOnEditor = tab.click(".monaco-editor.no-user-select.vs");
            return clickOnEditor;
        })
        .then(function(){
            let aKeyPressPromise = tab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let vKeyPressPromise = tab.keyboard.press("V");
            return vKeyPressPromise;
        })
        .then(function(){
            let controlKeyUpPromise = tab.keyboard.up("Control");
            return controlKeyUpPromise;
        })
        .then(function(){
           
            resolve();
        })
        .catch(function(error){
            reject(error);
        });
        
    });
}

function getCode()
{
    return new Promise(function(resolve,reject){
        let waitPromise = tab.waitForSelector(".hackdown-content h3");
        waitPromise.then(function(){
            
                let allCodeNamesElementsPromise = tab.$$(".hackdown-content h3");
                return allCodeNamesElementsPromise;
            
        })
        .then(function(allCodeNamesElement){
            let allCodeNamesPromise =  [];
            for(let i=0;i<allCodeNamesElement.length;i++)
            {
               let codeNamePromise = tab.evaluate(function(elem){
                   return elem.textContent;
               },allCodeNamesElement[i]);
               allCodeNamesPromise.push(codeNamePromise);
            }
            let sabkaPromise = Promise.all(allCodeNamesPromise);
           return sabkaPromise;
        })
        .then(function(codeNames){
            for(let i=0;i<codeNames.length;i++)
            {
                if(codeNames[i]=="C++")
                {
                    idx = i;
                    break;
                }
            }
            let allCodeDivPromise = tab.$$('.hackdown-content .highlight');
            return allCodeDivPromise;
        })
         .then(function(allCodeDivs){
             let codeDiv = allCodeDivs[idx];
             let codePromise = tab.evaluate(function(elem){
                 return elem.textContent;
             },codeDiv)
             return codePromise;
            
         })
         .then(function(code){
             gcode = code;
             console.log(gcode);
             resolve();


         })
         .catch(function(error){
             reject(error);
         });
    });
}

 function waitAndClick(selector)
 {
     return new Promise(function(resolve,reject)
     {
         let waitPromise = tab.waitForSelector(selector,{visible : true});
         waitPromise.then(function(){
             let clickPromise = tab.click(selector);
             return clickPromise;
         })
         .then(function(){
             resolve();
         })
         .catch(function(error){
            reject(error);
         });
         
     });
 }
 function handleLockBtn(){
    return new Promise( function(resolve , reject){
      let waitPromise = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
      waitPromise.then(function(){
        let lockBtnPromise = tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        return lockBtnPromise;
      })
      .then(function(lockBtn){
        // console.log(lockBtn);
        let lockBtnClickPromise = lockBtn.click();
        return lockBtnClickPromise;
      })
      .then(function(){
        // clicked on lock btn
        // lock btn found
        console.log("lock btn found !!!");
        resolve();
      })
      .catch(function(error){
        // lock btn not found
        console.log("lock btn not found !!!");
        resolve();
      })
  
    })
  }