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

/* by default, the extension is turned off so you don't
   fuck up your websites */
var extensionEnabled = false;

/* listen for popup opening. turn on wand */
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message == "changeCursorCrosshair") {
      $(document.body).css("cursor","crosshair");
      extensionEnabled = true;
    }
  }
)

$(document).ready(function() {
	$(document).on('click', function (e) {
    if (extensionEnabled) {
      var seen; // the first fixed element
      traverseDom($(e.target))
      
      // reset: change cursor to normal
      $(document.body).css("cursor","default");

      // change icon to signal disabled status
      // put here because content script limitations
      chrome.runtime.sendMessage("disable");
      
      extensionEnabled = false;
    }
  })
});



