$(document).ready(function(event) {

	$("#logOutButton").click(function (event) {
		$("#logout").submit();
	});

  $( "#searchbar" ).autocomplete({
        minLength: 2,
        source: "http://localhost:3000/search",
      })
      .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<a>" + item.First_Name + " " + item.Last_Name + " " + item.Email + "</a>" )
          .appendTo( ul );
      };
});