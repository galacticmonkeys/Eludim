/*
click on the center modal. grab that element. traverse the parents 
and delete the hightest fixed element
*/

function traverseDom(currentElement) {
	if (document.body == (currentElement.parent().get(0))) {
	    seen.remove();
		  return;
	}
	if (currentElement.css('position') == 'fixed' || 
      currentElement.css('position') == 'absolute') {
		seen = currentElement;
	}
	traverseDom(currentElement.parent());
}

/* by default, the extension is turned off */
var extensionEnabled = false;

/* listen for popup opening. turn on wand */
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message == "enable") {
      extensionEnabled = true;
      $(document.body).css("cursor","crosshair");
    }
    if (message == "disable") {
      extensionEnabled = false;
      $(document.body).css("cursor","default");
    } 
  }
)

$(document).ready(function() {
	$(document).on('click', function (e) {
    if (extensionEnabled) {
      var seen; // the first fixed element
      traverseDom($(e.target));
      
      // reset
      extensionEnabled = false;
      $(document.body).css("cursor","default");
      chrome.runtime.sendMessage("disable");
    }
  })
});

