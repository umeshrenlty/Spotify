import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../Redux/Reducer/rootReducer';
import Saga from '../Redux/saga';
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(Saga);

export default store;
