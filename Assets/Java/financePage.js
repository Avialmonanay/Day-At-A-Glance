$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        
        localStorage.setItem("financeStorage", JSON.stringify(userInput))
    }
}
)