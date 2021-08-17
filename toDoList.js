"use strict";

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

function addTodo(e) {
  e.preventDefault();

  const newTodoDiv = document.createElement("div");
  newTodoDiv.classList.add("todo");

  const todoTitle = document.createElement("li");
  todoTitle.innerText = todoInput.value.trim();
  if (todoTitle.innerText === "") return;
  todoTitle.classList.add("todo-item");
  newTodoDiv.appendChild(todoTitle);

  saveTodos(todoInput.value);
  todoInput.value = "";

  const checkedBtn = document.createElement("button");
  checkedBtn.innerHTML = "<i class='far fa-check-square'></i>";
  checkedBtn.classList.add("checked-btn");
  newTodoDiv.appendChild(checkedBtn);

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
  delBtn.classList.add("del-btn");
  newTodoDiv.appendChild(delBtn);

  todoList.appendChild(newTodoDiv);
}

function deleteCheckedTodo(e) {
  const element = e.target;
  if (element.classList[0] === "del-btn") {
    const todo = element.parentElement;
    todo.classList.add("fadeAway");
    todo.style.pointerEvents = "none";
    clearTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  } else if (element.classList[0] === "checked-btn") {
    const todo = element.parentElement;
    todo.classList.toggle("done");
    todo.style.pointerEvents = "none";
    clearTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
}

function handleLocalStorage() {
  let localTodos;
  if (localStorage.getItem("localTodos") === null) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem("localTodos"));
  }
  return localTodos;
}

function saveTodos(todo) {
  let localTodos = handleLocalStorage();
  localTodos.push(todo);
  localStorage.setItem("localTodos", JSON.stringify(localTodos));
}

function getTodos(todo) {
  let localTodos = handleLocalStorage();
  localTodos.forEach(function(todo) {
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo");

    const todoTitle = document.createElement("li");
    todoTitle.innerText = todo;
    todoTitle.classList.add("todo-item");
    newTodoDiv.appendChild(todoTitle);

    const checkedBtn = document.createElement("button");
    checkedBtn.innerHTML = "<i class='far fa-check-square'></i>";
    checkedBtn.classList.add("checked-btn");
    newTodoDiv.appendChild(checkedBtn);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "<i class='far fa-trash-alt'></i>";
    delBtn.classList.add("del-btn");
    newTodoDiv.appendChild(delBtn);

    todoList.appendChild(newTodoDiv);
  });
}

function clearTodos(todo) {
  let localTodos = handleLocalStorage();
  const todoIndex = todo.children[0].innerText;
  localTodos.splice(localTodos.indexOf(todoIndex), 1);
  localStorage.setItem("localTodos", JSON.stringify(localTodos));
}

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteCheckedTodo);
document.addEventListener("DOMContentLoaded", getTodos);