$(document).ready(function(){

	$('.someclass').collapse({
		minHeight : 70,
		maxHeight : 200,
		buttonAppend : "#here",
		speed : 500,
		textOpened : "opened",
		textClosed : "closed",
		opened : true,
		buttonClass : "theclass"
	});

});