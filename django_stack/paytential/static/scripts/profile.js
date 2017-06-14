$(document).ready(function() {
  //Load employee info
  var loadEmployeeInfo = function(id){
    var employee = {};
    $.ajax({
      type: 'GET',
      url: '/api/employees/'+id,
      success: function(data) {
        employee = data;
      }
    }).done(function(){
      $('#profile-header').text(employee.details[0].first_name + ' ' + employee.details[0].last_name);
      $('#id_field').text(employee.details[0].employee_id);
      $('#gender_field').text(employee.details[0].gender);
      $('#bday_field').text(employee.details[0].birth_date);
      $('#hire_field').text(employee.details[0].hire_date);
      $('#pos_field').text(employee.details[0].position);
      $('#email_field').text(employee.details[0].email);
      $('#startDate_field').text(employee.details[0].hire_date);
      $('#phone_field').text(employee.details[0].phone);
      $('#location_field').text(employee.assigned_locations[0].location_name);
      //RATING HISTORY
      $('#ratings-history-list').empty();
      for (var i in employee.ratings) {
        $('#ratings-history-list').append("<tr><td class='toggle'><i class='icon-expand'></i></td><td class='type-centeralign'>"+employee.ratings[i].date+"</td><td class='type-centeralign'>"+employee.ratings[i].potential+"</td><td class='type-centeralign'>"+employee.ratings[i].performance+"</td><td class='ratings-comments'>"+employee.ratings[i].notes+"</td><td class='type-centeralign'>"+employee.supervisors[0].supervisor.employee_id+"</td></tr>");
      }
    })
  }
  
  if (window.sessionStorage){
    var e_id = window.sessionStorage.getItem('id');
    loadEmployeeInfo(e_id);
  }
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

  $(document).on("click", '#side-bar-list li',function() {
    var id = $(this).data('id');
    loadEmployeeInfo(id);
  })

  $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  $(window).resize(function() {
    $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  })
});
