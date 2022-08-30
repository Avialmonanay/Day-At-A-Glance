
function openReddit (){
    if(redditLocalStorage){
        var changeReddit= ('https://www.reddit.com/r/'+redditLocalStorage+'.json')
        fetch (changeReddit)
            .then(result => result.json())
            .then((output) => {
            updateredditcard(output)
    })}
    else{
        fetch('https://www.reddit.com/r/upliftingnews.json')
            .then(result => result.json())
            .then((output) => {
                console.log(output)
            // updateredditcard(output)
    })
}}


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