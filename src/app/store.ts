import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import searchReducer from '../features/search/searchSlice';
import planReducer from '../features/plan/planSlice';
import gearReducer from '../features/gear/gearSlice';
import friensReducer from '../features/friend/friendSlice';

export const store = configureStore({
	reducer: {
		authentication: authReducer,
		search: searchReducer,
		plan: planReducer,
		gear: gearReducer,
		friend: friensReducer
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	RootState,
	unknown,
	Action<string>>;

export type AppDispatch = typeof store.dispatch;
