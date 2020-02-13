(function($) {
  var messages = {
    progress: '<p><i class="fa fa-spinner fa-spin"></i> Sending email...</p>',
    success:
      '<p class="text-success">Thank you for contacting us. We will contact you as early as possible.</p>',
    error: '<p class="text-danger">Something went wrong.</p>'
  };
  var $form = $("form#main-contact-form");
  var formStatus = $('<div class="form_status"/>');
  $form.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize(),
      dataType: "json",
      beforeSend: function() {
        formStatus
          .html(messages.progress)
          .fadeIn()
          .prependTo($form);
      },
      success: function(data) {
        if (data.success === true) {
          formStatus.html(messages.success);
        } else {
          formStatus.html(messages.error);
        }
        formStatus
          .fadeIn()
          .delay(3000)
          .fadeOut();
      },
      error: function() {
        formStatus
          .html(messages.error)
          .fadeIn()
          .delay(3000)
          .fadeOut();
      }
    });
  });
})(jQuery);
