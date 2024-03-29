let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");

request("https://github.com/topics" , parseData);

function parseData(error ,response,data)
{
let ch = cheerio.load(data);
let allATags = ch('.topic-box a');

for(let i = 0; i<allATags.length; i++)
{
    let topicLink = ch(allATags[i]).attr("href");
    let completeTopicLink = "https://www.github.com"+topicLink;
    getIssuesOfATopic(completeTopicLink);
}
}


function getIssuesOfATopic(topicLink)
{
// console.log(topicLink);
request(topicLink, parseTopic);

}

function parseTopic(error ,response ,data)
{
    let ch = cheerio.load(data);
    let topicName = ch('.h1').text().trim();
    console.log(topicName);
    if(!fs.existsSync(`./${topicName}`))
    {
        fs.mkdirSync(`./${topicName}`);
    }
    let allProjectArticleTags = ch('.border.rounded.color-shadow-small.color-bg-secondary.my-4');
    for(let i=0; i<5; i++)
    {
      workingOnSingleProject(allProjectArticleTags[i],topicName);
    }
}

function workingOnSingleProject(projectArticleTag,topicName)
{
    let projectName= cheerio(projectArticleTag).find('a.text-bold').text().trim();

    let allNavLinks = cheerio(projectArticleTag).find('.tabnav-tabs a');

    let issueLink = cheerio(allNavLinks["1"]).attr('href');
   
    let completeIssueLink = "https://www.github.com"+issueLink;

    let projectPath = `./${topicName}/${projectName}`;
    if(!fs.existsSync(projectPath))
    {
        fs.mkdirSync(projectPath);
    }

    request(completeIssueLink,parseIssue);


function parseIssue(error,response,data)
{

let ch = cheerio.load(data);
let allIssuesATags = ch('.js-navigation-container.js-active-navigation-container .js-issue-row .flex-auto a.h4');
for(let i=0;i<allIssuesATags.length;i++)
{
    let issueName = ch(allIssuesATags[i+""]).text().trim();
    let issueLink = ch(allIssuesATags).attr("href");
    issueLink = "https://www.github.com"+issueLink;
    if(!fs.existsSync(`./${projectPath}/issues.json`))
    {
        fs.writeFileSync(`./${projectPath}/issues.json`,JSON.stringify([]));
    }
    else
    {
        let issues = JSON.parse(fs.readFileSync(`${projectPath}/issues.json`));
                let newIssue = {
                    "Issue Name":issueName,
                    "Issue Link":issueLink
                }
                issues.push(newIssue);
                fs.writeFileSync(`${projectPath}/issues.json` , JSON.stringify(issues));
    }
}

}

}
