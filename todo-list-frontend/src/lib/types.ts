type TodoItem = {
    id: number;
    description: string;
    isDone: boolean;
}

type CreateTodoItemRequest = {
    description: string;
}

type RemoveTodoItemRequest = {
    todoItem: TodoItem;
}
