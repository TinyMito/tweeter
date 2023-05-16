$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let msg = $(this).val();
    let count = 140 - msg.length;
    $('.counter').text(count);
    if (count < 0) {
      $('.counter').addClass('max');
    } else {
      $('.counter').removeClass('max');
    }
  });
});