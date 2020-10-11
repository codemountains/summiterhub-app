import {createSlice} from '@reduxjs/toolkit';
// import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
// import {RootState} from '../../app/store';
// import axios from 'axios';
import {LOGIN_STATE} from "../../interfaces/userTypes";

const initialState: LOGIN_STATE = {
	loginUser: {
		email: "",
		password: "",
	},
	isKeepLoggedIn: false
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
	},
});

export default loginSlice.reducer;
