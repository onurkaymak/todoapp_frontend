import classes from './FlagIcon.module.scss';

export const FlagIcon = (props) => {

    let content = `${classes.flagIcon}`;

    if (props.flagColor) {
        content = `${classes.flagColor}`
    }


    return (
        <label htmlFor='important'>
            <svg
                xmlns="../../img/sprite.svg#icon-flag.svg"
                viewBox="0 0 32 32"
                className={`${content}`}
            >
                <path d="M0 0h4v32h-4v-32z"></path>
                <path d="M26 20.094c2.582 0 4.83-0.625 6-1.547v-16c-1.17 0.922-3.418 1.547-6 1.547s-4.83-0.625-6-1.547v16c1.17 0.922 3.418 1.547 6 1.547z"></path>
                <path d="M19 1.016c-1.466-0.623-3.61-1.016-6-1.016-3.012 0-5.635 0.625-7 1.547v16c1.365-0.922 3.988-1.547 7-1.547 2.39 0 4.534 0.393 6 1.016v-16z"></path>
            </svg>
        </label>

    )
}