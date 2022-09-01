var cityNameLS = []


function currentWeather() {
    const currentCityLS = localStorage.getItem("currentCity")

    if (currentCityLS) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityLS + "&units=imperial&appid=c64d9c95aa9e442bc0444f33c92c8506", {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                setCurrentWeather(data)

            });


    }

    else {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Salt Lake city&units=imperial&appid=c64d9c95aa9e442bc0444f33c92c8506", {})

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                setCurrentWeather(data)

            });

    }
}

function setCurrentWeather(data) {
    var currentHour = moment().format("h:mm")
    $("#currentTime").text(currentHour)
    $("#currentSelection").text(data.name)
    $("#currentTemp").text(data.main.temp + "f")
    $("#currentWind").text(data.wind.speed + " mph")
    $("#currentHumidity").text(data.main.humidity + "%")
}



currentWeather()







