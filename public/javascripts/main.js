$(document).ready(function(event) {

	$("#logOutButton").click(function (event) {
		$("#logout").submit();
	});

  $( "#searchbar" ).autocomplete({
        minLength: 2,
        source: "http://localhost:3000/search",
        select: function (event, ui) {
          window.location.href="http://localhost:3000/users/" + ui.item.First_Name + ui.item.Last_Name;
        },
        response: function (event, ui) {
          //sweet hack :)
          if (ui.content.length === 0) {
            ui.content[0] = null;
          }
        }
      })
      .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
          if (item) {
            return $( "<li>" )
              .append( "<a>" + item.First_Name + " " + item.Last_Name + " " + item.Email + "</a>" )
              .appendTo( ul );
            } else {
              return $( "<li>" )
              .append( "<a>" + "User not found!" + "</a>" )
              .appendTo( ul );
            }
      };
});