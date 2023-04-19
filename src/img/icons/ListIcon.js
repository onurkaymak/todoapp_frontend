import classes from './ListIcon.module.scss';

export const ListIcon = () => {
    return (
        <svg
            xmlns="../../img/sprite.svg#icon-list.svg"
            viewBox="0 0 32 32"
            className={classes.listIcon}
        >
            <path d="M0 0h8v8h-8zM12 2h20v4h-20zM0 12h8v8h-8zM12 14h20v4h-20zM0 24h8v8h-8zM12 26h20v4h-20z"></path>
        </svg>
    )
}