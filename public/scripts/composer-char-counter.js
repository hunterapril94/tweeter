$(document).ready(function() {
  const text = $(".new-tweet form textarea")
  text.on('keydown', () => {
    $('output').val(140 - text.val().length)

    if($('output').val() == 0) {
      $('output').toggleClass('overlimit')
    }

  })
});