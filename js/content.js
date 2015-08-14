/*
click on the center modal. grab that element. traverse the parents 
and delete the hightest fixed element
*/

function traverseDom(currentElement) {
	if (document.body == (currentElement.parent().get(0))) {
	    seen.remove();
		return;
	}
	if (currentElement.css('position') == 'fixed') {
		seen = currentElement;
	}
	traverseDom(currentElement.parent());
}

$(document).ready(function(){
	$(document).on('click', function (e) {
		var seen; // the first fixed element
		traverseDom($(e.target))
	});
});