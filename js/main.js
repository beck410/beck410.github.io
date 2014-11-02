//hide/slow main nav @media 760px
if($(window).width() <= 760){
  $('.main-nav ul').css('display','none');
}

$('.ham-icon').click(function(){
  //console.log("this works");
  $('.main-nav ul').slideToggle();
})

$(window).resize(function () {
  if ( $(window).width() > 760 ) {
    $('.main-nav ul').removeAttr('style');
  }
})
