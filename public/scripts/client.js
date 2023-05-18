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

  const loadTweets = () => {
    return new Promise((resolve, reject) => {
      $.get("/tweets", function(data) {
        resolve(data);
      })
      .fail(function(error) {
        reject(error);
      });
    });
  };

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $("#tweet-text").serialize());
    console.log("Test")
  });

  loadTweets()
    .then((data) => {
      renderTweets(data);
    })
    .catch((error) => {
      console.error('Unable to fetch JSON:', error);
    });

});