const addForm = document.querySelector(".add");
const todoList = document.querySelector(".todo-list");
const search = document.querySelector(".search input");
const addTodoContainer = document.querySelector(".add-todo-container")
const todoListContainer = document.querySelector(".todo-list-container")
const alertContainer = document.querySelector(".showAlert")
const clearButton = document.querySelector(".clear")
const deleteTextContent = document.querySelector(".delete")
let todos = [];

// 
document.addEventListener("DOMContentLoaded", pageLoaded);
function pageLoaded() {
    checkTodosInStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

// Adding todos
addForm.addEventListener("submit", e => {
    const addTodo = addForm.add.value.trim();
    e.preventDefault();
    if (addTodo.length) {
        addTodoToUI(addTodo);
        addTodoToStorage(addTodo);
        addForm.add.value = "";
        showAlert("success", "Todo Eklendi.");
    }
    else {
        showAlert("warning", "Lütfen en az bir harf giriniz!");
    }
})

const addTodoToUI = (addTodo) => {
    const html = `<li class="list-group-item">${addTodo}<i class="fa-regular fa-trash-can delete"></i>
                    </li> `;
    todoList.innerHTML += html;
}

const addTodoToStorage = (addTodo) => {
    checkTodosInStorage();
    todos.push(addTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Removing todos
clearButton.addEventListener("click", e => {
    const todoListItems = document.querySelectorAll(".list-group-item")
    if (todoListItems.length) {
        todoListItems.forEach(todoItem => {
            todoItem.remove();
        });
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Liste başarıyla temizlendi")
    } else {
        showAlert("warning", "Silinecek todo bulunamadı!")
    }
})

todoList.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        removeTodoFromUI(e);
        const todo = e.target.parentElement;
        removeTodoFromStorage(todo.textContent.trim());
    }
})

const removeTodoFromUI = (e) => {
    e.target.parentElement.remove();
    showAlert("success", "Todo başarıyla silindi.");
}

const removeTodoFromStorage = (removeTodo) => {
    checkTodosInStorage();
    todos.forEach((todo, index) => {
        console.log(todo)
        console.log(removeTodo)
        if (removeTodo === todo) {
            todos.splice(index, 1);
            console.log("giriyoum")
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Checking todos in storage
const checkTodosInStorage = () => {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

// Search in the list
search.addEventListener("keyup", e => {
    const searchInput = search.value.trim().toLowerCase();
    filterTodos(searchInput);
})

const filterTodos = searchInput => {

    Array.from(todoList.children).filter(todoItem => !todoItem.textContent.toLowerCase().includes(searchInput))
        .forEach(todoItem => todoItem.classList.add("todo-filtered"))

    Array.from(todoList.children).filter(todoItem => todoItem.textContent.toLowerCase().includes(searchInput))
        .forEach(todoItem => todoItem.classList.remove("todo-filtered"))
}

// Alert message
const showAlert = (type, message) => {
    let alert = `<div class="alert alert-${type}" role="alert" style="max-height:44px; align-items: center;
    display: flex;">
    ${message} </div>`;
    alertContainer.innerHTML += alert;
}

