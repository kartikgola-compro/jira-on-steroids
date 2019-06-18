'use strict';

const HUD = {
    docTitle: null,
    intv: null,
    injected: false
};

function injectHud() {
    let docTitleMatch = document.title.match(/(EXP|GO|AIO|SKL).\w*.\w*.\w*.\w*.\w*.\w*/g);
    const taskId = docTitleMatch[0].trim();
    const TASK_LAUNCH_URL = `http://localhost/sim5service/SIM5Frame.aspx?repo=TaskRepository2019.xml&task=`;
    const BALOO_LAUNCH_URL = `https://baloo.prd-prsn.com/#!/content/task/`;
    const DEV2_TASK_LAUNCH_URL = `http://dev2.comprotechnologies.com/baloosim5dev/sim5frame.aspx?resLinkID=taskid:`;

    const launchHUD = document.createElement('div');
    launchHUD.setAttribute('id', 'steroids-hud');

    const taskLaunchBtn = document.createElement('button');
    taskLaunchBtn.setAttribute('id', 'localhost-btn');
    taskLaunchBtn.innerText = 'Launch localhost';
    taskLaunchBtn.onclick = function (e) {
        window.open(TASK_LAUNCH_URL + taskId);
    }
    launchHUD.append(taskLaunchBtn);

    const dev2TaskLaunchBtn = document.createElement('button');
    dev2TaskLaunchBtn.setAttribute('id', 'dev2-btn');
    dev2TaskLaunchBtn.innerText = 'Launch dev2';
    dev2TaskLaunchBtn.onclick = function (e) {
        window.open(DEV2_TASK_LAUNCH_URL + taskId);
    }
    launchHUD.append(dev2TaskLaunchBtn);

    const balooLaunchBtn = document.createElement('button');
    balooLaunchBtn.setAttribute('id', 'baloo-btn');
    balooLaunchBtn.innerText = 'Launch BALOO';
    balooLaunchBtn.onclick = function (e) {
        window.open(BALOO_LAUNCH_URL + taskId);
    }
    launchHUD.append(balooLaunchBtn);
    document.body.append(launchHUD);

    HUD.docTitle = document.title;
    HUD.injected = true;
}

function updateHud() {
    document.getElementById('steroids-hud').remove();
    injectHud();
    chrome.runtime.sendMessage({message: 'HUD_UPDATED', data: HUD});
}

function setInjectionIntv() {
    HUD.intv = setInterval(() => {
        if ( document.title && document.title.match(/(EXP|GO|AIO|SKL).\w*.\w*.\w*.\w*.\w*.\w*/g) ) {
            injectHud();
            chrome.runtime.sendMessage({message: 'HUD_INJECTED', data: HUD});
        }
    }, 100);
}

function clearInjectionIntv() {
    clearInterval(HUD.intv);
}
