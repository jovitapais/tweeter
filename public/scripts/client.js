/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json

//commenting out the hard-coded dummy tweets object.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(() => {
 
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // const tweetsContainer = $('#tweets-container');
    for (let tweet of tweets) {   // loops through tweets
    // calls createTweetElement for each tweet
      const nextTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(nextTweet); //adds messaged at the beginning of older messages
    }
  };

  const createTweetElement = function(data) {
    
    //Preventing XSS with Escaping

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(data.content.text)}</p>`;

    //Tweet mark up
    let tweet = `
  <article class="tweet">
    <header>
      <div>
        <span>
          <img src="${data.user.avatars}" alt="avatar goes here"/>
          ${data.user.name}
        </span>
        <span>${data.user.handle}</span>
      </div>
      ${safeHTML}
    </header>
    <footer>
      <span>
        ${timeago.format(data.created_at)}
      </span>
      <div>
        <i class="fas fa-mask"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-bolt"></i>
      </div>
    </footer>
  </article>
  `;
    return tweet;
  };
  


  $("#tweet-form").on("submit", function(event) {
    console.log("line 91");
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;

    if (tweetLength > 140) {
      $("#alert").text("🚨 Maximum 140 Characters!");
      $("#alert").show();

    } else if (tweetLength < 1) {
      
      $("#alert").slideDown();
      $("#alert").text("🚨 Cannot be empty, please type somthing.");

    } else {
      
      $("#alert").hide();
      $.post('/tweets', $(this).serialize())
        
       
        .then(() => loadTweets())
        .then(() => $("#tweet-text").val(''))
        .then(() => $(".counter").val('140'))
      // .then($("#tweet-text").val(''))
        .catch(err => console.log("Error ", err));
    }
  });

  // Fetch all tweets

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      })
      .catch(err => console.log("Error ", err));
  };

  const $tweets = loadTweets();

});
