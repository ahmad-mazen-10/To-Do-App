let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks_div = document.querySelector(".tasks");
let delAllBtn = document.querySelector("button")

let arrTasks = [];

if (localStorage.getItem("tasks")) {
    arrTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDatalclstg();

//add task
submit.onclick = () => {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";                    //empty input value
    }
};


function deleteAll() {
    if (arrTasks.length > 0) {
        delAllBtn.style.display = 'block';
    } else {
        delAllBtn.style.display = 'none';
    }
}


tasks_div.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        dltTaskBID(e.target.parentElement.getAttribute("data-id"))     //remove from local storage       
        e.target.parentElement.remove();                        //remove taske from page
        deleteAll() 
    }
    
    if (e.target.classList.contains("task")) {
        tglTask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
});


function addTaskToArray(taskText) {
    //task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrTasks.push(task);                       //push to array
    addTasksToPage(arrTasks);                     //add tasks to page
    addTskTolclStg(arrTasks);                      //add task to local storage
}

function addTasksToPage(arrTasks) {
    tasks_div.innerHTML = "";                     //create div tasks

    arrTasks.forEach((task) => {
        let divOneTask = document.createElement("div");
        divOneTask.className = "task";

        //check if task is done
        if (task.completed) {
            divOneTask.className = "task done";
        }
        divOneTask.setAttribute("data-id", task.id);
        divOneTask.appendChild(document.createTextNode(task.title));

        let span = document.createElement("span")                   //create delete button
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        divOneTask.appendChild(span)
        tasks_div.appendChild(divOneTask)                   //add div tasks to page
    });
}

function addTskTolclStg(arrTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function getDatalclstg() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPage(arrTasks);
    }
}

function dltTaskBID(taskId) {
    arrTasks = arrTasks.filter((task) => task.id != taskId);
    addTskTolclStg(arrTasks);

  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
}

function tglTask(taskId) {
      for (let i = 0; i < arrTasks.length; i++) {
    if (arrTasks[i].id == taskId) {
      arrTasks[i].completed == false ? (arrTasks[i].completed = true) : (arrTasks[i].completed = false);
    }
  }
  addTskTolclStg(arrTasks);

}

function deleteAll() {
    tasks_div.innerHTML = "";
    window.localStorage.removeItem("tasks");
}