$(document).ready(function() {
  //slides side bar in and out
  var hiddenSidebar = $("#side-section").width();
  $("#side-bar-icon").click(function(event) {
    $("#side-section").toggle();
  });


  //Tag SIDEBAR items with e_id
  // $('#side-bar-list li').each(function(i) {
  //   $(this).data('e_id', employees[i]._id);
  // })

  $('#side-bar-list li').on('click', function(e) {
    //TODO link to profile page based on e_id
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
    updateSideBarBtns();
  })
  //toggles disabled on SIDEBAR buttons that require selected employees
  var updateSideBarBtns = function() {
    if ($('#side-bar-list li.selected').length > 0) { //checks if any side-bar-list items are selected
      $('#eval-btn, #profile-btn').removeClass('disabled');
    } else {
      $('#eval-btn, #profile-btn').addClass('disabled');
    }
    if ($('#side-bar-list li').filter(':hidden').length > 0) { //checks if any side-bar-list items are hidden
      $('#reset-btn').removeClass('disabled');
    } else {
      $('#reset-btn').addClass('disabled');
    }
  }

  //Display button text on hover
  //$().hover(mouse in, mouse out)
  $('#eval-btn').hover(function() {
    $(this).text(' Rate');
  }, function() {
    $(this).text('');
  })

  $('#checklist-btn').hover(function() {
    if ($(this).hasClass('active')) {
      $(this).text(' Clear All');
    } else {
      $(this).text(' Select All');
    }
  }, function() {
    $(this).text('');
  })

  $('#profile-btn').hover(function() {
    $(this).text(' Profile');
  }, function() {
    $(this).text('');
  })

  $('#reset-btn').hover(function() {
    $(this).text(' Reset');
  }, function() {
    $(this).text('');
  })
  //SIDEBAR button click functions
  $('#eval-btn').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
    alert("Whoops this isn't implemented yet");
    //TODO load eval page w/ e_id from selected
  })
  //seleects only the employees that are currently visible in the side-bar-list
  $('#checklist-btn').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
    if ($(this).hasClass('active')) {
      $('#side-bar-list li').filter(':visible').removeClass('selected');
      $(this).removeClass('active');
    } else {
      $('#side-bar-list li').filter(':visible').addClass('selected');
      $(this).addClass('active');
    }
    if ($(this).hasClass('active')) {
      $(this).text(' Clear All');
      $(this).removeClass('icon-checklist');
      $(this).addClass('icon-list');
    } else {
      $(this).text(' Select All');
      $(this).removeClass('icon-list');
      $(this).addClass('icon-checklist');
    }
    updateSideBarBtns();
  })

  $('#profile-btn').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
    alert("Whoops this isn't implemented yet");
    //TODO load profile page w/ e_id from selected
  })

  $('#reset-btn').click(function() {
    console.log("hit")
    if ($(this).hasClass('disabled'))

      return; //prevents button from working if it should be disabled
    $('#side-bar-list li').show();
    updateSideBarBtns();
  })
});
