import classes from './Todos.module.css';

import { Fragment, useCallback, useEffect } from 'react';

import TodoItem from './TodoItem';

import { useSelector, useDispatch } from 'react-redux';


import { fetchTodos } from '../../store/todo-actions';


const Todos = () => {

    const todos = useSelector(state => state.todos.todos);

    console.log(todos)

    const token = useSelector(state => state.user.token);
    const userId = useSelector(state => state.user.userId);

    // const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const fetcher = useCallback(() => { dispatch(fetchTodos({ token, userId })) }, [])

    useEffect(() => {
        fetcher()
    }, [dispatch, token, userId, fetcher])


    const removeHandler = (id) => {
        // dispatch(deleteData(id))
    };




    const currentTodos = todos.map(todo => <TodoItem onRemoveTodo={() => removeHandler(todo.id)} id={todo.id} key={todo.id} todo={todo.todo} important={todo.important} creator={todo.creator} />)
    // (<TodoItem onRemoveTodo={() => removeHandler(todo.id)} id={todo.id} key={todo.id} todo={todo.todo} important={todo.important} creator={todo.creator} />)
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