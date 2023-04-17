import { todoActions } from "./todo-slice";

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

            dispatch(todoActions.fetch(fetchedTodos));
        }
        catch (err) {
            console.log(err);
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

            dispatch(todoActions.add(createdTodo));

        }
        catch (err) {
            console.log(err);
        }
    };
}


export const deleteTodo = (todoId, token) => {
    return async (dispatch) => {

        try {
            const response = await axios.delete(`http://localhost:4000/api/todos/${todoId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response)
            dispatch(todoActions.delete(todoId));
        }
        catch (err) {
            console.log(err);
        }
    }
}



export const updateTodo = () => {
    return async (dispatch) => {
        console.log('here')
    }
}
