$("body").on('click', '.banner-dismiss', function () {
	$(this).closest(".banner-message").toggle();
	return false;
});