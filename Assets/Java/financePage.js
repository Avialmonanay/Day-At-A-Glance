var cardItems = $("#cards")
var financeLS = []
// watches for user input and stores it in local storage
$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        
        if (!userInput){
            return
        }

        localStorage.setItem("financeStorage", JSON.stringify(userInput))

        const financeSymbolLs = JSON.parse(localStorage.getItem(""))

        if (!financeSymbolLs){
            financeLS.push(userInput)
            localStorage.setItem("financeLS", JSON.stringify(financeLS))
        }

        else {
            financeSymbolLs.push(userInput)

            localStorage.setItem("financeLS", JSON.stringify(financeSymbolLs))
        }

        apiCall()
    }
}
)



function apiCall(){
    const FinanceItems = JSON.parse(localStorage.getItem("financeLS"))

    if(!FinanceItems)
    return

    else{
    for (let i=0; i<FinanceItems.length; i++){

        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+FinanceItems[i]+"&apikey=JW7LW6L0OT6FJ9OF",{
        
        method: "GET",
        headers:{
        'Content-Type': 'application/json'
        }
    })
    
      .then(function (response) {
        console.log(response);
        return response.json()

      })
      .then(function (data) {
        // console.log(data);
         createCard(data)

      })
    }

}
}



function createCard(data){
$("#cards").empty();
console.log(data)

var symbolData = data["Meta Data"]
var symbolVal = Object.values(symbolData)

var timeSeriesData = data["Time Series (Daily)"]
var lastObjInTSD = Object.keys(timeSeriesData)[0];
var grabOBJ = Object.values(timeSeriesData[lastObjInTSD])
console.log(grabOBJ);
var marketOpen = grabOBJ[0]
var marketHigh = grabOBJ[1]
var marketLow = grabOBJ[2]
var marketClose = grabOBJ[3]




        var card = document.createElement("div")
        card.setAttribute("class", "financeCard")

        var symbol = document.createElement("h2")
        symbol.innerText = symbolVal[1]

        var open = document.createElement("p")
        open.innerText = ("Open: " +marketOpen)

        var high = document.createElement("p")
        high.innerText = ("High: " + marketHigh)

        var low = document.createElement("p")
        low.innerText = ("Low: " + marketLow)

        var close = document.createElement("p")
        close.innerText = ("close: " + marketClose)


        cardItems.append(card)
        card.append(symbol)
        card.append(open)
        card.append(high)
        card.append(low)
        card.append(close)

}
apiCall()