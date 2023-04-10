import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";

import { logoutTimer, setLogoutTimer } from "../components/layout/MainNavigation";


export const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
  
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration
  }


export const logoutHandlerr = () => {
    return async (dispatch) => {
        dispatch(userActions.logout())
        dispatch(userActions.setIsLoggedIn(false));
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }
}
  


export const createUser = (userInfo) => {
    return async(dispatch) => {
        const email = userInfo.enteredEmail;
        const password = userInfo.enteredPassword;

        const create = async () => {
            const auth = getAuth();
            const response = createUserWithEmailAndPassword(auth, email, password)
                return response;
        }
         
        try{
            const user = await create()
            const token = user._tokenResponse.idToken;
            const expirationTime = user._tokenResponse.expiresIn;
            const adjexpirationTime = new Date((new Date().getTime() + (+expirationTime * 1000)));
            const adjExpirationTimeISO = adjexpirationTime.toISOString();

            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', adjExpirationTimeISO);

            const remainingTime = calculateRemainingTime(adjExpirationTimeISO);
            

            dispatch(userActions.login({token, remainingTime}));

            // logoutTimer = setTimeout(logoutHandler, 3000);


            
        } catch (error) {
            const errorMessage = error.message;
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Account creation failed!',
                message: errorMessage
            }))

        }
    }
}

export const signInUser = (userInfo) => {
    return async(dispatch) => {

        const email = userInfo.enteredEmail;
        const password = userInfo.enteredPassword;

        const signIn = async () => {
            const auth = getAuth();
            const response = signInWithEmailAndPassword(auth, email, password)
            return response;
        }

        try{
            const user = await signIn();
            const token = user._tokenResponse.idToken;
            const expirationTime = user._tokenResponse.expiresIn;
            const adjexpirationTime = new Date((new Date().getTime() + (+expirationTime * 1000)));
            const adjExpirationTimeISO = adjexpirationTime.toISOString();

            const remainingTime = calculateRemainingTime(adjExpirationTimeISO);

            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', adjExpirationTimeISO);


            dispatch(userActions.login({token, remainingTime}));

            // logoutTimer = setTimeout(logoutHandler, remainingTime);
            setLogoutTimer(setTimeout(logoutHandlerr, remainingTime));


        } catch (error) {
            const errorMessage = error.message;
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Login Failed!',
                message: errorMessage
            }))
        }
    }
}





        // const logoutHandler = () => {
        //     dispatch(userActions.logout())
        //     dispatch(userActions.setIsLoggedIn(false));
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('expirationTime');
            
        //     if (logoutTimer) {
        //         clearTimeout(logoutTimer)
        //     }
        //   }

