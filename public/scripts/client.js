/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function(){

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet"></article>`);
    const $header = $(`<header><div><img src=${tweet.user.avatars}><p>${tweet.user.name}</p></div><p>${tweet.user.handle}</p></header>`)
    const $tweetBody = $(`<p>${tweet.content.text}</p>`)
    const $footer = $(`<footer><p>${timeago.format(tweet.created_at)}</p><div><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div></footer>`)

    $tweet.append($header)
    $tweet.append($tweetBody)
    $tweet.append($footer)
    return $tweet
  }
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for(let i = 0; i < tweets.length; i++) {
      const newTweet = createTweetElement(tweets[i])
      $('#tweets-container').append(newTweet)
    }
  }

  $('.new-tweet form').submit(function(e){
    e.preventDefault();
    const $newData = $(this).serialize();
    $.post("/tweets", $newData, function(data){
      console.log($newData)
    })
  });

  const loadTweets = function(){
    $.get("/tweets", function(data, status) {
      renderTweets(data);
    })
  }
  loadTweets();
});