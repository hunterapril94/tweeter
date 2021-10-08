//function to make the output count characters as well as change color when tweet is overlimit
$('document').ready(function() {
  const text = $(".new-tweet form textarea");
  text.on('keyup', () => {
    $('#error').hide();
    $('output').val(140 - text.val().length);

    if ($('output').val() < 0) {
      $('output').addClass('overlimit');
    } else if ($('output').val() >= 0 && $('output.overlimit')) {
      $('output').removeClass('overlimit');
    }

  });
});