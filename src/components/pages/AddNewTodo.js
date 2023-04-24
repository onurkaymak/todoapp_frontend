import NewTodo from "../todos/NewTodo";

import classes from './AddNewTodo.module.scss'

const AddNewTodo = () => {
    return (
        <div className={classes.container}>
            <NewTodo />
        </div>
    )
}

export default AddNewTodo;