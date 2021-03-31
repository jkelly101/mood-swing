

$(document).ready(function () {
      
    var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=4&q=happy";
    
    $.get(queryURL).then(function (data) {
        console.log(data)
        for(var i = 0; i < 4;i++ )
        {
            var imageURL = data.data[i].images.fixed_height.url;
            $(".giphy" + i).attr("src", imageURL);
        }

    });

  });

