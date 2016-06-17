var searchTerm; // What did the user enter into the search box.
var timing = 5; // How long does a background last prior to transitioning
var transition = "fade"; // does this actually get used?
var transitionTiming = .5; // How long in seconds does it take for the background transtion to occur

function getImage(){ // get s new background image based on the current user text
  var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg&tag=";
  $.getJSON(url + searchTerm, addToBackground); // Send a JSON query to giphy,
                                                // which will send back a response
                                                // that includes the url of an image_url
                                                // matching the query
}

function addToBackground(response){
  var imgUrl = response["data"]["image_url"]; // Get the url for the new bg image
  $("#background")
    .css("background-image", "url('" + imgUrl + "')") // Set the bg image to the
                                                      // one just acquired.
    .animate(  { // Animate the background transtion,
      opacity: 1  // I'm not sure what this does, but it's crucial; commenting out
                  // both opacity blocks breaks it
    },
    {
      duration: transitionTiming * 1000, // Convert ther seconds value to milliseconcs
      complete: function(){
        console.log("Done changing!");
      }
    })
    ;
}

function changeSlide(){
  $("#background").animate(  {
    opacity: 0 // I'm not sure what this does, but it's crucial; commenting out
               // both opacity blocks breaks it
  },
  {
    duration: transitionTiming * 1000,
    complete: function(){
      getImage(); // Get a new slide
    }
  });
}

function setSearchTerm(){
  searchTerm = $("#word").val(); // The search term is whatever value the user
                                 // has entered in the field
}

$(document).ready(function(){ // Once the document is ready
  setSearchTerm(); // Get initial search term. At start, it will be whatever the HTML
                   // defaults it to.
  changeSlide(); // Change the background to whatever the initial imag giphy sends back is.
  setInterval(changeSlide, timing * 1000); // Get a new background every timing
                                           // seconds.

  $("#word").keydown(function(evt){ // Event listener
    if(evt.keyCode === 13){ // When the user enters a return
      setSearchTerm(); // Get the new search term
      changeSlide(); // and change the slide
    }
  });
});
