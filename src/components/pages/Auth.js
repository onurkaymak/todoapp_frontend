import AuthForm from '../auth/AuthForm';

import classes from './Auth.module.scss';


const Auth = () => {
    return (
        <div className={classes.authContainer}>
            <h1 className={classes.h1}>Welcome to Todo App</h1>
            <AuthForm />
        </div>
    )
};

export default Auth;