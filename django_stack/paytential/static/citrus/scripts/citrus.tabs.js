// Trigger functions on resize after specified time interval.
var tabsResizeTimer;
$(window).bind('resize', function(){
  tabsResizeTimer && clearTimeout(tabsResizeTimer);
  tabsResizeTimer = setTimeout(tabsOnResize, 100);
});

// Tabs truncation function.
tabsOnResize = function() {
  // Set variables for resizing window and tabs sizing.
  var tabsWinWidth = $(window).width();
  var tabsContentWidth = $('.tabs').width();

  // Compared Tabs width to window width and truncate tabs in "more..." tab at end.
  if (tabsContentWidth > tabsWinWidth){
    $(".tabs li:nth-last-child(2)").css({'height':(modalWinContentHeight)+'px'});
  }
  else {
    $('.js-modal-body').css({'height': 'auto'});
    modalOnReflow();
  }
}

