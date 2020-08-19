const baseRestApiUrl = '/api/'
const APIkey = 'e618cba18842237ac0d638884c3a4574'
const hogan = require('hogan.js')
const $ = require('jquery')

// TODO load last city from 
LoadAutocomplites()
const template = hogan.compile(`<div class="container">
<div class="row">
  <div class="col">City name : {{name}}</div>
  <div class="col">Coord : {{coord.lat}} {{coord.lon}}</div>
</div>
<div class="row">
  <div class="col">Temp : {{main.temp}} °C</div>
  <div class="col">Pressure : {{main.pressure}}</div>

</div>
</div>`)

WeatherByCityName = function (event) {
  event.preventDefault()
  let requestData = {
    method: 'GET',
  }
  const currentWeatherRequest = new Request(`http://api.openweathermap.org/data/2.5/weather?q=${document.forms['city-search'].elements['city-name'].value}&appid=${APIkey}`,
    requestData)
  

  fetch(currentWeatherRequest).then(
    i => RenderCurrentWeather(i.json())
  )
  
}

async function RenderCurrentWeather(weather) {
  let req = await weather
  console.log(req)
  req.main.temp -= 273.15
  req.main.temp = req.main.temp.toFixed(2)
  $('#current-weather').innerHTML = template.render(req)
}


function LoadAutocomplites() {
  let requestData = {
    method: 'GET'
  }
  const request = new Request(baseRestApiUrl + 'city-list', requestData)
  fetch(request).then(function (response) {
    response.json().then(data => {
      var elems = $('.autocomplete');
      var instances = M.Autocomplete.init(elems,
        {
          'data': data,
          limit: 5
        });
    })
  })
}