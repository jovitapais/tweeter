
  
$(document).ready(() => {

  const tweetLength = 140;
  $("#tweet-text").on('input', function() {
    let counter = tweetLength - $(this).val().length;
    const counterTag = $(this).parent().prop("tagName") + " div .counter";
    $(counterTag).text(counter);

    if (counter < 0) {
      $(counterTag).addClass("red-font");

    } else {
      $(counterTag).removeClass("red-font");
      $("#alert").hide();
    }
    

    
    
    
      
  });
});