$(document).ready(() => {
  
  console.log('Composer connected');
  console.log('Composer connected');
  $("#tweet-text").on('keypress', () => {
    console.log('keypress');
  });
  $("#tweet-text").on('keydown', () => {
    console.log('keydown');
  });
  $("#tweet-text").on('keyup', () => {
    console.log('keyup');
  });
  $("#tweet-text").on('blur', () => {
    console.log('blur');
  });
  $("#tweet-text").on('change', () => {
    console.log('change');
  });
  $("#tweet-text").on('input', () => {
    console.log('input');
  });
});