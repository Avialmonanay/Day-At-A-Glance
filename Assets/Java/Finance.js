var stockCall = "https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=vXp2SjW4mdwtLBEqL4Mdg_IbyfrSpu2i"



function getBitcoin(requestUrl) {
    
    fetch(requestUrl,{
        
        method: "GET",
        // mode: "no-cors",
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
      })
    }

getBitcoin(stockCall)