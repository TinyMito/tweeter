$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let msg = $(this).val();
    let count = msg.length;
    console.log(count);
  });
});