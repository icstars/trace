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
      //handle color
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
      //handle plot
      var x1, x2, x3, x4, y1, y2, y3, y4;
      //handle x
      if ($(this).hasClass('c1')) {
        x1 = 1;
        x2 = 2;
        x3 = 3;
        x4 = 4;
      } else if ($(this).hasClass('c2')) {
        x1 = 4;
        x2 = 5;
        x3 = 6;
        x4 = 7;
      } else if ($(this).hasClass('c3')) {
        x1 = 7;
        x2 = 8;
        x3 = 9;
        x4 = 10;
      }
      //handle y
      if ($(this).hasClass('r3')) {
        y1 = 1;
        y2 = 2;
        y3 = 3;
        y4 = 4;
      } else if ($(this).hasClass('r2')) {
        y1 = 4;
        y2 = 5;
        y3 = 6;
        y4 = 7;
      } else if ($(this).hasClass('r1')) {
        y1 = 7;
        y2 = 8;
        y3 = 9;
        y4 = 10;
      }
      plotScores(x1,x2,x3,x4,y1,y2,y3,y4);
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
    "8": [],
    "9": []
  };
  //stores e_ids into scoreGrid dictionary in key cell that cooresponds to gridbox
  var plotScores = function(x1 = 1, x2 = 4, x3 = 7, x4 = 10, y1 = x1, y2 = x2, y3 = x3, y4 = x4) {
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
      "8": [],
      "9": []
    };

    var j = 0;
    console.log('set j');
    for (var i in employees) {
      //PICK "LATEST" RATING
      var id = employees[i].employee_id;
      if(ratings[j]!==undefined && ratings[j].managment_relationship.subordinate.employee_id!==id)
        continue;//CASE 0
      perf = ratings[j].performance;
      pot = ratings[j].potential;
      //STORE LATEST SCORES
      var k = 0;
      //k gets the gridbox id that cooresponds to this employee's scores
      if (pot >= y1  && pot <= y4 && perf >= x1 && perf <= x4) {//if in zoom bounds
        k += 1
        if (pot >= y2 && pot < y3) { //middle row
          k += 3
        } else if (pot >= y3) { //top row
          k += 6
        }
        if (perf >= x2 && perf < x3) { //middle col
          k += 1
        } else if (perf >= x3) { //right col
          k += 2
        }
      }
      scGrid['' + k].push(id);
      while(ratings[j]!==undefined && ratings[j].managment_relationship.subordinate.employee_id===id){
        j++
      }
    }
    for (i = 1; i < 10; i++) {
      var l = scGrid['' + i].length;
      console.log(l);
      if (l === 0) {
        $('#dp' + i).hide();
        $('#ga' + i).hide();
      } else {
        $('#dp' + i).show().text(l);
        $('#ga' + i).show();
      }
    }
    scoreGrid = scGrid;
    console.log(scGrid[0]);
  }

  //Select dataPoint
  $('.dataPoint').click(function() {
    var gbID = parseInt($(this).attr('id').slice(-1));
    $("#side-bar-list li").each(function() {
      //$.inArray(value, array) returns index of value in array or -1 if not found
      if ($.inArray($(this).data('id'), scoreGrid[gbID]) >= 0) {
        $(this).show();
      } else {
        $(this).hide();
      }
    })
    //Reset button
    if($('#side-bar-list li').filter(':hidden').length > 0){//checks if any side-bar-list items are hidden
      $('#reset-btn').removeClass('disabled');
    } else {
      $('#reset-btn').addClass('disabled');
    }
  });
  //SORT TOOLBAR
  var sortBy = function(s){
    $("#side-bar-list li").each(function() {
      if ($(this).data('pos') === s) {
        $(this).show();
      } else {
        $(this).hide();
      }
    })
  }

  $('#sort-cashier').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
      sortBy('Cashier');
  })

  $('#sort-cook').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
      sortBy('Cook');
  })

  $('#sort-front').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
      sortBy('Front');
  })

  $('#sort-driver').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
      sortBy('Driver');
  })

  $('#sort-manager').click(function() {
    if ($(this).hasClass('disabled'))
      return; //prevents button from working if it should be disabled
      sortBy('Manager');
  })
});
