// Scrolling and active class
$(document).ready(function () {

  $(document).on("scroll", onScroll);

//smoothscroll
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('a').each(function () {
           $(this).removeClass('active');
       })
       $(this).addClass('active');

      var target = this.hash,

      $target = $(target);
      $('html, body').stop().animate( {
          'scrollTop': $target.offset().top-100
      }, 500, 'swing', function () {
          window.location.hash = $target.offset().top-100;
          $(document).on("scroll", onScroll);
      });
  });
});


//Check Marks
$(document).ready(function () {
  var $window = $(window);
  $window.on('scroll resize', checkInView);
	$window.trigger('scroll');
  function checkInView() {
    $(".check-mark img").each(function() {
     var obj = $(this);
     if (obj.isInViewport() === true)
      obj.attr("src","assets/images/icons/green-check-full.png");
    });
  };
});

$.fn.isInViewport = function () {
  var elemTop = $(this).offset().top;
  var elemBottom = elemTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + window.innerHeight - $(window).height()*.5;
  return elemBottom > viewportTop && elemTop < viewportBottom;
};



// Active class assignment for Navigation Bar
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#navigation-bar a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos + 500 && refElement.position().top + refElement.height() > scrollPos) {
            $('.k2-icon').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
};

var originalTopDistance = $("#navigation-bar").offset().top

var PlaceWayOutside = function() {
  navPos(10000);
}

var navPos = function(safetySpace) {
  if ($(window).scrollTop() < (originalTopDistance+safetySpace)) {
      if ($(window).scrollTop() > originalTopDistance) {
        $('#navigation-bar').addClass('fixed');
      } else {
        $('#navigation-bar').removeClass('fixed');
    }
  }
}

//make sure scrolltop is always less than original top distance
navPos(1000000);
//Bind to Scroll Event
$(window).on('scroll', PlaceWayOutside);
$(window).on('resize', function() {
  $('#navigation-bar').removeClass('fixed');
  originalTopDistance = $("#navigation-bar").offset().top;
  navPos(100000);
});
