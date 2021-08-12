const { builtinModules } = require('module')
const request = require('request')

geocode = (address, callback) => {
    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYnJpYW5yaG9kZXMxMzkiLCJhIjoiY2tzNmNxN2djMDFncDJ4cm1xM3YxNGFkNiJ9.upl76hPik16CUTKquYQ9yg&limit=1'

    request( { url: geo_url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode