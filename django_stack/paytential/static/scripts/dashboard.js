$(document).ready(function() {
  var employees = {};
  var ratings = {};
  $.ajax({
    type: 'GET',
    url: '/api/employees',
    success: function(data) {
      //load data into employees
      $.each(data.employees, function(i, employee) {
        employees[employee.employee_id] = employee;
      });
      //load data in ratings
      $.each(data.ratings, function(i, rating) {
        ratings[i] = rating;
      });
    }
  }).done(function(){
    console.log('ajax done');
    console.log(employees);
    console.log(ratings);
    plotScores();
  })

  //KEEPS GRID IN SHAPE AS WINDOW RESIZES
  $('.gridbox').css('height', $('.gridbox').width());
  $('#x-axis').css('width', $('#grid').width());
  $('#y-axis').css('height',  $('.gridbox').width() *3)
  // resizes column to same height as gridbox
  $('#side-bar-list').css('height', $('.gridbox').width() *3);
  $(window).resize(function() {
    $('.gridbox').css('height', $('.gridbox').width());
    $('#x-axis').css('width', $('#grid').width());
    $('#y-axis').css('height',  $('.gridbox').width() *3)
    $('#side-bar-list').css('height', $('.gridbox').width() *3);
  })

  // Zoom
  $('.gridbox').click(function(e) {
    if (e.target !== this)
      return;//prevents clicks on data points from hitting on the grid
    if ($('.gridbox').hasClass('zoomed')) {
      resetGrid();
      $('.gridbox').removeClass('zoomed');
    } else {
      $('.gridbox').addClass('zoomed');
      $('.gridbox a').hide();
      if ($(this).hasClass('blue')) {
        resetGrid('blue');
      } else if ($(this).hasClass('green')) {
        resetGrid('green');
      } else if ($(this).hasClass('yellow')) {
        resetGrid('yellow');
      } else if ($(this).hasClass('orange')) {
        resetGrid('orange');
      } else if ($(this).hasClass('red')) {
        resetGrid('red');
      }
    }
  }) //Zoom End

  // Reset Grid
  var resetGrid = function(c) {
    $('.gridbox').removeClass('blue');
    $('.gridbox').removeClass('green');
    $('.gridbox').removeClass('yellow');
    $('.gridbox').removeClass('orange');
    $('.gridbox').removeClass('red');

    if (c === undefined) { //set back to 9box
      $('.c3.r1').addClass('blue');
      $('.c2.r1, .c3.r2').addClass('green');
      $('.c1.r1, .c2.r2, .c3.r3').addClass('yellow');
      $('.c1.r2, .c2.r3').addClass('orange');
      $('.c1.r3').addClass('red');
      plotScores();
    } else {
      $('.gridbox').addClass(c);
    }
  } //Reset Grid End
  var scoreGrid = {
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": []
  };
  //stores e_ids into scoreGrid dictionary in key cell that cooresponds to gridbox
  var plotScores = function() {
    console.log('printing scores...');
    var perf = 0,
      pot = 0;
    //local version of scoreGrid for calculations
    var scGrid = {
      "0": [],
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": []
    };

    var j = 0;
    console.log('set j');
    for (var i in employees) {
      //PICK "LATEST" RATING
      var id = employees[i].employee_id;
      if(ratings[j]!==undefined && ratings[j].managment_relationship.subordinate.employee_id!==id)
        continue;//CASE 0
      console.log(id);
      console.log(ratings[j]);

      perf = ratings[j].performance;
      pot = ratings[j].potential;

      //STORE LATEST SCORES
      var k = 0;
      //k gets the gridbox id that cooresponds to this employee's scores
      if (pot > 4 && pot < 7) { //middle row
        k += 3
      } else if (pot >= 7) { //top row
        k += 6
      }
      if (perf > 4 && perf < 7) { //middle col
        k += 1
      } else if (perf >= 7) { //right col
        k += 2
      }
      scGrid['' + k].push(id);
      while(ratings[j]!==undefined && ratings[j].managment_relationship.subordinate.employee_id===id){
        j++
      }
    }
    console.log(scGrid);
    for (var i in scGrid) {
      var l = scGrid['' + i].length;
      if (l === 0) {
        $('#dp' + i).hide();
      } else {
        $('#dp' + i).show().text(l);
      }
    }
    scoreGrid = scGrid;
  }

  //Select dataPoint
  $('.dataPoint').click(function() {
    //gridbox ID WARNING: will break if gbIDs are greater than 9
    var gbID = parseInt($(this).attr('id').slice(-1));
    $("#side-bar-list li").each(function() {
      //$.inArray(value, array) returns index of value in array or -1 if not found
      if ($.inArray($(this).data('id'), scoreGrid[gbID]) >= 0) {
        $(this).show();
      } else {
        $(this).hide();
      }
    })

    if($('#side-bar-list li').filter(':hidden').length > 0){//checks if any side-bar-list items are hidden
      $('#reset-btn').removeClass('disabled');
    } else {
      $('#reset-btn').addClass('disabled');
    }
  });
});
