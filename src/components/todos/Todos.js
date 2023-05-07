import classes from './Todos.module.scss';

import { useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTodos, deleteTodo } from '../../store/todo-actions';

import TodoItem from './TodoItem';



const Todos = () => {

    const isLoading = useSelector(state => state.ui.isLoading);
    const todos = useSelector(state => state.todos.todos);
    const token = useSelector(state => state.user.token);
    const userId = useSelector(state => state.user.userId);

    const dispatch = useDispatch();

    const fetcher = useCallback(async () => {
        dispatch(fetchTodos({ token, userId }))
    },
        [dispatch, token, userId])

    useEffect(() => {
        fetcher()

    }, [dispatch, token, userId, fetcher])


    const removeHandler = (todoId) => {
        dispatch(deleteTodo(todoId, token))
    };


    let content;

    const currentTodos = todos.map(todo =>
        <TodoItem
            onRemoveTodo={() => removeHandler(todo.id)}
            id={todo.id}
            key={todo.id}
            todo={todo.todo}
            important={todo.important}
            creator={todo.creator}
        />)

    if (!isLoading && currentTodos.length === 0) {
        content = <h1 className={classes.h1}>- there is nothing to do -</h1>
    }
    else if (isLoading) {
        content = <h1 className={classes.h1}>Loading...</h1>
    }
    else {
        content = currentTodos;
    }



    return (
        <div className={classes.container__todos}>
            {content}
        </div >
    )
};

export default Todos;