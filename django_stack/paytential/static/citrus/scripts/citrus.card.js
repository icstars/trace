$(document).ready(function(){

	$(".js-card-toggle").click(function() {
	  $(this).parent().next("section").slideToggle();
	  $(this).find(".card-toggle i").toggleClass("icon-collapse icon-expand");
	  return false;
	});

	$("body").on('click', '.js-card-toggle', function () {
		$(this).parent().next("section").slideToggle(400, function () {
		  if ($('#column-equal').length && $('#column-equal').masonry !== undefined && $('#column-equal').masonry !== null) {
		    $('#column-equal').masonry();
		  }
		});

		$(this).find(".card-toggle i").toggleClass("icon-collapse icon-expand");
		return false;
	});

});