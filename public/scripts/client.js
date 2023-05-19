/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// JSON URL
const jsonUrl = '/tweets';
// Target elements
const tweetBox = '#tweets-container';
const tweetForm = '#new-tweet-form';
const tweetTextArea = '#tweet-text';
const warnBox = '#warning';
// Error messages
const emptyTweet = 'Please enter a tweet message.';
const charLimitTweet = 'Tweet has to be less than 140 characters.';
const errorTweet = 'Unable to fetch JSON:';

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

const renderWarning = (msg) => {
  $(warnBox).empty();
  $(warnBox).append(createWarningElement(msg));
}

// Iterate JSON tweets
const renderTweets = (data) => {
  $(warnBox).empty();
  $(tweetBox).empty();
  // loops through tweets
  for (let tweet of data) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container, prepend reverse newest at top.
    $(tweetBox).prepend($tweet);
  }
};

// Prevent XSS
function escape (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// HTML output for warning
const createWarningElement = (msg) => {
  const warningHTML = `<div class="warning-msg"><i class="fa-solid fa-circle-exclamation"></i>${msg}</div>`;
  return warningHTML;
}

// HTML ouput for tweet
const createTweetElement = (data) => {
  const tweetHTML = `
  <article class="tweet">
    <div class="header">
      <div class="user">
        <img src="${data.user.avatars}"></img>
        <span>${data.user.name}</span>
      </div>
      <span class="tag">${data.user.handle}</span>
    </div>
    <div class="body">
      <span id="test">${data.content.text}</span>
    </div>
    <div class="footer">
      <span>${timeago.format(data.created_at)}</span>
      <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
    </div>
  </article>
  `;
  return tweetHTML;
};

$(document).ready(function() {
  // SUBMIT POST Tweet Data
  $(tweetForm).on("submit", function(event) {
    event.preventDefault();

    // Validate form
    if ($(tweetTextArea).val().trim() === '') {
      renderWarning(emptyTweet);
      return;
    } else if ($(tweetTextArea).val().trim().length > 139) {
      renderWarning(charLimitTweet);
      return;
    };

    // POST the tweet data to JSON
    $.post(jsonUrl, { text: escape($(tweetTextArea).val())})
      .done(() => {
        // Requires .done() otherwise out of order rendering and end up loading cache content
        $.get(jsonUrl, function(data) {
          renderTweets(data);
          $(tweetTextArea).val('');
        })
      })
  });
  
  // DOCUMENT LOAD call tweets from JSON
  loadTweets()
  .then((data) => {
    renderTweets(data);
  })
  .catch((error) => {
    console.log(errorTweet, error);
  });
});