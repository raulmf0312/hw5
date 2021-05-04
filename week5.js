// NOTE: Given that the API always returns 1-day forecast automatically, I decided that showing the 1-day forecast provides a better standard user experience. Therefore, I decided against omitting the 1-day forecast display when users select an input that is less than or equal to 0 days in the box.  

window.addEventListener('DOMContentLoaded', async function() {
   
   
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      
      // - Clear previous results
      let forecastElement = document.querySelector(`.forecast`)

      forecastElement.innerHTML = ``
    
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value
        
      // - Get a reference to the element containing the user-entered location
      let daysInput = document.querySelector(`#days`)
        
      // - Get the user-entered day-number from the element's value
      let days = daysInput.value

      // - Check to see if the user entered anything; if so:
      if (location.length > 0) {
          
            // - Construct a URL to call the WeatherAPI.com API
            let url = `https://api.weatherapi.com/v1/forecast.json?key=955ef970ea1c4f94b0c155417212704&q=${location}&days=${days}`
    
            // - Fetch the url, wait for a response, store the response in memory
            let response = await fetch(url)
    
            // - Ask for the json-formatted data from the response, wait for the data, store it in memory
            let json = await response.json()
    
            // - Write the json-formatted data to the JavaScript console
            console.log(json)
    
            // - Store the returned location, current weather conditions, the forecast as three separate variables
            let interpretedLocation = json.location
            let currentWeather = json.current
            let dailyForecast = json.forecast
    
            // Store a reference to the "current" element
            let currentElement = document.querySelector(`.current`)
    
            // Fill the current element with the location and current weather conditions
            currentElement.innerHTML = `
            <div class="text-center space-y-2">
                <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}, ${interpretedLocation.country} </div>
                <div class="font-bold">
                <img src="https:${currentWeather.condition.icon}" class="inline-block">
                <span class="temperature">${currentWeather.temp_f}</span>° 
                and
                <span class="conditions">${currentWeather.condition.text}</span>
                </div>
            </div>
            `
            
            // Create the tile for the forecast section using an IF conditional
            let numberDay = [`1`,`2`,`3`]
            let numberDayDisplayed = ``

            if (days <= 0) {
                numberDayDisplayed = numberDay[0]
            } else if (days == 1) {
                numberDayDisplayed = numberDay[0]
            } else if (days == 2) {
                numberDayDisplayed = numberDay[1]
            } else if (days >= 3) {
                numberDayDisplayed = numberDay[2]
            } else { 
                numberDayDisplayed = numberDay[0] 
            }

            // Store a reference to the "forecast " title
            let forecastTitle = document.querySelector(`.forecast`)
    
            // Fill the forecast element with the day-number and forecast weather conditions
            forecastTitle.insertAdjacentHTML(`beforeend`,`
            <div class="text-center space-y-8">
            <div class="font-bold text-3xl">${numberDayDisplayed}-Day Forecast</div>
            <break>
            <h2 class="text-xl">Important Notice: For the purporse of providing high accuracy in weather reporting (and not because of the limitations of our API, not at all), futures forecasts are limited to a maximum of three days.</h2>
            </break>
            `)

            // Create a for loop through the forecast details data
            for (let i=0; i<dailyForecast.forecastday.length; i++){

                // Create a variable to store each product in memory.
                let futureWeather = dailyForecast.forecastday [i]
        
                // Store a reference to the "forecast " element
                let forecastElement = document.querySelector(`.forecast`)
        
                // Fill the forecast element with the day-number and forecast weather conditions
                forecastElement.insertAdjacentHTML(`beforeend`,`
                <div class="text-center">
                        <img src="https:${futureWeather.day.condition.icon}" class="mx-auto">
                        <h1 class="text-2xl text-bold text-gray-500">${futureWeather.date}</h1>
                        <h2 class="text-xl">High ${futureWeather.day.maxtemp_f} – Low ${futureWeather.day.mintemp_f}</h2>
                        <p class="text-gray-500">${futureWeather.day.condition.text}</h1>
                    </div>
                </div>
                `)
            }
        }
    })
})