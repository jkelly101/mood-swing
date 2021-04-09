$(document).ready(function () {
  // var giphyURL =
  // "https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=12&q=unhappy";
  $.get(`/api/giphy/unhappy`).then(function (data) {
    let counter = 0;
    console.log(data);
    let containerWidth = $(".gif-row").width();
    let containerFill = 0;

    for (let i = 0; i < 12; i++) {
      let imageURL = data.data[counter].images.fixed_height.url;
      let imageWidth = data.data[counter].images.fixed_height.width;

      containerFill = parseInt(containerFill) + parseInt(imageWidth);
      if (containerFill > containerWidth) {
        continue;
      }

      $(".giphy" + counter).attr("src", imageURL);
      $(".giphy" + counter)
        .parent()
        .addClass("animate__animated animate__backInLeft animate_" + counter);
      counter = counter + 1;

      if (counter == 8) {
        break;
      }
    }
  });

  $(".add-custom").click(function () {
    var tag = $("#custom-tag-input").val();

    if (tag.length < 1 || typeof tag != "string") {
      return;
    }

    var newIcon = $("<i>");
    newIcon.addClass("fas fa-user-circle pe-1");

    var newTag = $("<span>");
    newTag.addClass("badge bg-light text-dark me-1 mood-tag");
    newTag.attr("id", tag);

    newTag.text(tag);
    $(newTag).prepend(newIcon);

    $(".mood-holder").append(newTag);

    var modalEl = document.getElementById("customModal");
    var modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  });

  $("body").delegate(".mood-tag", "click", function () {
    $(".col").removeClass("animate__animated animate__backInLeft");

    for (let i = 0; i < 8; i++) {
      $(".col").removeClass("animate_" + i);
    }

    theMood = $(this).attr("id");
    // theNewUrl =
    //   `https://api.giphy.com/v1/gifs/search?api_key=${giphy_APIKEY}&limit=12&q=` +
    //   theMood;

    $(".gif-row img").attr("src", "");

    $(".spinner-border").show();

    $.get(`/api/giphy/${theMood}`).then(function (data) {
      let counter = 0;
      let containerWidth = $(".gif-row").width();
      let containerFill = 0;

      console.log(containerWidth);

      for (let i = 0; i < 12; i++) {
        let imageURL = data.data[counter].images.fixed_height.url;
        let imageWidth = data.data[counter].images.fixed_height.width;

        containerFill = parseInt(containerFill) + parseInt(imageWidth);

        if (containerFill > containerWidth) {
          continue;
        }

        $(".giphy" + counter).attr("src", imageURL);
        $(".giphy" + counter)
          .parent()
          .addClass("animate__animated animate__backInLeft animate_" + counter);
        counter = counter + 1;

        if (counter == 8) {
          break;
        }
      }

      $(".spinner-border").hide();
    });
  });

  $.get("/api/sad").then(function (data) {
    bookCount = data.books.items.length;
    console.log(data.books);

    for (var i = 0; i < 8; i++) {
      let title = data.books.items[i].volumeInfo.title;
      let imageURL = data.books.items[i].volumeInfo.imageLinks.thumbnail;
      let desc = data.books.items[i].volumeInfo.description;

      $(".books" + i).attr("src", imageURL);
      $(".book-title-" + i).text(title);
      $(".book-desc-" + i).text(desc);
    }
  });
  $.get("/api/movies/sad").then(function (data) {
    console.log(data.movies.results);
    let movieArray = data.movies.results;
    let movieDiv = $("#movie-div");

    for (let i = 0; i < 2; i++) {
      console.log(movieArray[i]);
      let title = movieArray[i].title;
      let poster = `http://image.tmdb.org/t/p/w185/${movieArray[i].poster_path}`;
      let overview = movieArray[i].overview;
      let currentMovie = `<div class="card"style="width: 40%"> 
        <img src=${poster} class="card-img-top" alt="movie poster"/>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${overview}</p>
        </div>
      </div>`;
      movieDiv.append(currentMovie);
    }
  });
});
