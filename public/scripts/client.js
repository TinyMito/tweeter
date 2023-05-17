/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = (data) => {
    const created = timestamp(data.created_at);
    const tweetHTML = $(`
    <article class="tweet">
    <div class="header">
      <div class="user">
        <img src="${data.user.avatars}"></img>
        <span>${data.user.name}</span>
      </div>
      <span class="tag">${data.user.handle}</span>
    </div>
    <div class="body">
      <span>${data.content.text}</span>
    </div>
    <div class="footer">
      <span>${created} days ago</span>
      <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
    </div>
  </article>
  `)
  return tweetHTML;
  };

  const timestamp = (time) => {
    const timestamp = time;
    const today = new Date();
    const postDay = new Date(timestamp);
  
    // Time differences
    const timeDiff = today.getTime() - postDay.getTime();
  
    // Convert to days
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

  const $tweet = createTweetElement(tweetData);

  $('#tweets-container').append($tweet); 

});