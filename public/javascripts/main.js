$(document).ready(function(event) {

	$("#logOutButton").click(function (event) {
		$("#logout").submit();
	});

	$("#searchform").click(function(event) {
		event.preventDefault();
		alert("HI");
	});
});