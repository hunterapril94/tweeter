$(document).ready(function() {
  const text = $(".new-tweet form textarea")
  let val = $('output').val()
  text.on('keypress', (e) => {
    let val = $('output').val()
    $('output').val(val - 1)

    if (val < 0) {
      $('output').addClass('overlimit')
    }

  })
  text.on("keydown", (e) => {
    let val = $('output').val()
    if(e.keyCode === 8 && val < 140) {
      
      $('output').val(Number(val) + 1)
    }
  })

});