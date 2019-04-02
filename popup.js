// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Check if browser domain is = musi.sh √
// if its looks for div that contains title
// save that to a local file

// create a OBS plugin that reads the file contents from disk every 5 seconds
'use strict';
let timerVal      = document.getElementById("text").value;
const button      = document.getElementById('button');
let status        = document.getElementById('status');
let statusPanel        = document.getElementById('statusPanel');
let currentInfo   = document.getElementById('currentInfo');
let TimerValueToRefresh = 1;

function saveTimerVal() {
    timerVal = document.getElementById("text").value;
    if (timerVal !== "" && timerVal !== undefined && timerVal >= 1) {
        save_options();
        return;
    }
    status.textContent = 'ERROR';
    status.classList.add('saved');
    statusPanel.classList.add('InfoPanel--Show', 'red');
    setTimeout(function() {
        status.classList.remove('saved');
        statusPanel.classList.remove('InfoPanel--Show', 'red');
    }, 2000);

}

button.addEventListener('click', function(){
    saveTimerVal();
});





function save_options() {
    chrome.storage.sync.set({
        timerVal: timerVal
    }, function() {
        let status = document.getElementById('status');
        // Update status to let user know options were saved.
        status.textContent = 'Settings saved';
        statusPanel.classList.add('InfoPanel--Show', 'green');

        status.classList.add("saved");
        setTimeout(function() {
            status.classList.remove("saved");
            statusPanel.classList.remove('InfoPanel--Show', 'green');

        }, timerVal);
    });
}

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        timerVal: timerVal
    }, function(items) {

        TimerValueToRefresh = items.timerVal;
        let onLoadTimer = document.getElementById('text');
        onLoadTimer.value = parseInt(items.timerVal);
        status.textContent = "Loaded Settings";
        status.classList.add("saved");
        statusPanel.classList.add('InfoPanel--Show', 'green');

        setTimeout(function() {
            status.textContent = '';
            statusPanel.classList.remove('InfoPanel--Show', 'green');

            status.classList.remove("saved");
        }, 2000);
    });
}
function show_artist() {
    // Use default value color = 'red' and likesColor = true.

    chrome.storage.sync.get(['playing'], function (result) {
        if (result.playing === 'true' || result.playing) {
            chrome.storage.sync.get(['artistName'], function (result) {
                let artistNameSelector = document.getElementById('currentArtist');
                console.log('Artist currently is ' + result.artistName);
                artistNameSelector.innerText = result.artistName;
            });
            chrome.storage.sync.get(['songTitle'], function (result) {
                let songTitleSelector = document.getElementById('currentSong');
                console.log('Song Title is : ' + result.songTitle);
                songTitleSelector.innerText = result.songTitle;
            });
            chrome.storage.sync.get(['cover'], function (result) {
                let imageSelector = document.getElementById('coverImageSelector');
                console.log('Song Title is : ' + result.cover);
                imageSelector.src = result.cover;
            });
        } else {
            console.log(result.playing);
        }
    });

}

window.setInterval(function() {
    chrome.storage.sync.get(['playing'], function (result) {
        if (result.playing === true){
            show_artist();
        }
    });
    show_artist();
    },5000);


document.addEventListener('DOMContentLoaded', restore_options);




