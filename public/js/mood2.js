// on click function (may require ajax call)
$(".mood-click").on("click", (event) => {
  //
  event.preventDefault();
  let mood = $(event.target).attr("id");
  window.location.replace(`/mood2/${mood}`);
});

// send something to the route
// $("#sad");
// theoretically we can set a mood in local storage... can we grab from the background, big mystery
