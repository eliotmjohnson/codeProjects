const listContainer = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const submitButton = document.querySelector(".submit-button");

//// Stuff we gotta do /////
// 1. type something
// -- get value
//     --- evt.target = input.value
// 2. click submit
// -- prevent browser defaults
//     --- evt.preventDefault()
// -- capture the input
//     --- assign input.value to const
// 3. list item will show up
// -- take text and assign it to the new todo item
// -- we need to create and add the buttons
// -- attach everything to the list
// -- send the data to local storage
// 4. Clear the input

const getInput = (e) => {
	const inputValue = e.target[0].value;

	return inputValue;
};

const validateInput = (inputText) => {
	if (inputText === "") {
		return false;
	} else return true;
};

const checkTodo = (e) => {
  console.log('checked')
}

const deleteTodo = (id) => {
    const elements = Array.from(listContainer.children)
    const todoToDelete = elements.find(todo => todo.id === id)
    todoToDelete.remove()
}

const createTodoElement = (input) => {
	const listItem = document.createElement("li");
	listItem.classList.add("todo-item");
    listItem.id = Date.now()

	const itemText = document.createElement("p");
	itemText.textContent = input;

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("button-container");

	const checkButton = document.createElement("button");
	checkButton.classList.add("check");
	checkButton.textContent = "✓";
	checkButton.addEventListener("click", checkTodo);

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete");
	deleteButton.textContent = "X";
	deleteButton.addEventListener("click", () => {
        deleteTodo(listItem.id)
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
		} else {
			throw new Error("You must enter text before submitting!");
		}
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
};

todoForm.addEventListener("submit", submitTodo);
