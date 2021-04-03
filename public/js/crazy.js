$(document).ready(function () {
      
    var giphyURL ="https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=12&q=crazy";
    
    $.get(giphyURL).then(function (data) {
        
        let counter = 0;
        let containerWidth = $('.gif-row-crazy').width()
        let containerFill = 0           
        
        for(let i = 0; i < 12;i++ )
        {
            let imageURL = data.data[counter].images.fixed_height.url;
            let imageWidth = data.data[counter].images.fixed_height.width;     
   
            containerFill = parseInt(containerFill) + parseInt(imageWidth)
            if (containerFill > containerWidth) { continue; }

            $(".giphy" + counter).attr("src", imageURL);
            $(".giphy" + counter).parent().addClass("animate__animated animate__backInLeft animate_" + counter)
            counter = counter + 1

            if (counter == 8 ) { break; }
        }

    });

    $("body").delegate(".mood-tag", "click", function(){
       
        $('.col').removeClass("animate__animated animate__backInLeft")


        for(let i = 0; i < 8; i++ )
        {
            $('.col').removeClass("animate_" + i)
        }

        theMood = $(this).attr("id")
        theNewUrl = "https://api.giphy.com/v1/gifs/search?api_key=RANHjz2L1Drs7AUTUKTyWRWnP2iuiQpy&limit=12&q=" + theMood;

        $('.gif-row-crazy img').attr("src", '');

        $('.spinner-border').show()
       
        $.get(theNewUrl).then(function (data) {
            
            let counter = 0;
            let containerWidth = $('.gif-row-crazy').width()
            let containerFill = 0

            
            console.log(containerWidth);

            for(let i = 0; i < 12;i++ )
            {
                let imageURL = data.data[counter].images.fixed_height.url;
                let imageWidth = data.data[counter].images.fixed_height.width;                     
                
                containerFill = parseInt(containerFill) + parseInt(imageWidth)

                if (containerFill > containerWidth) { continue; }

                
               
                $(".giphy" + counter).attr("src", imageURL);
                $(".giphy" + counter).parent().addClass("animate__animated animate__backInLeft animate_" + counter)
                counter = counter + 1

                if (counter == 8 ) { break; }
            }

            $('.spinner-border').hide() 
        
        });
    }) 

})