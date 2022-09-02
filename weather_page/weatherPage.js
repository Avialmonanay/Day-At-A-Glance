var cityNameLS = []
var listEl = $("#history")
var fiveDayContainer = $("#fiveDay")




$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        

        if (!userInput) {
            return
        }

        //sets user input as current item and stores in local storage
        localStorage.setItem("currentCity", userInput)

        const cityNameStorage = JSON.parse(localStorage.getItem("cityNameLS"))

        
        if (!cityNameStorage) {
            cityNameLS.push(userInput)

            localStorage.setItem("cityNameLS", JSON.stringify(cityNameLS));
        
        }

        
        else {

            cityNameStorage.push(userInput)

            localStorage.setItem("cityNameLS", JSON.stringify(cityNameStorage));
        }
        currentWeather()
        logHistory()
        return
    }

})


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
            
                setCurrentWeather(data)
                fiveDayWeather()
            });


    }
}

function setCurrentWeather(data) {
    

    var currentDataUnix = data.dt
    var currentDay = moment.unix(currentDataUnix).format("MM/DD/YY")

console.log(data)
    $("#currentSelection").text(data.name + " " + currentDay)
    $("#skyCon").text(data.weather[0].description)
    $("#currentTemp").text(data.main.temp + "f")
    $("#currentWind").text(data.wind.speed + " mph")
    $("#currentHumidity").text(data.main.humidity + "%")
    var weathericon = data.weather[0].icon
    $(".icon").html("<img src=" + weathericon + ">")
}

function logHistory() {
    //clears list to be prepared for newly created list
    $('#history').empty();

    const cityHistory = JSON.parse(localStorage.getItem("cityNameLS"));

    //if no citys exists in local storage STOP
    if (!cityHistory) {
        return
    }

    //if citys do exist creates the items to be displayed.

    else {

        for (var i = 0; i < cityHistory.length; i++) {
            var nameDisplay = cityHistory;



            var listItem = document.createElement("li")
            listItem.setAttribute("class", "historycard")

            var initial = document.createElement("h2")

            initial.innerText = nameDisplay[i]


            listEl.append(listItem)
            listItem.append(initial)

        }

    }
}


//watches for clicks on the history items. If one is selected it overides the "currentCity" local storage and calls to the currentWeather function updating the currently displayed weather to your history item.
$("#history").click(function (event) {
    historyEL = event.target
    if (historyEL.matches("h2")) {
        var historyChoice = historyEL.innerText
        localStorage.setItem("currentCity", historyChoice)
        currentWeather()
    }
}
)

//pulls the 5 day forcast
function fiveDayWeather() {
    const currentCityLS = localStorage.getItem("currentCity")
    if (currentCityLS) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + currentCityLS + "&units=imperial&appid=c64d9c95aa9e442bc0444f33c92c8506", {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setFiveDayWeather(data)
            })
    }
}


//pulls 1 data set for each day and creates a card to display the data.
function setFiveDayWeather(data) {
    fiveDayContainer.empty()


    for (let i = 3; i < data.list.length; i += 8) {
        var fiveDayDate = data.list[i].dt


        var monthday = moment.unix(fiveDayDate).format("MM/DD")


        var card = document.createElement("div")
        card.setAttribute("class", "col-2 fiveDayCard")

        var fiveDayCardDate = document.createElement("h2")
        fiveDayCardDate.innerText = monthday

        var skyCondition = document.createElement("p")
        skyCondition.innerText = (data.list[i].weather[0].description)

        var fiveDayHigh = document.createElement("p")
        fiveDayHigh.innerText = ("High: " + data.list[i].main.temp_max + "f")

        var fiveDayLow = document.createElement("p")
        fiveDayLow.innerText = ("Low: " + data.list[i].main.temp_min + " f")

        var fiveDayHumidity = document.createElement("p")
        fiveDayHumidity.innerText = ("Humidity: " + data.list[i].main.humidity)



        fiveDayContainer.append(card)
        card.append(fiveDayCardDate)
        card.append(skyCondition)
        card.append(fiveDayHigh)
        card.append(fiveDayLow)
        card.append(fiveDayHumidity)








    }
}

fiveDayWeather()
currentWeather()
logHistory()