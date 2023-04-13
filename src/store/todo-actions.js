import { todoActions } from "./todo-slice";

import { useSelector } from 'react-redux';

import axios from 'axios';

// export const fetchData = () => {
//     return async (dispatch) => {
//         const fetchRequest = async () => {
//             const dbRef = ref(database);
//             const response = await get(child(dbRef, 'todos'))
//             const data = response.toJSON()

//             return data;
//         }
//         const todoData = await fetchRequest()
//         dispatch(todoActions.fetch(todoData));
//     }
// }


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

            dispatch(todoActions.add(responseTodo));

        }
        catch (err) {
            console.log(err);
        }


        // const sendRequest = async () => {
        //     await set(ref(database, 'todos/' + userInput.id), {
        //         todos: userInput.todo,
        //         color: userInput.color,
        //         id: userInput.id
        //     })
        // };

        // await sendRequest()
        // dispatch(todoActions.add(userInput));
    };
}

// export const deleteData = (id) => {
//     return async (dispatch) => {

//         const deleteRequest = async () => {
//             await remove(ref(database, 'todos/' + id))
//         }
//         await deleteRequest()
//         dispatch(todoActions.delete(id));
//     }
// }




