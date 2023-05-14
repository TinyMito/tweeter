$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let msg = $(this).val();
    let count = 140 - msg.length;
    $('.counter').text(count);
    if (count < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});