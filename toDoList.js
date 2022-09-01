
document.addEventListener("DOMContentLoaded", function () {
    // initialize current tasks list if not already in localstorage
    dodo = localStorage.getItem('current_tasks')
    console.log(dodo)
    var parsedtasks = JSON.parse(dodo)
    if (!Array.isArray(parsedtasks)) {
        localStorage.setItem('current_tasks', '[]')
    }
    console.log(parsedtasks);
    // for every item in localstorage add it back to our tasks list on pageload
    for (var i = 0; i < parsedtasks.length; i++) {
        document.querySelector('#tasks').innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${parsedtasks[i]}
              </span>
              <input class="checkbox" type="checkbox"></input>
          </div>
      `;
    }
    // Make sure that our new tasks can be deleted 
    var current_tasks = document.querySelectorAll(".checkbox");
    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            this.parentNode.remove();
            var stillalive = document.querySelectorAll("#taskname");

            var taskstokeep = []
            for (var j = 0; j < stillalive.length; j++) {
                console.log(stillalive[j].textContent.trim())
                taskstokeep.push(stillalive[j].textContent.trim())
            }
            // Serialzied the new array that contains (stillalive)
            var serializedtasks = JSON.stringify(taskstokeep)
            // Add (persist) serializedtasks under local storage under the key localstorage 
            localStorage.setItem('current_tasks', serializedtasks)
            console.log(serializedtasks);
        }
    }
});

document.querySelector('#push').onclick = function () {
    newtask = document.querySelector('#newtask input')
    trimmedNewtask = newtask.value.trim()
    console.log(trimmedNewtask);
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    
    if (trimmedNewtask.length == 0) {
        console.log("modalopens")
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            console.log('x closes the modal')
        }
    }
    else {
        document.querySelector('#tasks').innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${trimmedNewtask}
              </span>
              <input class="checkbox" type="checkbox"</input>
          </div>
      `;

        // Retrieve serialized items (JSON) from localstorage
        dodo = localStorage.getItem('current_tasks');
        // Parsed (deserialized) JSON which turns it from a string into an array 
        var parsedtasks = JSON.parse(dodo)
        //Adds new items to an end of an array 
        parsedtasks.push(trimmedNewtask)
        // Serialzied the new array that contains (trimmedNewtask)
        var serializedtasks = JSON.stringify(parsedtasks)
        // Add (persist) serializedtasks under local storage under the key localstorage 
        localStorage.setItem('current_tasks', serializedtasks)
        // Give tasks ability to be removed 
        var current_tasks = document.querySelectorAll(".checkbox");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();
                var stillalive = document.querySelectorAll("#taskname");

                var taskstokeep = []
                for (var j = 0; j < stillalive.length; j++) {
                    console.log(stillalive[j].textContent.trim())
                    taskstokeep.push(stillalive[j].textContent.trim())
                }
                // Serialzied the new array that contains (stillalive)
                var serializedtasks = JSON.stringify(taskstokeep)
                // Add (persist) serializedtasks under local storage under the key localstorage 
                localStorage.setItem('current_tasks', serializedtasks)
                console.log(serializedtasks);
            }
        } 
    }


}

