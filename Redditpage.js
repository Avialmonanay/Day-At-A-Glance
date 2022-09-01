
$(".newreddit").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        localStorage.setItem("redditStorage", JSON.stringify(userInput))
    }
})



function openReddit (){
   
    var redditLocalStorage= JSON.parse(localStorage.getItem('redditStorage'))
    console.log (redditLocalStorage)
    if (redditLocalStorage) {
     
        var changeReddit= ('https://www.reddit.com/r/'+redditLocalStorage+'.json')
        fetch (changeReddit)
            .then(result => result.json())
            .then((output) => {
            updateredditcard(output)
            consolelog (output)
    })}
    else{
        fetch('https://www.reddit.com/r/upliftingnews.json')
            .then(result => result.json())
            .then((output) => {
                console.log(output)
            updateredditcard(output)
    })
}}
openReddit()


function updateredditcard (output){
    console.log (output)
     var url =(output.data.children[0].data.url);
        var title = (output.data.children[0].data.title);
        var redditTitle = document.getElementById("Title");
        redditTitle.innerHTML = (title)
        redditTitle.href = (url)
}
// function redditdisplay(output){
//    var newElement = document.createElement("p");
//    newElement.innerHTML= (output.data.children[0].data.title)
//    document.getElementById("reddit api").appendChild(newElement)}    