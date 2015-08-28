//todo: toggle extension. put variable in local storage
chrome.storage.local.set({
  'extensionEnabled': false
});

/* Sets icon on event*/ 
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message == "disable") {
      chrome.browserAction.setIcon({
        path : "../img/iconGray.png"
      });
    }
    if (message == "enable") {
      chrome.browserAction.setIcon({
        path : "../img/icon.png"
      });
    }
  }
)

/* Listen for new tab creation to disable extension */
chrome.tabs.onCreated.addListener(function(tab) {
   chrome.storage.local.get('extensionEnabled', function(items) {
      if ('extensionEnabled' in items) {
         chrome.storage.local.set({'extensionEnabled': false});
         chrome.tabs.sendMessage(tab.id, "disable"); // send to content page
         chrome.runtime.sendMessage("disable"); // send to background page 
      }
    });
});
