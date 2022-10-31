import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import contactReducer from './contacts/contacts-slice';
import filterReducer from './filter/filter-slice';

const contactPersistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
});

const persistedContactsReducer = persistReducer(contactPersistConfig, reducer);

export const store = configureStore({
  reducer: persistedContactsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
