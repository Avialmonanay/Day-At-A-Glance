var openText = $("#mOpen")
var highText = $("#mHigh")
var lowText = $("#mLow")
var closeText = $("#mClose")
var symbolText = $("#symbol")
var arrowText = $("#position")

var staticStockCall = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ADBE&apikey=JW7LW6L0OT6FJ9OF"



function getBitcoin() {
  
  const financeStorage = JSON.parse(localStorage.getItem("financeStorage"))

    if(financeStorage){
      console.log(financeStorage)
      fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+financeStorage+"&apikey=JW7LW6L0OT6FJ9OF",{
        
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
        console.log(data);
        updateCard(data)

      })
    }


    else{
    fetch(staticStockCall,{
        
        method: "GET",
        headers:{
        'Content-Type': 'application/json'
        }
    })
    
      .then(function (response) {
        // console.log(response);
        return response.json()

      })
      .then(function (data) {
        // console.log(data);
        updateCard(data)

      })
    }
  }
    function updateCard(data){
      console.log(data)
      var symbolData = data["Meta Data"]
      var symbolVal = Object.values(symbolData)
      // symbolText.html(symbolVal[1])


      var timeSeriesData = data["Time Series (Daily)"]
      var lastObjInTSD = Object.keys(timeSeriesData)[0];
      var grabOBJ = Object.values(timeSeriesData[lastObjInTSD])
      console.log(grabOBJ);
      var marketOpen = grabOBJ[0]
      var marketHigh = grabOBJ[1]
      var marketLow = grabOBJ[2]
      var marketClose = grabOBJ[3]

      openText.html(marketOpen)
      highText.html(marketHigh) 
      lowText.html(marketLow) 
      closeText.html(marketClose)


      if (marketOpen < marketClose){
        symbolText.html(symbolVal[1]+"⬆️")
      }

      else {
        symbolText.html(symbolVal[1]+"⬇️")
      }


    }



getBitcoin()