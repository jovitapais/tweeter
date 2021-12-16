
  
$(document).ready(() => {

  const tweetLength = 140;
  $("#tweet-text").on('input', function() {
    let counter = tweetLength - $(this).val().length;
    const counterTag = $(this).parent().prop("tagName") + " div .counter";
    $(counterTag).text(counter);
    (counter < 0) ? $(counterTag).addClass("red-font") : $(counterTag).removeClass("red-font");
    
  });
});