import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './modules';

const store = configureStore({
  reducer: { userSlice: userSlice.reducer },
});

// export type RootState = ReturnType<typeof store.getState>;

export default store;
