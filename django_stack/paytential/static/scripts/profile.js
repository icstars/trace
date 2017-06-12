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
  $('#side-bar-list li').click(function() {
    //Some fields are commented because they're not yet in the sample data
    console.log('hit');
    endex = $(this).data('e_id');
    $('#profile-header').text(employees[endex].fname + ' ' + employees[endex].lname);
    $('#id_field').text(employees[endex]._id);
    $('#gender_field').text(employees[endex].gender);
    $('#bday_field').text(employees[endex].startDate);
    $('#pos_field').text(employees[endex].department);
    // $('#dep_field').text(employees[endex].department);
    $('#startDate_field').text(employees[endex].startDate);
    // $('#location_field').text(employees[endex]._id);
    //CONTACT INFO
    // $('#email_field').text(employees[endex].startDate);
    // $('#phone_field').text(employees[endex].startDate);
    // $('#ext_field').text(employees[endex].startDate);
    //RATING HISTORY
    populateRatings(endex);
  })

  var populateRatings = function(endex){
    $('#ratings-history-list').empty();
    for (var i in employees[endex].ratings) {
      $('#ratings-history-list').append("<tr><td class='toggle'><i class='icon-expand'></i></td><td class='type-centeralign'>"+employees[endex].ratings[i].date+"</td><td class='type-centeralign'>"+employees[endex].ratings[i].potential+"</td><td class='type-centeralign'>"+employees[endex].ratings[i].performance+"</td><td class='ratings-comments'>"+employees[endex].ratings[i].notes+"</td><td class='type-centeralign'>"+employees[endex].refersTo+"</td></tr>");
    }
  }

  $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  $(window).resize(function() {
    $('#side-bar-list').css('height', $('#profile-maincontent-section').width());
  })
});
