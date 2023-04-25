import classes from './NewTodo.module.scss';
import Card from '../../UI/Card';

import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createTodo } from '../../store/todo-actions';

import Todos from './Todos';

import { FlagIcon } from '../../img/icons/FlagIcon';

import { uiActions } from "../../store/ui-slice";







const NewTodo = () => {
    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();
    const inputRef = useRef();
    const importantRef = useRef();



    const [isFlagOn, setIsFlagOn] = useState(false);

    const flagHandler = () => {
        setIsFlagOn(prevState => !isFlagOn)
    }

    const todoSubmitHandler = async (event) => {
        event.preventDefault();

        if (inputRef.current.value === '') {
            dispatch(uiActions.showNotification({ title: 'Creating todo is failed', message: 'You cannot add an empty todo', status: 'error' }))
            return
        }

        const userInput = {
            todo: inputRef.current.value,
            important: importantRef.current.checked,
            token
        }

        dispatch(createTodo(userInput));
        inputRef.current.value = '';
        importantRef.current.checked = false;
        setIsFlagOn(false)
    };




    return (
        <div className={classes.newTodo__container}>
            <Card>
                <form className={classes.form} onSubmit={todoSubmitHandler}>
                    <input name="new todo" id="new-todo" ref={inputRef} className={classes.form__input} maxLength={25}></input>
                    <div className={classes.form__icon__container}>
                        <input type="checkbox" name='important' id='important' ref={importantRef}
                            className={classes.form__important} onClick={flagHandler}></input>
                        <FlagIcon flagColor={isFlagOn} />
                        <button className={classes.form__button_submit}>Add</button>
                    </div>
                </form>
            </Card>
            <Todos />
        </div>
    )
};

export default NewTodo;


