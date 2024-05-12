//selecionar os elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

//guardar o antigo valor quando for editar o valor de um input
let oldInputValue;

//funções
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
  
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
  
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
  
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
  
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

//eventos todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputValue = todoInput.value;
  
    if (inputValue) {
      saveTodo(inputValue);
    }
  });
  
  document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
  
    if (parentEl && parentEl.querySelector("h3")) {
      todoTitle = parentEl.querySelector("h3").innerText || "";
    }
  
    if (targetEl.classList.contains("finish-todo")) {
      parentEl.classList.toggle("done");
  
      updateTodoStatusLocalStorage(todoTitle);
    }
  
    if (targetEl.classList.contains("remove-todo")) {
      parentEl.remove();
  
      // Utilizando dados da localStorage
      removeTodoLocalStorage(todoTitle);
    }
  
    if (targetEl.classList.contains("edit-todo")) {
      toggleForms();
  
      editInput.value = todoTitle;
      oldInputValue = todoTitle;
    }
  });
  
  cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
  });
  
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const editInputValue = editInput.value;
  
    if (editInputValue) {
      updateTodo(editInputValue);
    }
  
    toggleForms();
  });
  
  searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
  });
  
  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    searchInput.value = "";
  
    searchInput.dispatchEvent(new Event("keyup"));
  });
  
  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
  
    filterTodos(filterValue);
  });
