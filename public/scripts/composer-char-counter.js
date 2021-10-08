$(document).ready(function() {
  const text = $(".new-tweet form textarea")
  text.on('keyup', () => {
    $('#error').hide()
    $('output').val(140 - text.val().length)

    if($('output').val() == 0) {
      $('output').toggleClass('overlimit')
    }

  })
});