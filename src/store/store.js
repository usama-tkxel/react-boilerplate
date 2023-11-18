import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import logger from 'redux-logger';

import rootReducer from 'src/store/root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  // blacklist: ['auth'],
};

const middleware = [];
if (import.meta.env.MODE === 'development') {
  // only log in devlopment mode
  middleware.push(logger);
}

const middlewareEnhancer = [applyMiddleware(...middleware)];
const composedEnhancers = compose(middlewareEnhancer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }); //to ignore redux presist warning
  },
  reducer: persistedReducer,
  undefined,
  composedEnhancers,
});

const persistor = persistStore(store);

export { store, persistor };
