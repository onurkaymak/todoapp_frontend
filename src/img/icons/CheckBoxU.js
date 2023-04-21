import classes from './CheckBoxU.module.scss';

export const CheckBoxU = (props) => {


    let content;


    if (!props.isChecked) {
        content =
            <svg
                xmlns="../../img/sprite.svg#icon-checkbox-unchecked.svg"
                // viewBox="0 0 32 32"
                className={classes.editIcon}
            >
                <title>Mark as checked</title>
                <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM28 28h-24v-24h24v24z"></path>
            </svg>

    }
    if (props.isChecked) {
        content =
            <svg
                xmlns="../../img/sprite.svg#icon-checkbox-checked.svg"
                // viewBox="0 0 32 32"
                className={classes.editIconChecked}
            >
                <title>Mark as unchecked</title>
                <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 
        24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z"></path>
            </svg>
    }

    return (
        <label onClick={props.onCheck}>
            {content}
        </label>
    )
}