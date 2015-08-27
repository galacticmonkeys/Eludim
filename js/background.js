//todo: toggle extension. put variable in local storage
chrome.storage.local.set({
  'extensionEnabled': false
});

/* Sets icon */ 
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

