/* get current tab, and run a callback */
function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}
/* 
  runs when popup is opened: queries whether extension is enabled.
    - If it is not enabled, enable it by
        - sending message to content script to change cursor to crosshair
        - sending message to background to change icon
    - if it is enabled, disable it by 
        - sending message to content script to change cursor to default
        - sending message to background to change icon
*/

chrome.storage.local.get('extensionEnabled', function(items) {
  if ('extensionEnabled' in items) {
    if (items.extensionEnabled) {
       chrome.storage.local.set({'extensionEnabled' : false});
       doInCurrentTab(function(tab) {
          chrome.tabs.sendMessage(tab.id, "disable"); // send to content page
          chrome.runtime.sendMessage("disable"); // send to background page 
       }); 
    } else {
       chrome.storage.local.set({'extensionEnabled' : true});
       doInCurrentTab(function(tab) {
          chrome.tabs.sendMessage(tab.id, "enable"); // send to content page
          chrome.runtime.sendMessage("enable"); // send to background page 
       }); 
    }
  }
});

