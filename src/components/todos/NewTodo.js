import classes from './NewTodo.module.scss';
import Card from '../../UI/Card';

import { Fragment, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../../store/todo-slice';

import { createTodo } from '../../store/todo-actions';

import Todos from './Todos';

import { FlagIcon } from '../../img/icons/FlagIcon';


const NewTodo = () => {

    const isInputEmpty = useSelector(state => state.todos.isInputEmpty);

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
            dispatch(todoActions.inputEmpty(true))
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
        dispatch(todoActions.inputEmpty(false));
    };




    return (
        <Fragment>
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
            {isInputEmpty && <p className={classes.p}>You cannot add an empty todo!</p>}
            <Todos />
        </Fragment>
    )
};

export default NewTodo;



/* <div className={classes.div}>
    <input type="checkbox" name='important' id='important' ref={importantRef}></input>
    <label>Check as an important todo</label>
</div>
<button className='btn btn-primary'>Add New Todo!</button> */