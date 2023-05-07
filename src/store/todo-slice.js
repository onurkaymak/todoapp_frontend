import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        fetch(state, action) {
            const data = action.payload;
            data.map(todo => (
                state.todos.push({
                    key: todo.id,
                    todo: todo.todo,
                    important: todo.important,
                    creator: todo.creator,
                    id: todo.id
                })
            ))
        },
        add(state, action) {
            state.todos.push(action.payload);
        },
        delete(state, action) {
            const deleteId = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== deleteId);
        },
        update(state, action) {
            const todoId = action.payload.todoId;
            const updatedTodo = action.payload.updatedTodo;
            const foundedTodo = state.todos.find(todo => todo.id === todoId);
            foundedTodo.todo = updatedTodo;
        },
        resetTodos(state, action) {
            state.todos = []
        }
    }
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;