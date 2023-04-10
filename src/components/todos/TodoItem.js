import Card from "../../UI/Card";
import classes from './TodoItem.module.css';



const TodoItem = (props) => {

    const divStyle = {backgroundColor: `${props.color}`};

    return (
        <Card >
            <div style={divStyle}>
                <h1 className={classes.h1} onClick={props.onRemoveTodo}>{props.todo}</h1>
            </div>
        </Card>
    )
};

export default TodoItem;

