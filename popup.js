// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Check if browser domain is = musi.sh √
// if its looks for div that contains title
// save that to a local file

// create a OBS plugin that reads the file contents from disk every 5 seconds
'use strict';
let timerVal = document.getElementById("text").value;
const button = document.getElementById('button');
let bodyEl = document.getElementById("bodyEl");
const fileName = "MNPSETTINGS";
let status = document.getElementById('status');



function saveTimerVal() {
    timerVal = document.getElementById("text").value;
    if (timerVal !== "" && timerVal !== undefined && timerVal >= 1) {
        save_options();
        return;
    }
    status.textContent = 'ERROR';
    status.classList.add('saved');
    bodyEl.classList.add("red");
    setTimeout(function() {
        status.classList.remove('saved');
        bodyEl.classList.remove("red");
    }, 2000);

}

button.addEventListener('click', function(){
    console.log(timerVal);
    saveTimerVal();
});





function save_options() {
    chrome.storage.sync.set({
        timerVal: timerVal
    }, function() {
        let status = document.getElementById('status');
        let currentSetting = document.getElementById('currentSetting');
        // Update status to let user know options were saved.
        status.textContent = 'Options saved.';
        currentSetting.textContent = timerVal;
        status.classList.add("saved");
        bodyEl.classList.add("green");
        setTimeout(function() {
            bodyEl.classList.remove("green");
            status.classList.remove("saved");
        }, 2000);
    });
}

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        timerVal: timerVal
    }, function(items) {
        let currentSetting = document.getElementById('currentSetting');

        console.log('loaded the value ' + items.timerVal);
        currentSetting.textContent = items.timerVal;
        let onLoadTimer = document.getElementById('text');
        onLoadTimer.value = parseInt(items.timerVal);
        status.textContent = "Grabbed your saved settings";
        status.classList.add("saved");
        bodyEl.classList.add("green");
        setTimeout(function() {
            status.textContent = '';
            bodyEl.classList.remove("green");
            status.classList.remove("saved");
        }, 2000);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);




