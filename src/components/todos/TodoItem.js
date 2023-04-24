import Card from "../../UI/Card";
import classes from './TodoItem.module.scss';

import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateTodo } from "../../store/todo-actions";

import { EditIcon } from "../../img/icons/EditIcon";

import { DeleteIcon } from "../../img/icons/DeleteIcon";

import { FlagIcon } from "../../img/icons/FlagIcon";

import { CheckBoxU } from "../../img/icons/CheckBoxU";

import { uiActions } from "../../store/ui-slice";



const TodoItem = (props) => {

    //// todoId, token, updatedTodo
    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const [isUpdateOn, setIsUpdateOn] = useState(false);

    const [isUpdateInputEmpty, setIsUpdateInputEmpty] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

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
            dispatch(uiActions.showNotification({ title: 'Creating todo is failed', message: 'You cannot add an empty todo', status: 'error' }))
            return
        }

        const updatedTodoData = {
            token,
            todoId: props.id,
            updatedTodo: updateInputRef.current.value
        }
        dispatch(updateTodo(updatedTodoData));
        setIsUpdateOn(false)

    }


    const checkboxHandler = () => {
        setIsChecked(prevState => !isChecked);
    }


    let todoContent;
    if (isChecked) {
        todoContent = `${classes.isUpdateOff__todo_checked}`
    }
    else {
        todoContent = `${classes.isUpdateOff__todo}`
    }

    return (
        <Card>
            {!isUpdateOn && (
                <div className={classes.isUpdateOff__container}>
                    <CheckBoxU onCheck={checkboxHandler} isChecked={isChecked} />
                    {props.important && <FlagIcon isNotButton={true} />}
                    {!props.important && <FlagIcon isNotButtonInvis={true} />}
                    <h1 className={todoContent}>{props.todo}</h1>
                    <EditIcon updateHandler={updateHandler} className={classes.isUpdateOff__button_edit} />
                    <DeleteIcon deleteHandler={props.onRemoveTodo} className={classes.isUpdateOff__button_delete} />
                </div>
            )}
            {isUpdateOn && (
                <form onSubmit={updateSubmiteHandler} className={classes.isUpdateOn__container}>
                    <input type="text" placeholder={props.todo} ref={updateInputRef} className={classes.isUpdateOn__input}></input>
                    <button className={classes.isUpdateOn__button_edit}>Okay</button>
                    <button onClick={cancelUpdate} type="button" className={classes.isUpdateOn__button_cancel}>Cancel</button>
                    {isUpdateInputEmpty && <p>You cannot add an empty todo!</p>}
                </form>
            )}
        </Card>
    )
};

export default TodoItem;
