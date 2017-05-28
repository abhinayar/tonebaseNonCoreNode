//ToneBase Landing Page JS
//Abhi Nayar - anayar2@gmail.com

$(document).ready(function(){  
  //Form validation function
  function isValidEmail(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      return false;
    }
    return true;
  } function getURLParam(paramName) {
    var match = RegExp('[?&]'+paramName+'=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ''));
  }
  //For validation visual feedback
  $('.hero-form .form-input').on('input', function() {
    //get current val
    var curVal = $(this).val();
    //unify all page forms for ease of submission
    $(".hero-form .form-input").val(curVal);
    //change the valid indicator
    if (curVal != "") {
      if (isValidEmail(curVal)) {
        $('.hero-form .valid').removeClass("uncheck").addClass("check")
      } else {
        $('.hero-form .valid').removeClass("check").addClass("uncheck");
      }
    } else {
      $('.hero-form .valid').removeClass("check uncheck");
    }
  });
  /* On Newsletter form submission */
  $(".form-button").on("click", function(){
    //Check if top or bottom form has been submitted
    var top = $(this).closest(".hero-form").hasClass("top-form");
    top ? top = ".top-form" : top = ".bottom-form";
    console.log(top);
    //Get email
    var email = $(".hero-form" + top + " .form-input").val()
    //If email is valid
    if(isValidEmail(email)) {
      //Hide the form, show the response      
      $(".hero-form" + top + " .form-input-wrapper, .hero-form" + top + " .form-button").addClass("hidden");
      $(".hero-form" + top + " #mce-responses").removeClass("hidden");
      //Unhide MailChimp response
      $("#mce-responses").removeClass("hidden");
      //Track with mixpanel
      mixpanel.track("Email Added");
      //Track Google event
      ga('send', {
        hitType: 'event',
        eventCategory: 'EmailList',
        eventAction: 'emailAdded',
        eventLabel: 'Landing Page',
        emailAddress : email,
        referrer : getURLParam('ref')
      });
      //Facebook pixel event
      fbq('track', 'Email Added', {
      value: 0.4458, //assume $14.95 is converting value and 3% will convert.
      currency: 'USD'
      });
    } else {
      console.log("invalid email");
      $(".hero-form .form-input").val("").attr("placeholder", "Invalid Email Address");
    }
  });
  //Hide Sumome & Clicky
  setTimeout(function(){
    $("a[title='Sumo'], a[title='Real Time Analytics']").hide();
  }, 1000);
});
