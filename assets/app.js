$(document).ready(function() {
  const apikey = "apikey=vT2XZqQdvN88TSL4h9wqV8pXsXJWj10d";
  const queryUrlBase = "https://api.giphy.com/v1/gifs/search?q=";
  const countOfGifs = 12;
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
  /*Load Initial Buttons */
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

  function getGifs(searchTerm) {
    console.log("Looking for GIFs for : " + searchTerm);
    queryUrl =
      queryUrlBase + searchTerm + "&" + apikey + "&limit=" + countOfGifs;
    console.log(queryUrl);
    makeGiphyApiCall(queryUrl).then(function(giphyResponse) {
      //   console.log(giphyResponse);
      //   console.log("Displayed Response");
      displayGifs(giphyResponse);
    });
  }

  function makeGiphyApiCall(queryUrl) {
    return fetch(queryUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      });
  }

  function displayGifs(giphyResponse) {
    console.log("Beginnig to display Gifs");
    $(".gifArea").empty();

    for (var i = 0; i < giphyResponse.pagination.count; i++) {
      var animatedUrl = giphyResponse.data[i].images.downsized.url;
      var staticUrl = giphyResponse.data[i].images.original_still.url;
      var gifRating = giphyResponse.data[i].rating;
      var gifTitle = giphyResponse.data[i].title;
      //   console.log("Round of : " + i)
      //   console.log(giphyResponse.data[i])
      //   if(giphyResponse.user.data[i].hasOwnProperty("user")){
      //       var userIdOfGif = giphyResponse.user.data[i].user.display_name
      //   }else{
      //       var userIdOfGif = "Unknown"
      //   };
      //   console.log(userIdOfGif);
      //   console.log(giphyResponse.data[i].user.hasOwnProperty("disiplay_name"))

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
            $("<div>", {
              text: "User Id : " + "xxx".toUpperCase(),
              class: " row gifUserId justify-content-md-center"
            })
          )
      );

      $(".gifImage").css({
        padding: "10px",
        margin: "10px",
        width: "400px",
        height: "300px",
        position: "relative"
      });
    }
    $(".gifImage").on("click", function() {
      console.log("Clicked an Image");
      if ($(this).attr("data-state") === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("animated-image"));
      } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("still-image"));
      }
    });
  }

  // This handles events where one button is clicked
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

  loadButtons(topicArray);
});
