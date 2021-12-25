console.log();

let puppeteer = require("puppeteer");
let emailPassObj = require("./secret");
let {answer} = require("./code")

let openBrowserPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null,
    args :["--start-maximized", "--disalbe-notification"]
});

let page, browser;
openBrowserPromise.then(function(browserObj){
    browser = browserObj;
    let openNewTabInBrowserPromise = browserObj.newPage();
    return openNewTabInBrowserPromise;
}).then(function(newtab) {
    page = newtab;
    let gotoUrlPromise = newtab.goto("https://www.google.com");
    return gotoUrlPromise;
}).then(function() {
    let typePromise = page.type(".gLFyf.gsfi", "hacker rank");
    return typePromise;
}).then(function(){
    let pressEnterPromise = page.keyboard.press("Enter");
    return pressEnterPromise;
}).then(function(){
    let bothWaitNClickPromise = waitAndClick(".LC20lb.DKV0Md", page);
    return bothWaitNClickPromise;
}).then(function(){
    let againBothPromise = waitAndClick('#menu-item-2887', page);
    return againBothPromise;
}).then(function () {
    let youCanWaitPromise = page.waitForSelector(".fl-button", {visible : true});
    return youCanWaitPromise;
}).then(function(){
    let allElemArrayPromise = page.$$(".fl-button");
    return allElemArrayPromise;
}).then(function(array){
    let myElementPromise = array[1].click();
    return myElementPromise; 
}).then(function(){
    let emailWaitPromise = page.waitForSelector('#input-1', {visible : true});
    return emailWaitPromise;    
}).then(function(){
    let emailPromise = page.type("#input-1", emailPassObj.email, {delay : 100});
    return emailPromise;
}).then(function(){
    let passwordPromise = page.type("#input-2",emailPassObj.password, {delay :100});
    return passwordPromise;
}).then(function(){
    let enterLoginPromise = page.click('button[data-analytics="LoginPassword"]', {delay : 200});
    return enterLoginPromise;
}).then(function(){
    let waitToAppearPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
    return waitToAppearPromise;
}).then(function(){
    let warmupPromsie = waitAndClick('input[value="warmup"]', page);
    return warmupPromsie;
}).then(function(){
    let waitFor3SecPromise = page.waitFor(1000);
    return waitFor3SecPromise;
}).then(function(){
    let allQuestionsArrayPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay : 50});
    return allQuestionsArrayPromise;
}).then(function(questionsArray){
    console.log("total Number of Questions : ", questionsArray.length);
    let questionSolvedPromise = questionsSolver(page, questionsArray[0], answer[0]);  
})

function waitAndClick(selector, page) {
    return new Promise(function(reslove, reject) {
        let justWaitPromise = page.waitForSelector(selector, {visible : true});
        justWaitPromise.then(function () {
            let justClickPromise = page.click(selector);
            return justClickPromise;
        }).then(function(){
            reslove();
        }).catch(function(error){
            reject(error);
        })
    })
}

function questionsSolver(page, question, answer) {
    return new Promise(function(resolve, reject){
        let clickedOnQuestionPromise = question.click();
        clickedOnQuestionPromise.then(function (){
            let waitForEditorTobeInFocoused = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitForEditorTobeInFocoused;
        }).then(function(){
            let waitForCheckBoxPromise = waitAndClick(".checkbox-input", page, {delay : 10});
            return waitForCheckBoxPromise;
        }).then(function(){
            let canYouWaitPromise = page.waitForSelector("textarea.custominput", {visible : true});
            return canYouWaitPromise;
        }).then(function(){
            let typeInTextAreapromise = page.type('textarea.custominput', answer, {delay : 10});
            return typeInTextAreapromise;;
        }).then(function(){
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function(){
            let AisPressedPromise = page.keyboard.press("A", {delay : 50});
            return AisPressedPromise;
        }).then(function(){
            let XisPressedPromise = page.keyboard.press("X", {delay : 50});
            return XisPressedPromise;
        }).then(function(){
            let releaseCtrlPromise = page.keyboard.up("Control");
            return releaseCtrlPromise;
        }).then(function (){
            let waitForEditorTobeInFocoused = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitForEditorTobeInFocoused;
        }).then(function(){
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function(){
            let AisPressedPromise = page.keyboard.press("A", {delay : 50});
            return AisPressedPromise;
        }).then(function(){
            let XisPressedPromise = page.keyboard.press("V", {delay : 50});
            return XisPressedPromise;
        }).then(function(){
            let releaseCtrlPromise = page.keyboard.up("Control");
            return releaseCtrlPromise;
        }).then(function(){
            let finalClickPromise = page.click(".hr-monaco-submit",{delay : 50});
            return finalClickPromise;
        })
        .then(function (){
            resolve();
        }).catch(function(error){
            reject(error);
        })
    })
}