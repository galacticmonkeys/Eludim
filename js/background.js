/* Listener from content script for disable extension*/
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

