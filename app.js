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
  taskItem.appendChild(complete_btn);
  taskItem.appendChild(edit_btn);
  taskItem.appendChild(del_btn);

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

