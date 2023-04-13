import { createSlice } from '@reduxjs/toolkit';


// const initialState = { todos: [] }

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        isInputEmpty: null
    },
    reducers: {
        fetch(state, action) {
            const data = action.payload;
            for (const key in data) {
                state.todos.push({
                    key: data[key].id,
                    todo: data[key].todos,
                    color: data[key].color,
                    id: data[key].id
                });
            }
        },
        add(state, action) {
            state.todos.push(action.payload);
        },
        delete(state, action) {
            const deleteId = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== deleteId);
        },
        inputEmpty(state, action) {
            state.isInputEmpty = action.payload;
        }
    }
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;