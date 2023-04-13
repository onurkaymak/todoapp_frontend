import classes from './NewTodo.module.css';
import Card from '../../UI/Card';

import { Fragment, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../../store/todo-slice';

import { createTodo } from '../../store/todo-actions';

import Todos from './Todos';


const NewTodo = () => {

    const isInputEmpty = useSelector(state => state.todos.isInputEmpty);


    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();
    const inputRef = useRef();
    const importantRef = useRef();




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
        dispatch(todoActions.inputEmpty(false));
    };

    return (
        <Fragment>
            <div>
                <Card>
                    <form className={classes.form} onSubmit={todoSubmitHandler}>
                        <input name="new todo" id="new-todo" ref={inputRef} />
                        <div className={classes.div}>
                            <input type="checkbox" name='important' id='important' ref={importantRef}></input>
                            <label>Check as an important todo</label>
                        </div>
                        <button className='btn btn-primary'>Add New Todo!</button>
                    </form>
                </Card>
                {isInputEmpty && <p className={classes.p}>You cannot add an empty todo!</p>}
            </div>
            <Todos />
        </Fragment>
    )
};

export default NewTodo;