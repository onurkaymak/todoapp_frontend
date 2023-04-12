// import { ref, set, get, child, remove } from "firebase/database";

// import database from "./firebase";

// import { todoActions } from "./todo-slice";

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

// export const sendData = (userInput) => {
//     return async (dispatch) => {
//         const sendRequest = async () => {
//             await set(ref(database, 'todos/' + userInput.id), {
//                 todos: userInput.todo,
//                 color: userInput.color,
//                 id: userInput.id
//             })
//         };

//         await sendRequest()
//         dispatch(todoActions.add(userInput));
//     };
// }

// export const deleteData = (id) => {
//     return async (dispatch) => {

//         const deleteRequest = async () => {
//             await remove(ref(database, 'todos/' + id))
//         }
//         await deleteRequest()
//         dispatch(todoActions.delete(id));
//     }
// }




