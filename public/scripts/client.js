/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Iterate JSON tweets
  const renderTweets = (data) => {
    // loops through tweets
    for (let tweet of data) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  // HTML ouput for tweet
  const createTweetElement = (data) => {
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

  // GET JSON Tweet Data
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

  // POST Tweet Data
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $("#tweet-text").serialize());
    console.log("Test")
  });

  // Call all tweets from JSON
  loadTweets()
    .then((data) => {
      renderTweets(data);
    })
    .catch((error) => {
      console.error('Unable to fetch JSON:', error);
    });

});