import classes from './Todos.module.css';

import { Fragment, useEffect } from 'react';

import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';


// import { fetchData, deleteData } from '../../store/todo-actions';


const Todos = () => {

    const todos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchData())
    // },[dispatch])


    const removeHandler = (id) => {
        // dispatch(deleteData(id))
    };




    const currentTodos = todos.map(todo => <TodoItem onRemoveTodo={() => removeHandler(todo.id)} id={todo.id} key={todo.key} todo={todo.todo} color={todo.color} />)
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