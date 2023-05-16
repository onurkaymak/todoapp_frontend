import AuthForm from '../auth/AuthForm';

import classes from './Auth.module.scss';


const Auth = () => {

    return (
        <div className={classes.authContainer}>
            <h1 className={classes.h1}>Welcome to Todo App</h1>
            <AuthForm />
            <p className={classes.p}> Please note that loading may take longer than expected, the back-end server is built on a free-tier hosting provider due to demo purposes.</p>
        </div>
    )
};

export default Auth;