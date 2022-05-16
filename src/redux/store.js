import { combineReducers } from 'redux';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';

export const addContact = createAction('contacts/add');
export const removeContact = createAction('contacts/remove');
export const setFilter = createAction('filter/set');

const contactsReducer = createReducer(
  [],
  {
    [addContact]: (state, action) => [...state, action.payload],
    [removeContact]: (state, action) =>
      state.filter(contact => contact.id !== action.payload),
  }
);

const filterReducer = createReducer('', {
  [setFilter]: (state, action) => (state = action.payload),
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const persistContactsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    contacts: persistContactsReducer,
    filter: filterReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
