
// execute every one second
// until page is closed
// if stored string !== songtitledivcontents
// execute writefile
// continue
let body = document.getElementById('body');

window.setInterval(function(){
    console.log('Page is found.');

    chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showPageAction'
    });

// Listen for messages from the popup
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        // First, validate the message's structure
        if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
            // Collect the necessary data
            // (For your specific requirements `document.querySelectorAll(...)`
            //  should be equivalent to jquery's `$(...)`)
            var domInfo = {
                total: document.querySelectorAll('*').length,
                inputs: document.querySelectorAll('input').length,
                buttons: document.querySelectorAll('button').length
            };

            // Directly respond to the sender (popup),
            // through the specified callback */
            response(domInfo);
        }
    });





}, 5000);

// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Collect the necessary data
        // (For your specific requirements `document.querySelectorAll(...)`
        //  should be equivalent to jquery's `$(...)`)
        var domInfo = {
            total: document.querySelectorAll('*').length,
            inputs: document.querySelectorAll('input').length,
            buttons: document.querySelectorAll('button').length
        };

        // Directly respond to the sender (popup),
        // through the specified callback */
        response(domInfo);
    }
});
