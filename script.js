import {
	saveToLocalStorage,
	deleteTodoFromLocalStorage,
	getTodosFromLocalStorage,
} from "./localStorage.js";

const listContainer = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");

const initLoad = () => {
	const storedTodos = getTodosFromLocalStorage();
	storedTodos.forEach((todo) => createTodoElement(todo));
};

const getInput = (e) => {
	const inputValue = e.target[0].value;

	return inputValue;
};

const validateInput = (inputText) => {
	if (inputText === "") {
		return false;
	} else return true;
};

const checkTodo = (todoItem) => {
	todoItem.classList.toggle("checked");
};

const deleteTodo = (id) => {
	const elements = Array.from(listContainer.children);
	const todoToDelete = elements.find((todo) => todo.id === id);
	todoToDelete.remove();
	deleteTodoFromLocalStorage(todoToDelete.children[0].textContent);
};

const createTodoElement = (input) => {
	const listItem = document.createElement("li");
	listItem.classList.add("todo-item");
	listItem.id = Date.now();

	const itemText = document.createElement("p");
	itemText.textContent = input;

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("button-container");

	const checkButton = document.createElement("button");
	checkButton.classList.add("check");
	checkButton.textContent = "✓";
	checkButton.addEventListener("click", () => {
		checkTodo(listItem);
	});

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete");
	deleteButton.textContent = "X";
	deleteButton.addEventListener("click", () => {
		deleteTodo(listItem.id);
	});

	buttonContainer.append(checkButton, deleteButton);
	listItem.append(itemText, buttonContainer);
	listContainer.appendChild(listItem);

	todoInput.value = "";
};

const submitTodo = (e) => {
	e.preventDefault();

	const input = getInput(e);
	const isValid = validateInput(input);

	try {
		if (isValid) {
			createTodoElement(input);
			saveToLocalStorage(input);
		} else {
			throw new Error("You must enter text before submitting!");
		}
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
};

todoForm.addEventListener("submit", submitTodo);
initLoad();
