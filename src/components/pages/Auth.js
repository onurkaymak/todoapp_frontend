import AuthForm from '../auth/AuthForm';

import classes from './Auth.module.css';


const Auth = () => {
    return (
        <div>
            <h1 className={classes.h1}>Welcome to Todo App</h1>
            <AuthForm/>
        </div>
    )
};

export default Auth;