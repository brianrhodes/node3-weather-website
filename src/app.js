const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diretory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brian Rhodes' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Brian Rhodes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        text: 'This page will show help text',
        name: 'Brian Rhodes'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })

    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})


app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Brian Rhodes',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Brian Rhodes',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})