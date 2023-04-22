import AuthForm from '../auth/AuthForm';

import classes from './Auth.module.scss';

import { useSelector } from 'react-redux';

import Notification from '../../UI/Notification';



const Auth = () => {

    const ui = useSelector(state => state.ui.notification);

    return (
        <div className={classes.authContainer}>
            {!ui && <h1 className={classes.h1}>Welcome to Todo App</h1>}
            {ui && <Notification title={ui.title} message={ui.message} status={ui.status} />}
            {!ui && < AuthForm />}
        </div>
    )
};

export default Auth;