/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const jsonUrl = '/tweets';
  const tweetBox = '#tweets-container';
  const tweetForm = '#new-tweet-form';
  const tweetTextArea = '#tweet-text';
  const emptyTweet = 'Please enter a tweet.';
  const charLimitTweet = 'Tweet has to be less than 140 characters.';
  const errorTweet = 'Unable to fetch JSON:';

  // Iterate JSON tweets
  const renderTweets = (data) => {
    // loops through tweets
    for (let tweet of data) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(tweetBox).append($tweet);
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
      $.get(jsonUrl, function(data) {
        resolve(data);
      })
      .fail(function(error) {
        reject(error);
      });
    });
  };

  // POST Tweet Data
  $(tweetForm).on("submit", function(event) {
    event.preventDefault();

    if ($(tweetTextArea).val().trim() === '') {
      alert(emptyTweet);
      return;
    } else if ($(tweetTextArea).val().trim().length > 139) {
      alert(charLimitTweet);
      return;
    }

    $.post(jsonUrl, $(tweetTextArea).serialize());
  });

  // Call all tweets from JSON
  loadTweets()
    .then((data) => {
      renderTweets(data);
    })
    .catch((error) => {
      console.error(errorTweet, error);
    });

});