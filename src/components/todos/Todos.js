import classes from './Todos.module.css';

import { Fragment, useEffect } from 'react';

import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';


// import { fetchData, deleteData } from '../../store/todo-actions';


const Todos = () => {

    const todos = useSelector(state => state.todos.todos);
    console.log(todos)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchData())
    // },[dispatch])


    const removeHandler = (id) => {
        // dispatch(deleteData(id))
    };




    const currentTodos = todos.map(todo => <TodoItem onRemoveTodo={() => removeHandler(todo._id)} id={todo._id} key={todo._id} todo={todo.todo} important={todo.important} />)
    // todoCtx.removeTodo.bind(null, todo.id)


    let content;
    if (todos.length === 0) {
        content = <h1 className={classes.h1}>there is nothing to do.</h1>
    }

    return (
        <Fragment>
            {currentTodos}
            {todos.length === 0 && content}
        </Fragment>
    )
};

export default Todos;