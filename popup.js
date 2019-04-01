// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Check if browser domain is = musi.sh
// if its looks for div that contains title
// save that to a local file

// create a OBS plugin that reads the file contents from disk every 5 seconds


/*
var myText;
var myStrText=JSON.stringify(myText);



// then call a function with arguments (name, data)
saveText("default_name.txt", myStrText);



// function to save it to HDD (default download folder or with prompt) is like this
function saveText(filename, text) {
  var tempElem = document.createElement('a');
  tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  tempElem.setAttribute('download', filename);
  tempElem.click();
}
*/



'use strict';
let page = document.getElementById('buttonDiv');

function setBgColor(color) {
  page.setAttribute("style", `background-color: ${color};`);
}

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
        setBgColor(item);
      })
    });

    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
