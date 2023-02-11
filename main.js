const addForm = document.querySelector(".add");
const selectTodoList = document.querySelector(".todo-list");
const search = document.querySelector(".search input");

addForm.addEventListener("submit", e => {
    e.preventDefault();
    const addTodo = addForm.add.value.trim();
    if (addTodo.length) {
        addTodoList(addTodo);
        addForm.reset();
    }
})

const addTodoList = (addTodo) => {
    const html = ` <li class="list-group-item"> <span> ${addTodo} </span> <i class="fa-regular fa-trash-can delete"></i>
                    </li> `;
    selectTodoList.innerHTML += html;
}

selectTodoList.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
    }
})

search.addEventListener("keyup", e => {
    const searchInput = search.value.trim().toLowerCase();
    filterTodos(searchInput);
})

const filterTodos = searchInput => {

    Array.from(selectTodoList.children).filter(todoItem => !todoItem.textContent.toLowerCase().includes(searchInput))
        .forEach(todoItem => todoItem.classList.add("todo-filtered"))

    Array.from(selectTodoList.children).filter(todoItem => todoItem.textContent.toLowerCase().includes(searchInput))
        .forEach(todoItem => todoItem.classList.remove("todo-filtered"))
}