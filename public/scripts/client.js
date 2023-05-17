/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // TEST DATA ONLY
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = (data) => {
    // loops through tweets
    for (let tweet of data) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet); 
    }
  };

  const createTweetElement = (data) => {
    // Call timestamp to covert to days
    const created = timestamp(data.created_at);

    // HTML ouput for tweet
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
    `);

    return tweetHTML;
  };

  // Timestamp to Days Converstion
  const timestamp = (time) => {
    const timestamp = time;
    const today = new Date();
    const postDay = new Date(timestamp);
  
    // Time differences
    const timeDiff = today.getTime() - postDay.getTime();
  
    // Convert to days
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  renderTweets(data);

});