$('document').ready(function() {
  $('#error').hide();
  const createTweetElement = function(tweet) {
    //makes it so users can't ruin the site with writing scripts into textarea
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $tweet = $(`<article class="tweet"></article>`);
    const $header = $(`<header><div><img src=${tweet.user.avatars}><p>${tweet.user.name}</p></div><p>${tweet.user.handle}</p></header>`);
    const $tweetBody = $(`<p>${escape(tweet.content.text)}</p>`);
    const $footer = $(`<footer><p>${timeago.format(tweet.created_at)}</p><div><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div></footer>`);

    $tweet.append($header);
    $tweet.append($tweetBody);
    $tweet.append($footer);
    return $tweet;
  };
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i = 0; i < tweets.length; i++) {
      const newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').prepend(newTweet);
    }
  };

  $('.new-tweet form').submit(function(e) {
    e.preventDefault();

    const $newData = $(this).serialize();
    if ($(".new-tweet form textarea").val().length === 0) {
      $('#error').show();
      return $('#error').append("Tweet cannot be blank");
    } else if ($(".new-tweet form textarea").val().length > 140) {
      $('#error').show();
      return $('#error').append("Tweet is over character limit. Consider turning it into a novel.");
    }
    $.post("/tweets", $newData, function(data) {
      $.get("/tweets", function(data, status) {
        //renders only the most recent tweet
        renderTweets(data.slice(-1));
      });
    });
    $('.new-tweet form textarea').val("");
    $('.new-tweet form output').val(140);
  });

  const loadTweets = function() {
    $.get("/tweets", function(data, status) {
      renderTweets(data);
    });
  };
  loadTweets();
});