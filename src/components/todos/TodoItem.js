import Card from "../../UI/Card";
import classes from './TodoItem.module.css';

import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateTodo } from "../../store/todo-actions";



const TodoItem = (props) => {

    //// todoId, token, updatedTodo
    const token = useSelector(state => state.user.token);
    const test = useSelector(state => state.todos.todos);
    console.log(test)

    const dispatch = useDispatch();

    const [isUpdateOn, setIsUpdateOn] = useState(false);

    const [isUpdateInputEmpty, setIsUpdateInputEmpty] = useState(false);

    const updateInputRef = useRef();

    const updateHandler = () => {
        setIsUpdateOn(true);
    };

    const cancelUpdate = () => {
        setIsUpdateOn(false)
        setIsUpdateInputEmpty(false)
    }

    const updateSubmiteHandler = (event) => {
        event.preventDefault()

        if (updateInputRef.current.value === '') {
            return setIsUpdateInputEmpty(true)
        }

        const updatedTodoData = {
            token,
            todoId: props.id,
            updatedTodo: updateInputRef.current.value
        }
        dispatch(updateTodo(updatedTodoData));
        setIsUpdateOn(false)

    }



    return (
        <Card >
            {!isUpdateOn &&
                <div>
                    <h1 className={classes.h1}>{props.todo}
                        <button onClick={updateHandler}>Edit Todo</button>
                        <button onClick={props.onRemoveTodo}>Delete Todo</button>
                    </h1>
                </div>}
            {isUpdateOn && (
                <form onSubmit={updateSubmiteHandler}>
                    <input type="text" placeholder={props.todo} ref={updateInputRef}></input>
                    <button>Edit</button>
                    <button onClick={cancelUpdate} type="button">Cancel</button>
                    {isUpdateInputEmpty && <p>You cannot add an empty todo!</p>}
                </form>

            )}
        </Card>
    )
};

export default TodoItem;

