// when the popup is opened, send a message to the background.js
// from background.js, send message to content.js to change 
// remember to register background page
// chrome.extension.getBackgroundPage().

/* get current tab, and run a callback */
function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}

/* runs when popup is opened:
    - send message to content script to change cursor to crosshair
*/
doInCurrentTab(function(tab) { 
  var activeTabId;
  activeTabId = tab.id
  chrome.tabs.sendMessage(activeTabId, "changeCursorCrosshair");
  chrome.runtime.sendMessage("enable");
  window.close();
});


