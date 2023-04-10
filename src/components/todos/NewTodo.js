import classes from './NewTodo.module.css';
import Card from '../../UI/Card';

import { Fragment, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../store/todo-slice';

import { sendData } from '../../store/todo-actions';
import Todos from './Todos';


const NewTodo = () => {

    const isInputEmpty = useSelector(state => state.isInputEmpty);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const colorRef = useRef();

    const todoSubmitHandler = async(event) => {
        event.preventDefault();

        if (inputRef.current.value === '') {
            dispatch(todoActions.inputEmpty(true))
            return
        }
        const userInputRef = inputRef.current.value;
        const todoColor = colorRef.current.value;
        
        const generateId = Math.floor(Math.random() * 10) + 1

        const userInput = {
            id: generateId,
            todo: userInputRef,
            color: todoColor,
            key: generateId
        }
        dispatch(sendData(userInput))
        inputRef.current.value = '';
        dispatch(todoActions.inputEmpty(false));
        colorRef.current.value = '#000000'
    };

    return (
        <Fragment>
        <div>
        <Card>
            <form className={classes.form} onSubmit={todoSubmitHandler}>
                <input name="new todo" id="new-todo"  ref={inputRef}/>
                <div className={classes.div}>
                    <input type="color" name='color' id='color' ref={colorRef}></input>
                    <label>Choose a color for todo</label>         
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