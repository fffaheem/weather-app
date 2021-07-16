const path = require("path")
const requests = require("requests")
const hbs = require("hbs")
const port = 80;
const express = require("express")
const app = express()


const staticPath = path.join(__dirname, "./static")
let static = express.static(staticPath)
app.use("/static", static)

const viewPath = path.join(__dirname, "./template/views")
app.set("view engine", "hbs")
app.set("views", viewPath)

const partialPath = path.join(__dirname, "./template/partials")
hbs.registerPartials(partialPath)



// let API = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=f2c0f6a4925be4fd35eb30bc1ee4f7cf`

app.get("/", (req, res) => {
    res.render("home",{
        homeActive:"active"
    })
})

app.get("/weather", (req, res) => {
    city = (req.query.city)
    API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f2c0f6a4925be4fd35eb30bc1ee4f7cf`
    if (city == null || city == "") {
        res.render("weather", {
            weatherActive:"active",
            containerHide: "hide",
            message: "Please Enter a city Name"
        })

    }
    else {
        requests(API,)
            .on('data', function (chunk) {
                let data = JSON.parse(chunk)
                if (data.message == "city not found") {
                    res.render("weather", {
                        weatherActive:"active",
                        containerHide: "hide",
                        message: "Please Enter a valid city Name"
                    })
                }
                else {
                    weatherOBJ = {
                        countryName: data.sys.country,
                        cityName: data.name,
                        temp: data.main.temp,
                        tempMax: data.main.temp_max,
                        tempMin: data.main.temp_min,
                        tempFeelsLike: data.main.feels_like,
                        weather: data.weather[0].main,
                        weatherDesc: data.weather[0].description
                    }

                    res.render("weather", {
                        weatherActive:"active",
                        mssgHide:"hide",
                        countryName: weatherOBJ.countryName,
                        cityName: weatherOBJ.cityName,
                        temp: weatherOBJ.temp,
                        tempMax: weatherOBJ.tempMax,
                        tempMin: weatherOBJ.tempMin,
                        tempFeelsLike: weatherOBJ.tempFeelsLike,
                        weather: weatherOBJ.weather,
                        weatherDesc: weatherOBJ.weatherDesc
                    })
                }
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
    }

    // console.log(req.query.city)
    // console.log(API)

})


app.get("/weather/*", (req, res) => {
    res.render("404", {
        statusCode: 404,
        message: "OOPS, This about us Page does not exist"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        statusCode: 404,
        message: "OOPS Page not Found"
    })
})



app.listen(port, () => {
    console.log(`The server is Listening at 127.0.0.1:${port}`)
})
