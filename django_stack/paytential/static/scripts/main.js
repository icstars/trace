$(document).ready(function() {
  var employees = {};

  $.ajax({
    type: 'GET',
    url: '/api/employees',
    success: function(data) {
      //load data into employees
      $.each(data, function(i, employee) {
        employees[employee.employee_id] = employee;
      });
    }
  }).done(function(){
    //populate sidebar
    for (var i in employees) {
      $('#side-bar-list').append("<li data-id="+employees[i].employee_id+"><span>" + employees[i].first_name + " " + employees[i].last_name + "</span></li>");
    }
  })
  //slides side bar in and out
  var hiddenSidebar = $("#side-section").width();
  $("#side-bar-icon").click(function(event) {
    $("#side-section").toggle();
  });
  //TODO link to profile page based on e_id
  $(document).on("click", '#side-bar-list li',function() {
    $('#side-bar-list li').removeClass('selected');
    $(this).addClass('selected');
    sessionStorage.setItem('id',$(this).data('id'));
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
    //TODO load eval page using sessionStorage.getItem('id')
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
    //TODO load profile page using sessionStorage.getItem('id')
  })

  $('#reset-btn').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
    $('#side-bar-list li').show();
    updateSideBarBtns();
  })
});
