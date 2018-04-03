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
    

    // Hide circular buttons
    $('.ui.circular.button').css('visibility', 'hidden')

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

            for (var i = 0; i < giffyLimit; i++){
            ////// 2A-v1. Parse through the response and store in variables
                // var giffyObject = response.data[i]
            ////// 2A-v2. Parse through the response and randomly pick giffys
            // var giffyObject = ''
            // var arrayRandomGiffys = []
            // var arrayRandomIdeces = randomNoRepeat(numberOfGiffys)
            // console.log('I AM HERE: ' + arrayRandomIdeces)
            // arrayRandomIdeces.forEach(function(randomIndex){
            //     arrayRandomGiffys = response.data[randomIndex]
            // })

            // giffyObject = arrayRandomGiffys[i]


            ////// 2A-v1. Parse through the response and store in variables
                var randomNumber = Math.floor(Math.random() * numberOfGiffys)
                var giffyObject = response.data[randomNumber]

                // ** Error handler: If the article array returns empty, exit out of for loop
                if (giffyObject === undefined) {
                    console.log('NO MORE GIFFYs') // ****************
                    break
                }
                
                var boolDataState = true    // ***** IMPORTANT Change this for default state to true for animate, false for still ****
                var giffyAnimated = giffyObject.images.fixed_width.url
                var giffyStill = giffyObject.images.fixed_width_still.url
                var giffyRating = giffyObject.rating
                console.log(giffyAnimated)
                console.log(giffyStill)
                console.log(giffyRating)

                // **********TEST***************
                // $('#test-image').attr('src', giffyAnimated)
                // ***************************** //
                
                ////// 2B. Create elements and assign querried data
                // Create div.row to all giffy elements
                var $giffyRow = $('<div class="eight wide column">')
                /// Create div.ui.image to hold <img> tag
                var $giffyImage = $('<div class="ui bordered rounded image">')
                //// Create img and assign additional data for animate and still shots
                var $giffyImg = $('<img>').attr({
                    'src': giffyAnimated,           // ***** IMPORTANT Change this for default state****
                    'data-still': giffyStill,
                    'data-animate': giffyAnimated,
                    'data-state': boolDataState
                })
                //// Create copy to clipboard button
                var $giffyButton = $('<button class="ui large circular icon button" id="button-copy"><i class="paste icon"></i></button>')
                //// Create content
                var $giffyContent = $('<div class="content">').text('Rating: ')
                //// Create span
                var $giffyContentSpan = $('<span id="span-rating">').text(giffyRating)

                ////// 2C. Append elements to proper containers
                // Attach div.row
                $('#gallery-giffy').prepend($giffyRow)
                /// Attach div.ui.image
                $($giffyRow).append($giffyImage)
                //// Attach copy-to-clipboard button
                $($giffyImage).append($giffyButton)
                //// Attach img
                $($giffyImage).append($giffyImg)
                //// Attach div.content
                $($giffyImage).append($giffyContent)
                //// Attach span to content
                $($giffyContent).append($giffyContentSpan)

               
            }

        })
   
    })

    
    
    // Method: 1
    $('#gallery-giffy').on('mouseover', 'img', function() {
        
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', false)
        
    })

    $('#gallery-giffy').on('mouseout', 'img', function() {
        $(this).attr('src', $(this).data('animate'))
        $(this).attr('data-state', true)
       
    })

    // Method: 2 - Show and hide circular buttons -- -how to make this work?
    // $(document).on({
    //     mouseover: function() {
    //         // Show circular buttons when hovering over image
    //         $($(this).children().first()).css('visibility', 'visible')
    //         console.log($(this).children().first())
    //     },
    //     mouseleave: function() {
    //         //  Hide circular buttons when done hovering over image
    //         $($(this).children().first()).css('visibility', 'hidden')
    //         console.log($(this).children().first())
            
    //     }, 
    // })


    // Add functionality: Show/Hide clipboard button
    $(document).on('mouseover', 'div.ui.image', function() {
        
        $($(this).children().first()).css('visibility', 'visible')
    })

    $(document).on('mouseout', 'div.ui.image', function() {
       //  Hide circular buttons when done hovering over image
       $($(this).children().first()).css('visibility', 'hidden')
    })

    // Add functionality: Make clipboard button work. Copy animated URL
    $(document).on('click', '#button-copy', function(){
        var copiedURL = $(this).next().data('animate')
        console.log(copiedURL)

        var $temp = $('<input>')
        $("body").append($temp);
        $temp.val($(copiedURL).text()).select();
        // $(copiedURL).select()
        document.execCommand("copy")
        $temp.remove();
        // copyText.select();
        // document.execCommand("Copy");
        // alert("Copied the text: " + copyText.value);

    })

    // Clear button functionality
    $(document).on('click', '#clear-button', function clearButton (){
        $('div.ui.divided.grid').empty()
    })


    
    // function randomNoRepeat(maxNumber) {
    //     var randomNumber = 0
    //     var arrayRandomNumbers = []

    //     for (var i = 0; i < maxNumber; i++) {
    //         randomNumber = Math.floor(Math.random() * maxNumber)
    //         arrayRandomNumbers.push(randomNumber)
    //         // Check for repeat number and subtract 1 from i so that iteration won't count
    //         if(arrayRandomNumbers.includes(randomNumber) && arrayRandomNumbers.length > 1 ) {
    //             arrayRandomNumbers.pop(randomNumber)
    //             i--
    //         }
    //         console.log(arrayRandomNumbers)
    //     }

    //     return arrayRandomNumbers
    // }
})