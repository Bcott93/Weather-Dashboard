


const searchBtn = $("#search-button")
// let apiKey = "a0822daa77d2fe015266567cae2f77a3"
const tempKey = "d91f911bcf2c0f925fb6535547a5ddc9"



$("#search-button").on("click", function (event) {
  event.preventDefault()
  const city = $('#search-input').val().trim()
  console.log(city)

  let geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + tempKey
  console.log(geoQueryURL)
  $.ajax({
    url: geoQueryURL,
    method: "GET"

  }).then(function (response) {
    console.log(response);
        let latitude = response[0].lat.toFixed(2);
        let longitude = response[0].lon.toFixed(2);
        let weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + tempKey;
        console.log(weatherQueryURL);

        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    });
});




// let result;
// function getData() {
//     return latitude;
// }
// result = getData();
// console.log(result); // "data from inside the function"