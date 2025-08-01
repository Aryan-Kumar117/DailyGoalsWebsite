let taskArray = [];
const newTask = document.getElementById("newTask");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function createTaskItem(txt, isComplete, isOnLoad){ 
  if(txt.trim() === "") return;

  if (!isOnLoad) {
    const taskObj = {
      text: txt,
      completed: false,
    };
    taskArray.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }

  const span = document.createElement("span");
  span.textContent = txt;
  span.classList.add("task-text");

  const complete_btn = document.createElement("button");
  const edit_btn = document.createElement("button");
  const del_btn = document.createElement("button");

  complete_btn.textContent = '✔';
  edit_btn.textContent = '✎';
  del_btn.textContent = '🗑';
  complete_btn.classList.add("complete-btn");
  edit_btn.classList.add("edit-btn");
  del_btn.classList.add("del-btn");

  const taskItem = document.createElement("li");
  taskItem.classList.add("taskItem");

  taskItem.appendChild(span);

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("task-buttons");

  btnWrapper.appendChild(complete_btn);
  btnWrapper.appendChild(edit_btn);
  btnWrapper.appendChild(del_btn);
  taskItem.appendChild(btnWrapper);

  taskList.appendChild(taskItem);

  if (isComplete) taskItem.classList.add("completed");

  complete_btn.addEventListener("click", function() {
    taskItem.classList.toggle("completed");
    const idx = Array.from(taskList.children).indexOf(taskItem);
    if (idx > -1) {
      taskArray[idx].completed = !taskArray[idx].completed;
      localStorage.setItem("tasks", JSON.stringify(taskArray));
    }
  });

  del_btn.addEventListener("click", function (){
    const idx = Array.from(taskList.children).indexOf(taskItem);
    if(idx > -1){
      taskArray.splice(idx, 1);
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      taskItem.remove();
    }
  });

  edit_btn.addEventListener("click", function(){
    if(edit_btn.textContent === "✎"){
      taskText = span.textContent;
      input = document.createElement("input");
      input.type = "text";
      input.value = taskText;
      taskItem.replaceChild(input, span);
      edit_btn.textContent = "💾";
    }
    else if(edit_btn.textContent === "💾"){
      span.textContent = input.value;
      if(input.value.trim = "") return;
      const idx = Array.from(taskList.children).indexOf(taskItem);
      if(idx > -1){
        taskArray[idx].text = input.value
        localStorage.setItem("tasks", JSON.stringify(taskArray));
      }

      taskItem.replaceChild(span, input);
      edit_btn.textContent = "✎";
    }
  });
}

addTask.addEventListener("click", function() {createTaskItem(newTask.value, false, false)});

window.addEventListener("load", function () {
  const storedTasks = this.localStorage.getItem("tasks");
  if(storedTasks){
    taskArray = JSON.parse(storedTasks);
    taskArray.forEach(taskObj => {
      createTaskItem(taskObj.text, taskObj.completed, true);
    });
  }
});

const compTaskBtn = document.getElementById("compTask");
compTaskBtn.addEventListener("click", function() {
  const listArray = Array.from(taskList.children);
  listArray.forEach(function(taskItem, index) {
    taskItem.classList.add("completed");
    taskArray[index].completed = true;
  });
  localStorage.setItem("tasks",JSON.stringify(taskArray));
});

const remCompTask = document.getElementById("remCompTask");
remCompTask.addEventListener("click", function (){
  const listArray = Array.from(taskList.children);
  listArray.forEach((taskItem) => {
    if(taskItem.classList.contains("completed")){
      taskItem.remove();
    }
  });
  taskArray = taskArray.filter((task) => !task.completed);

  localStorage.setItem("tasks", JSON.stringify(taskArray));
});

function setRandomBackground(){
  const accessKey = "nnNKV-vFDLGlNr2M3XeIt3DwcVkGrlbQAHh9SfvmjKk";
  fetch(`https://api.unsplash.com/photos/random?query=motivational&orientation=landscape&client_id=${accessKey}`)
    .then((response) => {
      if(!response.ok) throw new Error(`HHTP Error! Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const imageURL = data.urls.full;

      document.body.style.backgroundImage = `url(${imageURL})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.transition = "background-image 0.8s ease-in-out";
    })
    .catch((error) => {
      console.error("Failed to load background image:", error);
    })
}

window.addEventListener("load", setRandomBackground);
