/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
        <span>${timeago.format(data.created_at)}</span>
        <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
      </div>
    </article>
    `);

    return tweetHTML;
  };

  const timestamp = (time) => {
    // Timestamp to Days Converstion
    const timestamp = time;
    const today = new Date();
    const postDay = new Date(timestamp);
    
    // Time differences
    const timeDiff = today.getTime() - postDay.getTime();

    // Convert to days
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  const loadTweets = () => {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $("#tweet-text").serialize());
    console.log("Test")
  });

  loadTweets();

});