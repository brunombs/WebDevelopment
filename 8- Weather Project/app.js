const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityInput;
  const apiKey = "0df583d643067d8e1bd3b1996bc72be6";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    let rawData = "";
    response.on("data", function (chunk) {
      rawData += chunk;
    });

    response.on("end", function () {
      try {
        const weatherData = JSON.parse(rawData);
        console.log(weatherData);
        console.log(weatherData.main.temp);
        console.log(weatherData.weather[0].description);
        const icon = weatherData.weather[0].icon;
        const imageUrl =
          "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write(
          "<h1>The weather is currently " +
            weatherData.weather[0].description +
            "</h1>"
        );
        res.write("<img src=" + imageUrl + ">");
        if (weatherData.main && weatherData.main.temp) {
          res.write(
            "<h2>The temperature in " +
              query +
              " is " +
              weatherData.main.temp +
              " degrees Celsius.</h2>"
          );
        } else {
          res.write("<h2>Temperature data not available.</h2>");
        }
        res.end();
      } catch (error) {
        console.error(error);
        res.write("<h2>Error occurred while fetching weather data.</h2>");
        res.end();
      }
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
