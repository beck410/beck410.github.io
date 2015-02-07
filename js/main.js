//hide/show main nav @media 760px
if($(window).width() <= 800){
  $('.sidebar .main-nav ul').css('display','none');
}

$('.sidebar .main-nav .small-menu').click(function(){

  if($(window).width() < 731){
    $('.sidebar ul').css('margin-top','-50px');
  }

  $('.sidebar ul').slideToggle();
});

$(window).resize(function () {
  if ( $(window).width() > 729 ) {
    $('.sidebar ul').removeAttr('style');
  }

  if ($(window).width() < 730){
    $('.sidebar ul').removeAttr('style');
    $('.sidebar ul').css('margin-top','-50px');
  }
});
