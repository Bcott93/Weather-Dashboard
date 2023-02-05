// Initiates Jquery
$(document).ready

// Creates a variable for the search button in HTML
const searchBtn = $("#search-button")

// My key to access the data from Openweathers API's
const apiKey = "a0822daa77d2fe015266567cae2f77a3"

// Creates a function to show userInput history
function createHistoryBtn(cityFormatted) {
  // Creates a variable to make and name a history button
  const historyBtn = $("<button>").text(cityFormatted)
  // Adds functionality to the button
  historyBtn.on("click", function (event) {
   // Stops the page refreshing
   event.preventDefault()
   // Clears the currently shown data on the HTML page
   $("#weather-container").empty()
   // Runs the weatherdata function for the relevant city to the button
   getWeatherData(cityFormatted)
 })
 // Adds the button to the HTML document
 $("#history").append(historyBtn)
}

// Adds a click event to the search button 
$("#search-button").on("click", function (event) {
  // Stops the page refreshing
  event.preventDefault()
  // Adds a variable for the userinput
  const city = $('#search-input').val().trim()
  // Formats the user input
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
  // Runs the create history button function
  createHistoryBtn(cityFormatted)
  // Runs the function to populate the on click function
  getWeatherData(cityFormatted)
})

// Creates a function which finds the required weather data
function getWeatherData(cityFormatted) {
  // Sets the URL for the location API, including the variables required
  let geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityFormatted + "&appid=" + apiKey
  // Uses Jquery to pull the data from the API
  $.ajax({
      url: geoQueryURL,
      method: "GET"
    // Tells JS to wait until the above function has completed
  }).then(function (response) {
    // Sets variables from first ajax to populate API query
    let latitude = response[0].lat.toFixed(2)
    let longitude = response[0].lon.toFixed(2)
     // Sets the URL for the location API, including the variables required
    let weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey
  
      // Uses Jquery to pull the data from the API
      $.ajax({
          url: weatherQueryURL,
          method: "GET"
      // Tells JS to wait until the above function has completed
      }).then(function (response) {
        // Sets the Variable responseData to an array
        let responseData = []
        // Loops the response from the api, and pulls every 8th input. 8th input to ensure data is at a consistant time of day
        for(let i = 0; i < response.list.length; i+=8) {
        // Sets the date and formats it  
        let responseDate = moment(response.list[i].dt_txt).format("Do MMMM YYYY")
        // Creates a div with the temperature value, changes Kelvin to Celsius and shows the Celsius symbol
        let responseTemp = $("<div>").append("Temp: ", ((response.list[i].main.temp - 273.15).toFixed(2)  +'&#8451;'))
        // Creates a variable with the code indicating the current weather
        let responseIcon = (response.list[i].weather[0].icon)
        // Pulls the corresponding icon from the URL
        let responseIconShow = "https://openweathermap.org/img/w/" + responseIcon + ".png"
        // Creates a div with the humidity value, adds a % symbol
        let responseHumidity = $("<div>").append("Humidity: ", (response.list[i].main.humidity) + '%')
        // Creates a div with the Wind Speed variable and sets its unit of measure
        let responseWindSpeed = $("<div>").append("Wind Speed: ", (response.list[i].wind.speed) + ' meters per second')
        
        // Pushes the response data into an array of objects for ease of access
        responseData.push({
        date: responseDate,
        temp: responseTemp,
        icon: responseIcon,
        iconShow: responseIconShow,
        humidity: responseHumidity,
        windSpeed: responseWindSpeed
      })
      // If there is data, empty the container and run the loop
      if (responseData.length > 0) {
        $("#weather-container").empty()
        // Loop the responseData
        for (let i = 0; i < responseData.length; i++) {
         // Create a div to input the data, added a class for formatting
         let newDiv = $("<div>").addClass("response-section")
         // Adds a header with the City name and the date
         let cityName = $("<h2>").text(cityFormatted + " (" + responseData[i].date + ")")
         // Adds the icon to the section
         let weatherIcon = $("<img>").attr("src", responseData[i].iconShow)
         // Sets variables for the rest of the data required
         let temp = responseData[i].temp
         let humidity = responseData[i].humidity
         let windSpeed = responseData[i].windSpeed
  
        // Appends all the variables and adds them to the HTML
        newDiv.append(cityName, weatherIcon, temp, humidity, windSpeed)
        $("#weather-container").append(newDiv)
      }
     }
    }
  })
 })
}  


  
    

                
           
    
      

     




