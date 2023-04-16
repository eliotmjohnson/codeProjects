export const hasTodos = () => {
	return localStorage.getItem("todos");
};

export const getTodosFromLocalStorage = () => {
	if (!hasTodos()) {
		localStorage.setItem("todos", JSON.stringify([]));
	} else {
		return JSON.parse(localStorage.getItem("todos"));
	}
};

export const saveToLocalStorage = (todoToSave) => {
	if (!hasTodos()) {
		localStorage.setItem("todos", JSON.stringify([todoToSave]));
	} else {
		const currentTodos = getTodosFromLocalStorage();
		currentTodos.push(todoToSave);
		localStorage.setItem("todos", JSON.stringify(currentTodos));
	}
};

export const deleteTodoFromLocalStorage = (todo) => {
	let currentTodos = getTodosFromLocalStorage();

	if (currentTodos.includes(todo)) {
		currentTodos.splice(currentTodos.indexOf(todo), 1);
		localStorage.setItem("todos", JSON.stringify(currentTodos));
	}
};
