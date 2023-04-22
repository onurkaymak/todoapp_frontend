import { todoActions } from "./todo-slice";

import { uiActions } from "./ui-slice";

import axios from 'axios';




export const fetchTodos = (info) => {
    return async (dispatch) => {

        const { token, userId } = info;

        try {
            const response = await axios.get(`http://localhost:4000/api/todos/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const fetchedTodos = response.data.todos;

            await dispatch(todoActions.fetch(fetchedTodos));
        }
        catch (err) {
            dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
        }
    }
}


export const createTodo = (userInput) => {
    return async (dispatch) => {

        const { todo, important, token } = userInput;

        try {
            const response = await axios.post('http://localhost:4000/api/todos',
                {
                    "todo": todo,
                    "important": important
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const responseTodo = response.data.todo;


            const createdTodo = {
                key: responseTodo._id,
                todo: responseTodo.todo,
                important: responseTodo.important,
                creator: responseTodo.creator,
                id: responseTodo._id
            }

            await dispatch(todoActions.add(createdTodo));

        }
        catch (err) {
            dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
        }
    };
}


export const deleteTodo = (todoId, token) => {
    return async (dispatch) => {

        try {
            await axios.delete(`http://localhost:4000/api/todos/${todoId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            await dispatch(todoActions.delete(todoId));
        }
        catch (err) {
            dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
        }
    }
}



export const updateTodo = (updatedTodoData) => {
    return async (dispatch) => {

        const { todoId, updatedTodo, token } = updatedTodoData;

        try {
            await axios.patch(`http://localhost:4000/api/todos/${todoId}`,
                {
                    todoId,
                    updatedTodo
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            await dispatch(todoActions.update({ todoId, updatedTodo }));
        }
        catch (err) {
            dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
        }
    }
}
