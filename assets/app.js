$(document).ready(function() {
  const apikey = "apikey=vT2XZqQdvN88TSL4h9wqV8pXsXJWj10d";
  const queryUrlBase = "https://api.giphy.com/v1/gifs/search?q=";
  const countOfGifs = 10;
  let animalArray = [
    "lion",
    "tiger",
    "monkey",
    "turtle",
    "zebra",
    "rhino",
    "mouse",
    "tiger",
    "bear",
    "gorilla"
  ];
  /*Load Initial Buttons */
  function loadButtons(arrayOfTopics) {
    $(".buttonArea").empty();

    arrayOfTopics.forEach(function(arrayItem) {
      $(".buttonArea").append(
        $("<button>", {
          type: "button",
          class: "btn btn-success btn-md m-3 animalButton",
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
      var animatedUrl = giphyResponse.data[i].url;
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
          class: "col col-md-4"
        })
          .append(
            $("<img>", {
              src: staticUrl,
              alt: gifTitle,
              "data-state": "still",
              class: " row gifImage",
              "still-image" : staticUrl,
              "animated-image" : animatedUrl
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
        width: "400px",
        padding: "10px",
        height: "300px",
        margin: "10px"
      });
    }
    $(".gifImage").on("click", function() {
      console.log("Clicked an Image");
      if ($(this).attr('data-state') === "still") {
        console.log("Changing to Animate")
        $(this).attr('data-state', 'animate');
        // console.log($(this).attr('animated-image'));
        $(this).attr('src', $(this).attr('animated-image'));

      } else{
        console.log("Changing to Still")

        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr('still-image'));
      }

    });
  }

  loadButtons(animalArray);
});
