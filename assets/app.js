$(document).ready(function() {
  //Global Variables are declated here
  const apikey = "apikey=vT2XZqQdvN88TSL4h9wqV8pXsXJWj10d";
  const queryUrlBase = "https://api.giphy.com/v1/gifs/search?q=";
  const countOfGifs = 3;
  var currentCountOfGifs = 0;

  //This array will hold the initial subjects that will be displayed on the screen
  let topicArray = [
    "suits",
    "louis litt",
    "big bang theory",
    "sheldon cooper",
    "GOT",
    "Friends",
    "rachel",
    "Walter White",
    "Breaking Bad",
    "Jesse Pinkman",
    "leonardo dicaprio"
  ];

  /*Load Initial Buttons  using the topicArray. 
  Defines click event on the button that will invoke getGifs() by passing the search term*/
  function loadButtons(arrayOfTopics) {
    $(".buttonArea").empty();

    arrayOfTopics.forEach(function(arrayItem) {
      $(".buttonArea").append(
        $("<button>", {
          type: "button",
          class: "btn btn-success btn-sm m-3 animalButton",
          text: arrayItem.toUpperCase()
        }).on("click", function() {
          //   console.log("Clicked Animal Button : " + $(this).text());
          getGifs($(this).text());
        })
      );
    });
  }

  //Accepts a search term and creates a queryUrl. It invokes the function for API Call.
  //Using the response, it then invokes a function call to display the GIFs on the page
  function getGifs(searchTerm) {
    console.log("Looking for GIFs for : " + searchTerm);
    queryUrl =
      queryUrlBase + searchTerm + "&" + apikey + "&limit=" + countOfGifs;
    console.log(queryUrl);
    makeGiphyApiCall(queryUrl).then(function(giphyResponse) {
      //   console.log(giphyResponse);
      //   console.log("Displayed Response");
      $(".gifArea").empty();
      displayGifs(giphyResponse);
    });
  }

  //Makes the API Call
  function makeGiphyApiCall(queryUrl) {
    return fetch(queryUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      });
  }

  //Uses the response from GIPHY API and displays in back on the screen
  function displayGifs(giphyResponse) {
    console.log("Beginnig to display Gifs");

    //Shows GIF, Rating, User ID of each GIF
    for (var i = 0; i < giphyResponse.pagination.count; i++) {
      var animatedUrl = giphyResponse.data[i].images.downsized.url;
      var staticUrl = giphyResponse.data[i].images.original_still.url;
      var gifRating = giphyResponse.data[i].rating;
      var gifTitle = giphyResponse.data[i].title;
      
      //It is possible that the API response doesnt have a "user" element
      if (giphyResponse.data[i].hasOwnProperty("user")) {
        var userIdOfGif = giphyResponse.data[i].user.display_name;
        var userIDUrl = giphyResponse.data[i].user.profile_url;
      } else {
        var userIdOfGif = "Unknown";
        var userIDUrl = "#";
      }

      //Dynamically creates DOM elements and appends to pre-defined DIV
      $(".gifArea").append(
        $("<div>", {
          class: "col-4 col-md-4 gifImageBlock justify-content-md-center"
        })
          .append(
            $("<img>", {
              src: staticUrl,
              alt: gifTitle,
              "data-state": "still",
              class: " row gifImage img-fluid justify-content-md-center",
              "still-image": staticUrl,
              "animated-image": animatedUrl
            })
          )
          .append(
            $("<div>", {
              text: "Rating : " + gifRating.toUpperCase(),
              class: " row gifRatingStyle justify-content-md-center"
            })
          )
          .append(
            $("<a>", {
              href: userIDUrl,
              text: "User ID : " + userIdOfGif.toUpperCase(),
              class: " row gifUserId justify-content-md-center"
            })
          )
      );

      //Some basic stylining
      $(".gifImage").css({
        padding: "10px",
        margin: "10px",
        width: "400px",
        height: "300px",
        position: "relative"
      });
    }
    //Keeps the current count of GIFs. This is needed while adding more GIFs
    currentCountOfGifs += giphyResponse.pagination.count;
    $(".gifImage").on("click", function() {
      if ($(this).attr("data-state") === "still") {
        console.log("Going to animate an image");
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("animated-image"));
      } else {
        console.log("Going to make the image still");
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("still-image"));
      }
    });
  }

  //Adding Topics accepting input from the form.
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    if (
      $("#topic-input")
        .val()
        .trim().length > 0
    ) {
      topicArray.push($("#topic-input").val());
    }
    loadButtons(topicArray);
  });

  //Adding more GIFs
  $("#add-more-gifs").on("click", function(event) {
    console.log("Going to add more GIfs");
    event.preventDefault();
    queryUrl += "&offset=" + currentCountOfGifs;
    console.log(queryUrl);
    $(".gifImage").off("click");
    makeGiphyApiCall(queryUrl).then(function(giphyResponse) {
      displayGifs(giphyResponse);
    });
  });

  loadButtons(topicArray);
});
