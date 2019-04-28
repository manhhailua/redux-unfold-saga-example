import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

export default store;
