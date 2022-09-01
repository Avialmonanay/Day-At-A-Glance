// city name array
var cityNameLS = []




function currentWeather() {
    const currentCityLS = localStorage.getItem("currentCity")


    //if a city exits in local storage pull that city first
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

    //if a city does not exist display a default city
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


// updates weather card with data from API call
function setCurrentWeather(data) {
    var currentHour = moment().format("h:mm")
    $("#currentTime").text(currentHour)
    $("#currentSelection").text(data.name)
    $("#currentTemp").text(data.main.temp + "f")
    $("#currentWind").text(data.wind.speed + " mph")
    $("#currentHumidity").text(data.main.humidity + "%")
}



currentWeather()







