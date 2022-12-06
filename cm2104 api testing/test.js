$(function(){

    
    $('#searchform').submit(function(){
        // let genres = $('#Search1 option:selected').val();

         let genre1 = $('#Search1 option:selected').val();
         let genre2 = $('#Search2 option:selected').val();
         let genre3 = $('#Search3 option:selected').val();
        // console.log($('#Search1 option:selected').val());
         let inputGenres = [genre1, genre2, genre3];
        var page = 1
        call(page);
        function call(page){
            let settings = {
                
                "async": true,
                "crossDomain": true,
                "url": "https://rawg-video-games-database.p.rapidapi.com/games?key=9623e651ca75400cbc40538aa5f78318&page_size=40&genres=" +  genre1 + "&page=" + page,
                // "url": "https://rawg-video-games-database.p.rapidapi.com/genres?key=9623e651ca75400cbc40538aa5f78318&page2",
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "0fd4b80127mshfa64ce0fa71ebb5p1c55dfjsnb454d1c72a77",
                    "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com"
                }
            };

            newGame = "blank";
            $.ajax(settings).done(function (response) {
                // response.results = $(response.results).slice(0,1);

     	        console.log(response);
         
                console.log(genre1, genre2, genre3)
                checkGenres(response)
                function checkGenres(response) {
                let checkInputs = [false, false, false];
                console.log("ANOTHER TEST")
                console.log(page)
                // console.log(response.length)
                console.log([genre1, genre2, genre3])
                for(let i=0; i< 40; i++){
                    if(response.results[i].genres.length > 2){
                    
        
                        for(let j=0;j<response.results[i].genres.length; j++){
                            for(let k=0; k<3; k++){
                                if (response.results[i].genres[j].slug == inputGenres[k]){
                                    checkInputs[k] = true;
                                    console.log(k + " " + response.results[i].genres[j].slug + " " + inputGenres[k])
                                }
                            }
                            let allTrue = true;
                            for(let k=0; k<3; k++){
                            
                                if (checkInputs[k] != true){
                                    allTrue = false
                                }
                            }
                            if(allTrue){
                                newGame = "<p>" + response.results[i].name + ".    Rating: " + response.results[i].rating + "</p> <br> <img src ='" + response.results[i].background_image + " '> </img>";
                                console.log("new game found" + newGame)
                                addResult(newGame);
                                // break;
                                // return newGame, gameImage
                                return newGame
                            }
                        
                        }
                    
                    }

                }
                };
            if(newGame==="blank"){
                console.log("blank")

                page++
                call(page);
            }
            
            return newGame
        })
        }
        console.log("test")

        });

         function addResult(htmlstring){
            
            console.log(htmlstring)
            $('#results').html(htmlstring);
            
            
        }
        return false; // stops page reloading
    });



