const baseRestApiUrl = '/api/'
const APIkey = 'e618cba18842237ac0d638884c3a4574'
// TODO load last city from 
LoadAutocomplites()


function WeatherByCityName(event) {
  event.preventDefault()
  let requestData = {
    method: 'GET',
  }
  const currentWeatherRequest = new Request(`http://api.openweathermap.org/data/2.5/weather?q=${document.forms['city-search'].elements['city-name'].value}&appid=${APIkey}`,
    requestData)
  const weekWeatherRequest = new Request(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${document.forms['city-search'].elements['city-name'].value}&appid=${APIkey}`,
    requestData)

  fetch(currentWeatherRequest).then(
    i => RenderCurrentWeather(i.json())
  )
  fetch(weekWeatherRequest).then(
    i => RenderWeekWeather(i.json())
  )
}

function RenderCurrentWeather(weather) {
  console.log(weather)
}
function RenderWeekWeather(weather) {
  console.log(weather)
}

function LoadAutocomplites() {
  let requestData = {
    method: 'GET'
  }
  const request = new Request(baseRestApiUrl + 'city-list', requestData)
  fetch(request).then(function (response) {
    response.json().then(data => {
      var elems = document.querySelectorAll('.autocomplete');
      var instances = M.Autocomplete.init(elems,
        {
          'data': data,
          limit: 5
        });
    })
  })
}