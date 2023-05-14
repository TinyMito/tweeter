$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let msg = $(this).val();
    let count = msg.length;
    $('.counter').text(140 - count);
  });
});