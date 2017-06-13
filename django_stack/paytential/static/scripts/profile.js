$(document).ready(function() {
  //Profile toolbar buttons
  $('#save-btn').hover(function() {
    $(this).text(' Save');
  }, function() {
    $(this).text('');
  })

  $('#edit-btn').hover(function() {
    $(this).text(' Edit');
  }, function() {
    $(this).text('');
  })

  $('#rate-btn').hover(function() {
    $(this).text(' Rate');
  }, function() {
    $(this).text('');
  })

  $('#share-btn').hover(function() {
    $(this).text(' Share');
  }, function() {
    $(this).text('');
  })

  $('#delete-btn').hover(function() {
    $(this).text(' Delete');
  }, function() {
    $(this).text('');
  })

  //Load employee info when selected in SIDEBAR
  $(document).on("click", '#side-bar-list li',function() {
    employee = {};
    $.ajax({
      type: 'GET',
      url: '/api/employees/'+$(this).data('id')
      success: function(data) {
        employee = data;
      }
    }).done(function(){
      $('#profile-header').text(employee.details.first_name + ' ' + employee.details.last_name);
      $('#id_field').text(employee.details.employee_id);
      $('#gender_field').text(employee.details.gender);
      $('#bday_field').text(employee.details.birth_date);
      $('#pos_field').text(employee.details.position);
      $('#startDate_field').text(employee.details.hire_date);
      $('#location_field').text(employee.assigned_locations.location_name);
      //CONTACT INFO
      $('#email_field').text(employee.details.email);
      $('#phone_field').text(employee.details.phone);
      //RATING HISTORY
      $('#ratings-history-list').empty();
      for (var i in employee.ratings) {
        $('#ratings-history-list').append("<tr><td class='toggle'><i class='icon-expand'></i></td><td class='type-centeralign'>"+employee.ratings[i].date+"</td><td class='type-centeralign'>"+employee.ratings[i].potential+"</td><td class='type-centeralign'>"+employee.ratings[i].performance+"</td><td class='ratings-comments'>"+employee.ratings[i].notes+"</td><td class='type-centeralign'>"+employee.supervisors[0]+"</td></tr>");
      }
    })

  })

  $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  $(window).resize(function() {
    $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  })
});
