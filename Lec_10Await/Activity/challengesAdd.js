const puppeteer = require("puppeteer");
const challenges = require("./challenges");
const id = "xifov12632@aramidth.com";
const pw = "123456789";

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport : null,
        args :["--start-maximized"],
    });
    let allPages =await browser.pages();
    let tab = allPages[0];
   await tab.goto("https://www.hackerrank.com/auth/login");
   await tab.type("#input-1",id);
   await tab.type("#input-2",pw);
   await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
   await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
   await tab.click('div[data-analytics="NavBarProfileDropDown"]');
   await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
   await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
   await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav", {visible:true});
   let allATags = await tab.$$(".nav-tabs.nav.admin-tabbed-nav a");
    let challengeAtag = allATags[1];
    await challengeAtag.click();
    await tab.waitForSelector(".clearfix button",{visible:true});
    let createChallengeButton = await tab.$(".clearfix button");
    let createChallengeLink = await tab.evaluate(function(elem){
     return elem.getAttribute("href");
    },createChallengeButton);
    createChallengeLink = 'https://www.hackerrank.com' + createChallengeLink;
    // await tab.goto(createChallengeLink);
    
    // 
    
    for(let i=0;i<challenges.length;i++)
    {
        addChallenge(challenges[i],browser,createChallengeLink);
        await tab.waitForTimeout(3000);
    }
    

})();

async function addChallenge(challenge,browser,challengeLink){

    // {
        //     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
        //     "Description": "Question 1",
        //     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
        //     "Input Format": "Integer",
        //     "Constraints": "n <= 10 ^ 9",
        //     "Output Format": "String",
        //     "Tags": ["Basics" , "Array" , "Getting_Started"]
        //   }

        let challengeName = challenge["Challenge Name"];
        let description = challenge["Description"];
        let problemStatement = challenge["Problem Statement"];
        let inputFormat = challenge["Input Format"];
        let constraints = challenge["Constraints"];
        let outputFormat = challenge["Output Format"];
        let tags = challenge["Tags"];

        let newTab = await browser.newPage();
        await newTab.goto(challengeLink);
        await newTab.waitForSelector("#name",{visible:true});
        await newTab.type("#name",challengeName);
        await newTab.type("#preview",description);
        await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement );
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    // await tab.waitForTimeout(3000);
    await newTab.close();
    }