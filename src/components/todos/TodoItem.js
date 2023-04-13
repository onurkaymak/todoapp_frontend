import Card from "../../UI/Card";
import classes from './TodoItem.module.css';



const TodoItem = (props) => {



    return (
        <Card >
            <div>
                <h1 className={classes.h1} onClick={props.onRemoveTodo}>{props.todo}</h1>
            </div>
        </Card>
    )
};

export default TodoItem;

