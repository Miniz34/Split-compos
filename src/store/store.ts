// store.js
import { configureStore } from '@reduxjs/toolkit';
import { reducer as raidOneReducer } from './raidOneSlice'; // Import with the correct named export
import { reducer as raidTwoReducer } from './raidTwoSlice'; // Import with the correct named export

const store = configureStore({
  reducer: {
    raidOne: raidOneReducer,
    raidTwo: raidTwoReducer,
  },
});

export default store;