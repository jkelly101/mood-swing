$(document).ready(function () {
      
    var giphyURL ="https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=6&q=angry";
    
    $.get(giphyURL).then(function (data) {
        console.log(data)
        for(let i = 0; i < 6;i++ )
        {
            let imageURL = data.data[i].images.fixed_height.url;
            let imageWidth = data.data[i].images.fixed_height.width;                     
                
            if (imageWidth > 450) { continue; }

            $(".giphy" + i).attr("src", imageURL);
        }

    });

    $('.mood-tag').click(function() {
       
        theMood = $(this).attr("id")
        theNewUrl = "https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=6&q=" + theMood;

        $('.spinner-border').show()
       
        $.get(theNewUrl).then(function (data) {
            
            var counter = 0;

            for(let i = 0; i < 6;i++ )
            {
                let imageURL = data.data[counter].images.fixed_height.url;
                let imageWidth = data.data[counter].images.fixed_height.width;                     
                
                if (imageWidth > 400) { continue; }
               
                $(".giphy" + counter).attr("src", imageURL);
                counter = counter + 1
            }

            $('.spinner-border').hide()
    
        
        });
    }) 

    $.get("/api/angry").then(function (data) {
        bookCount = data.books.items.length
        console.log(data.books)
        
        for(var i = 0; i < 8;i++ )
        {
            

            let title = data.books.items[i].volumeInfo.title;
            let imageURL = data.books.items[i].volumeInfo.imageLinks.thumbnail;
            $(".books" + i).attr("src", imageURL);
            // $(".book-title-" + i).text(title);
        }

    });
    $.get("/api/movies/angry").then (function(data) {
        console.log(data.movies.results);
        let movieArray = data.movies.results;
        let movieDiv = $("#movie-div");
        
        for(let i = 0; i < 4; i ++) {
            console.log(movieArray[i])
            let title = movieArray[i].title; 
            let poster =`http://image.tmdb.org/t/p/w185/${movieArray[i].poster_path}`;
            let overview = movieArray[i].overview;
            let currentMovie = `<div class="card bg-danger"style="width: 14%"> 
            <img src=${poster} class="card-img-top" alt="movie poster"/>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${overview}</p>
            </div>
          </div>`
          movieDiv.append(currentMovie);
         
        }
    })

  });