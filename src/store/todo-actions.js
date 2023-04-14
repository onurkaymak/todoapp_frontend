import { todoActions } from "./todo-slice";



import axios from 'axios';

export const fetchTodos = (info) => {
    return async (dispatch) => {

        const { token, userId } = info;

        // console.log(token)
        // console.log(userId)

        try {
            const response = await axios.get(`http://localhost:4000/api/todos/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const fetchedTodos = response.data.todos;

            // console.log(fetchedTodos)

            dispatch(todoActions.fetch(fetchedTodos));

        }
        catch (err) {
            console.log(err);
        }



        // const fetchRequest = async () => {
        //     const dbRef = ref(database);
        //     const response = await get(child(dbRef, 'todos'))
        //     const data = response.toJSON()

        //     return data;
        // }
        // const todoData = await fetchRequest()
        // dispatch(todoActions.fetch(todoData));
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

            dispatch(todoActions.add(responseTodo));

        }
        catch (err) {
            console.log(err);
        }
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




