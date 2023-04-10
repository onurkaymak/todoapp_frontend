import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './todo-slice';
import uiReducer from './ui-slice';
import userReducer from './user-slice';


const store = configureStore({ 
    reducer: {
        todos: todoReducer,
        ui: uiReducer,
        user: userReducer
    }
});

export default store;