$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});

// on click function (may require ajax call)
$(".mood-click").on("click", (event) => {
  //
  event.preventDefault();
  let mood = $(event.target).attr("id");
  window.location.replace(`/${mood}`);
});

// send something to the route
// $("#sad");
// theoretically we can set a mood in local storage... can we grab from the background, big mystery
