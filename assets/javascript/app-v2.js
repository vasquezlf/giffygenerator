// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.


$(document).ready(function(){
    // ************************* GENERAL ***********************
    // JS for NAV
    $('#menu-toggle').on('click',function(){
        $('.ui.sidebar').sidebar('toggle')
    })

    var queryURLBase = "http://api.giphy.com/v1/gifs/search"
    //add API key param
    var apiKey =  "dc6zaTOxFJmzC"
    
    // *********************************************************

    // 1. Event listener
    $('#search-button').on('click', function (event) {
        event.preventDefault()
        //***** Setup Variables ******/
        // Get value from search-term
        var giffyTerm = $('#search-input').val()
        var giffyLimit = $('#giffy-number').val()
        
        //***** *************** ******/
        queryURLBase += '?' + $.param({
            'api_key':apiKey,
            'q': giffyTerm
        })
        console.log(queryURLBase)

        $.ajax({
            url: queryURLBase,
            method: "GET"
        }).then(function(response){
            console.log(response)
            // Find number of giffys in the array
            var numberOfGiffys = response.data.length

            for (var i = 0; i < numberOfGiffys; i++){
                var giffyAnimated = response.data[i].images.fixed_width.url
                var giffyStill = response.data[i].images.fixed_width_still.url
                var giffyRating = response.data[i].rating
                console.log(giffyAnimated)
                console.log(giffyStill)
                console.log(giffyRating)

                // **********TEST***************
                // $('#test-image').attr('src', giffyAnimated)
                // ***************************** //
                
                var uiPieces = [
                    {
                        htmlTag: 'div',
                        attributes: [
                            {
                                key: 'class',
                                value: 'eight wide column'
                            }
                        ]
                    },
                    {
                        htmlTag: 'div',
                        attributes: [
                            {
                                key: 'class',
                                value: 'ui image'
                            }
                        ]
                    },
                    {
                        htmlTag: 'img',
                        attributes: [
                            {
                                key: 'src',
                                value: giffyAnimated
                            },
                            {
                                key: 'data-still',
                                value: giffyStill
                            },
                            {
                                key: 'data-animate',
                                value: giffyAnimated
                            }
                        ]
                    },
                    {
                        htmlTag: 'div',
                        value: 'Rating: ',
                        attributes: [
                            {
                                key: 'class',
                                value: 'content'
                            }
                        ]
                    },
                    {
                        htmlTag: 'span',
                        value: giffyRating
                    }

                ] //END uiPieces[]

                uiPieces.forEach(function(piece){
                    if(!piece.value) {
                    // Don't want to append empty values!
                    return
                    }

                    var htmlTag = $(`<${piece.htmlTag}>`).text(piece.value)

                    if (piece.attributes) {
                        piece.attributes.forEach(function(attribute) {
                          htmlTag.attr(attribute.key, attribute.value)
                        })
                      }

                      

                })
            }

        })

    })
    
})