const express = require('express')
let cities = {}
require('./city-list.json').map(i=>i.name).reduce(function(t,current)
{
    cities[`${current}`] = null
})
const app = express()
const restAddress = '/api'
const port = process.env.WEB_PORT || 4000;
const host = process.env.WEB_HOST || 'localhost';

app.use('/', express.static(__dirname + '/public'));

app.get(restAddress+ '/city-list',function(req,res) //get cities
{
    res.status(200).json(cities) //send json
})

// запуск прослушивания веб-запросов настроенным выше экземпляром веб-сервера
app.listen(port, host, function () {
    console.log(`running on http://${host}:${port}`);
  });