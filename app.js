const newTask = document.getElementById("newTask");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTask.addEventListener("click", function (){ 
  let value = newTask.value;
  if(value.trim() === "") return;

  const span = document.createElement("span");
  span.textContent = value;
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

  complete_btn.addEventListener("click", function() {
    taskItem.classList.toggle("completed");
  });

  del_btn.addEventListener("click", function (){
    taskItem.remove();
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
      taskItem.replaceChild(span, input);
      edit_btn.textContent = "✎";
    }
  });
});



