

$(document).ready(function () {
      
    var giphyURL ="https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=6&q=motivation";
    
    $.get(giphyURL).then(function (data) {
        console.log(data)
        for(var i = 0; i < 6;i++ )
        {
            let imageURL = data.data[i].images.fixed_height.url;
            $(".giphy" + i).attr("src", imageURL);
        }

    });

    $.get("/api/mood").then(function (data) {
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

  });