const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3706267b01f7117c6df19232cdd1a9c9&query=' + latitude + ',' + longitude + ',%20-71.18843798855329&units=f'

    request( { url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        }
        else if(response.body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' -  It is currently ' + response.body.current.temperature + ".  It feels like " + response.body.current.feelslike + " degrees.  The humidity is " + response.body.current.humidity + ", with a cloud cover of " + response.body.current.cloudcover + "%.")
        }
    })
}

module.exports = forecast