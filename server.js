const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', __dirname);  // Set the views directory

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})


app.post('/weather', (req, res) =>{
    const cityName = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fd9d75a6ffe609900532497d00fcc0fb&units=metric`

    https.get(url, (response)=>{
        let data = '';

        response.on('data', (chunk)=>{
           data+=chunk;
        })
        
        response.on('end', ()=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.render('weathercard', { cityName, temp, desc, icon });

        })
    })
    
    
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})
