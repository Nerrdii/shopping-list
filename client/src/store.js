import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import itemReducer from './reducers/itemReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    item: itemReducer,
  },
});

export default store;
