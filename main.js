import "./style.css";
import "./node_modules/bulma/css/bulma.css"; // уточнить о правильности подключения

const input = document.querySelector("input");
const button = document.querySelector("button");
const localStorage = window.localStorage;
const deleteAllTasks = document.querySelector("#delete-all");

// empty array for the task
let todoList = JSON.parse(localStorage.getItem("items")) || [];
// function for displaying the task

function displayTask(task) {
  const todo = document.createElement("div");
  todo.innerHTML = `
  <div class="box mb">
    <div class="wrapper">
        <p id="el" contenteditable="false">${task}</p>
        <div class="button_block">
          <button id="btn-change" class="button is-info" ><?xml version="1.0" ?><svg height="24px" version="1.1" viewBox="0 0 18 18" width="15px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-213.000000, -129.000000)"><g id="create" transform="translate(213.000000, 129.000000)"><path d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z" id="Shape"/></g></g></g></svg></button>
          <button id="delete-task" class="button is-danger">X</button>
        </div>
    </div>
  </div>
`;

  // button for delete the task
  const deleteButton = todo.querySelector("#delete-task");
  deleteButton.addEventListener("click", () => {
    const taksIndex = todoList.indexOf(task);
    todoList.splice(taksIndex, 1);
    localStorage.setItem("items", JSON.stringify(todoList));
    todo.remove();
  });

  // button for change task
  const changeButton = todo.querySelector("#btn-change");
  changeButton.addEventListener('click', () => {
    console.log("можно редактировать");
    const changeElement = todo.querySelector("#el");
    changeElement.setAttribute('contenteditable', 'true');
  })


  document.querySelector("#app").append(todo);
  return todo;
}

button.onclick = () => {
  const value = input.value;
  todoList.push(value);
  displayTask(value);
  input.value = "";
  localStorage.setItem("items", JSON.stringify(todoList));
};

todoList.forEach((task) => displayTask(task));

// button delete all tasks
deleteAllTasks.addEventListener("click", () => {
  localStorage.removeItem("items");
  document.querySelector("#app").innerHTML = "";
});



