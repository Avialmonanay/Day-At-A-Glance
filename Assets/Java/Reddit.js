function openReddit (){}
var subreddit= "UpliftingNews"
// document.write(subreddit.value);

fetch('https://www.reddit.com/r/'+subreddit+'.json')
    .then(result => result.json())
    .then((output) => {
        var url =(output.data.children[0].data.url);
        var target = document.getElementById("URL");
        target.innerHTML = (url)    

        var title = (output.data.children[0].data.title);
        var redditTitle = document.getElementById("Title");
        redditTitle.innerHTML = (title)    
    
}).catch(err => console.error(err));
console.log (document.getElementById('subreddit').value)

// function redditdisplay(output){
//    var newElement = document.createElement("p");
//    newElement.innerHTML= (output.data.children[0].data.title)
//    document.getElementById("reddit api").appendChild(newElement)}   
