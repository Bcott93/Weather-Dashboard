// Initiates Jquery
$(document).ready

// Creates a variable for the search button in HTML
const searchBtn = $("#search-button")
// My key to access the data from Openweathers API's
// let apiKey = "a0822daa77d2fe015266567cae2f77a3"
const tempKey = "d91f911bcf2c0f925fb6535547a5ddc9"


// Adds a click event to the search button
$("#search-button").on("click", function (event) {
  // Stops the page from refreshing upon input.
  event.preventDefault()
  // Adds a variable for the userinput
  const city = $('#search-input').val().trim()


  // Sets the URL for the location API, including the variables required
  let geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + tempKey
  // Uses Jquery to pull the data from the API
  $.ajax({
    url: geoQueryURL,
    method: "GET"
  // Once the above function has taken place, sets variables and runs the second API query to find the weather
  }).then(function (response) {
    console.log(response);
        // Finds the data within the API, and sets the Longitute and Latitude    
        let latitude = response[0].lat.toFixed(2);
        let longitude = response[0].lon.toFixed(2);
        // Sets the URL for the location API, including the variables required
        let weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + tempKey;

  // Uses Jquery to pull the data from the API
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function (response) {
          let responseDate = moment(response.list[0].dt_txt).format("Do MMMM YYYY")
          let responseTemp = ((response.list[0].main.temp - 273.15).toFixed(2)  +'&#8451;')
          let responseIcon = (response.list[0].weather[0].icon)
          let responseIconShow = "https://openweathermap.org/img/w/" + responseIcon + ".png"
          let responseHumidity = (response.list[0].main.humidity) + '%'
          let responseWindSpeed = (response.list[0].wind.speed) + ' meters per second'
            console.log(response);
            console.log(city)
            console.log("Date: ", responseDate)
            console.log("icon", responseIcon)
            console.log(responseIconShow)
            console.log("Temp: ", responseTemp)
            console.log("Humidity: ", responseHumidity)
            console.log("Wind Speed: ", responseWindSpeed)
            $("#today").append(responseDate)
            $("#wicon").attr('src', responseIconShow);
           
            for(let i = 0; i < response.list.length; i+8)
              console.log(response.list[i].weather[i].icon)
        });

     
    });
});





  //  // Sets a variable for the time using moment() and formats
  //  let currentDate = moment().format("Do MMMM YYYY")
  //  $("#today").append(currentDate)
  //  console.log(currentDate)