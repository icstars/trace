$(document).ready(function() {
  var loadEmployeeInfo = function(id){
    var employee = {};
    $.ajax({
      type: 'GET',
      url: '/api/employees/'+id,
      success: function(data) {
        employee = data;
      }
    }).done(function(){
      $('#eval-header').text(employee.details[0].first_name + ' ' + employee.details[0].last_name);
    })

    $('#side-bar-list').css('height', $('#eval-section').width());
    $(window).resize(function() {
      $('#side-bar-list').css('height', $('#eval-section').width());
    })
  }

  if (window.sessionStorage.getItem('id') !== null){
    var e_id = window.sessionStorage.getItem('id');
    loadEmployeeInfo(e_id);
  }

});
