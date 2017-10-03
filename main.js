$(document).ready(function(){

	$('.someclass').collapse({
		minHeight : 70,
		maxHeight : 100,
		timeFunc : "linear",
		buttonAppend : "#here",
		speed : 250,
		textOpened : "opened",
		textClosed : "closed",
		opened : true,
		buttonClass : "theclass"
	});
	
});