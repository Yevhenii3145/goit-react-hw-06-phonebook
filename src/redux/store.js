import { configureStore } from '@reduxjs/toolkit';

import contactReducer from './contacts/contacts-slice';
import filterReducer from './filter/filter-slice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});

export default store;
