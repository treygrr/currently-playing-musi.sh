let status = document.getElementById('status');

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'musi.sh'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.runtime.onMessage.addListener(function (msg, sender) {
    // First, validate the message's structure
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Enable the page-action for the requesting tab
        let songTitle = msg.songName;
        let artistName = msg.artistName;
        let coverImage = msg.cover;
        let playing = msg.playing
        console.log(msg);
        if (typeof artistName !== 'undefined' && typeof songTitle !== 'undefined') {
            save_options(artistName, songTitle, coverImage, playing);
            console.log(msg);
            console.log('Backend Received a Song Titled "' + msg.songName + '" by: ' + msg.artistName + '.');

        }
    }
});


function save_options(artist, song, cover, playing) {
    chrome.storage.sync.set({
        artistName: artist,
        songTitle: song,
        cover: cover,
        playing: playing
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

