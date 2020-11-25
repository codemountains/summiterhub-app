import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
// import {RootState} from '../../app/store';
import axios from 'axios';
import {
	AUTHENTICATION_USER,
	AUTH_SIMPLE_JWT,
	LOGGED_IN_USER,
	USER_DETAIL, USER_STATE, POST_USER_DETAIL
} from "../../interfaces/userTypes";
import {RootState} from "../../app/store";

const apiBaseUrl = process.env.apiUrl;

export const fetchAsyncLogin = createAsyncThunk(
	"auth/post",
	async (auth: AUTHENTICATION_USER) => {
		const response = await axios.post<AUTH_SIMPLE_JWT>(
			`${apiBaseUrl}/authen/jwt/create/`,
			auth,
			{
				headers: {
					"Content-Type": "application/json",
				}
			}
		);
		return response.data;
	}
);

export const fetchAsyncSignup = createAsyncThunk(
	"signup/post",
	async (auth: AUTHENTICATION_USER) => {
		const response = await axios.post<LOGGED_IN_USER>(
			`${apiBaseUrl}/v1/users/signup/`,
			auth,
			{
				headers: {
					"Content-Type": "application/json",
				}
			}
		);
		return response.data;
	}
);

export const fetchAsyncGetUserMe = createAsyncThunk(
	"userMe/get",
	async () => {
		const response = await axios.get<LOGGED_IN_USER[]>(
			`${apiBaseUrl}/v1/users/me/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					"Content-Type": "application/json",
				}
			}
		);
		return response.data[0];
	}
);

export const fetchAsyncGetUserDetail = createAsyncThunk(
	"userDetails/get",
	async () => {
		const response = await axios.get<USER_DETAIL[]>(
			`${apiBaseUrl}/v1/users/me/details/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					"Content-Type": "application/json",
				}
			}
		);
		return response.data[0];
	}
);

export const logout = () => {
	localStorage.removeItem("JWTRefresh");
	localStorage.removeItem("JWTAccess");
	window.location.href = "/";
}

export const initialState: USER_STATE = {
	user: {
		id: '',
		email: ''
	},
	edited_user: {
		id: '',
		emil: '',
		password: ''
	},
	user_detail: {
		id: '',
		user: '',
		created_at: '',
		updated_at: '',
		profile_name: '',
		profile_image: null,
		name: '',
		postal_code: '',
		prefecture: 1,
		prefecture_name: '',
		address: '',
		gender_type: 1,
		gender_type_name: '',
		blood_type: 1,
		blood_type_name: '',
		home_phone_number: null,
		cell_phone_number: null,
		emergency_contact_name: '',
		emergency_contact_phone: '',
		emergency_contact_email: '',
		insurance_name: null,
		insurance_number: null,
		hitococo_id: null
	},
	edited_user_detail: {
		id: '',
		profile_name: '',
		profile_image: null,
		name: '',
		postal_code: '',
		prefecture: 1,
		address: '',
		gender_type: 1,
		blood_type: 1,
		blood_type_name: '',
		home_phone_number: null,
		cell_phone_number: null,
		emergency_contact_name: '',
		emergency_contact_phone: '',
		emergency_contact_email: '',
		insurance_name: null,
		insurance_number: null,
		hitococo_id: null
	}
};

export const authSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {
		user(state, action: PayloadAction<LOGGED_IN_USER>) {
			state.user = action.payload;
		},
		userDetail(state, action: PayloadAction<USER_DETAIL>) {
			state.user_detail = action.payload;
		},
		editedUserDetail(state, action: PayloadAction<POST_USER_DETAIL>) {
			state.edited_user_detail = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAsyncLogin.fulfilled,
			(_state, action: PayloadAction<AUTH_SIMPLE_JWT>) => {
				localStorage.setItem('JWTRefresh', action.payload.refresh);
				localStorage.setItem('JWTAccess', action.payload.access);
				// action.payload.access && (window.location.href = '/');
			}
		);
		builder.addCase(
			fetchAsyncLogin.rejected,
			() => {
				// alert('fetchAsyncLogin.rejected');
			}
		);
		builder.addCase(
			fetchAsyncGetUserMe.fulfilled,
			(state, action: PayloadAction<LOGGED_IN_USER>) => {
				state.user = action.payload;
			}
		);
		builder.addCase(
			fetchAsyncGetUserMe.rejected,
			() => {
				// 特に何もしない？
				// alert('fetchAsyncGetUserMe.rejected');
			}
		);
		builder.addCase(
			fetchAsyncGetUserDetail.fulfilled,
			(state, action: PayloadAction<USER_DETAIL>) => {
				if (action.payload) {
					state.user_detail = action.payload;
				} else {
					window.location.href = '/account/create/'
				}
			}
		);
		builder.addCase(
			fetchAsyncGetUserDetail.rejected,
			() => {
				// alert('fetchAsyncGetUserDetail.rejected');
			}
		);
	}
});

export const {user, userDetail, editedUserDetail} = authSlice.actions;

export const selectUser = (state: RootState) => state.authentication.user;
export const selectUserDetail = (state: RootState) => state.authentication.user_detail;
export const selectEditedUserDetail = (state: RootState) => state.authentication.edited_user_detail;

export default authSlice.reducer;
