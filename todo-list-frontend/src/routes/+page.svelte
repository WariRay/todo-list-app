<script lang="ts">
import { onMount } from "svelte";

let pingResponseMessage: string;
let pingResponseCount: number;

let todos: TodoItem[] = [];
let newTodoDescription = "";

async function getTodos() {
	const response = await fetch("http://localhost:3000/todo-item");
	const responseJson = await response.json();
	console.log(todos);
	todos = responseJson;
}

async function addTodoButtonclick() {
	const createTodoItemRequest: CreateTodoItemRequest = {
		description: newTodoDescription,
	};
	const createTodoItemRequestJson = JSON.stringify(createTodoItemRequest);

	const response = await fetch("http://localhost:3000/todo-item", {
		method: "POST", // This is a POST request, not the default GET
		headers: {
			"Content-Type": "application/json", // We are sending JSON
			mode: "no-cors", // no-cors, *cors, same-origin
		},
		body: createTodoItemRequestJson, // The JSON we are sending
	});

	console.log(response);

	// Once the new todo is added, re-ask server for to-do items (NOTE: This is flawed in a number of ways. Why?)
	getTodos();
}

// This runs when the page is loaded into the browser
onMount(() => {
	getTodos();
});

// Close todo item
async function removeTodoButtonClick(todoItem: TodoItem) {
	const removeTodoItemRequest: RemoveTodoItemRequest = {
		todoItem: todoItem,
	};
	const removeTodoItemRequestJson = JSON.stringify(removeTodoItemRequest);
	// API call
	const response = await fetch("http://localhost:3000/remove-todo-item", {
		method: "DELETE", 
		headers: {
			"Content-Type": "application/json",
			mode: "no-cors",
		},
		body: removeTodoItemRequestJson,
	});
	console.log("FRONT END REMOVE");
	console.log(response);
	console.log(todos);
	getTodos();
	console.log("FRONT END REMOVE DONE");

}

</script>

<h1>My To-do List App</h1>

<label for="new-todo-description">Description</label>
<input name="new-todo-description" bind:value={newTodoDescription}/>
<button on:click={addTodoButtonclick}>Add new todo</button>

<!-- {#each todos as todo}
	<div class="todo-item">[{todo.isDone ? "X" : " "}] {todo.description}</div>
{/each} -->
<div class="todo-list-container"> 
	<span class="todo-list-title">My Todos:</span>
	{#each todos as todo}
		<div class="todo-item">
			<input type="checkbox" bind:checked={todo.isDone}/>
			<span class="todo-description">{todo.description}</span>
			<button class="remove" on:click={() => removeTodoButtonClick(todo)}>x</button>	
		</div>
	{/each}
</div> 

<style>
	.todo-list-container {
		background-color: rgb(169, 197, 250);
		font-family: 'Courier New', Courier, monospace;
		width: 400px;
		margin: 10px;
		padding: 30px;
	}

	.todo-list-title {
		font-size: 18px;
		font-weight: bold;
	}

	.todo-item {
		display: flex;
		align-items: center;
		margin: 5px 0;
		padding: 5px;
	}

	.todo-item

	.todo-item input {
		cursor: pointer;
		margin: 0;
	}

	.todo-description {
		flex-grow: 1;
		margin-left: 10px;
		font-size: 16px;
	}

	.remove {
		margin-left: auto;
		cursor: pointer;
	}
</style>