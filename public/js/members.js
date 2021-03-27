var queryURL =
  "https://api.giphy.com/v1/gifs/trending?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=1";

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  $.get(queryURL).then(function (data) {
    // $(".giphy").text(data);
    console.log(data);
    var imageURL = data.data[0].images.fixed_height.url;
    $(".giphy").attr("src", imageURL);
  });
});
