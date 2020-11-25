import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {FRIEND, FRIEND_RESULT, FRIEND_STATE, USER_DETAIL} from "../../interfaces/userTypes";

const apiBaseUrl = process.env.apiUrl;

// Friend
export const fetchAsyncGetFriend = createAsyncThunk(
	'friend/get',
	async () => {
		const response = await axios.get<FRIEND_RESULT>(
			`${apiBaseUrl}/v1/users/friends/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

// FriendDetail
export const fetchAsyncGetFriendDetail = createAsyncThunk(
	'friendDetail/get',
	async (friendId: string) => {
		const response = await axios.get<USER_DETAIL[]>(
			`${apiBaseUrl}/v1/users/friends/${friendId}/details/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data[0];
	}
);

export const initialState: FRIEND_STATE = {
	friends: []
}

const initialDetail: USER_DETAIL = {
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
}

export const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAsyncGetFriend.fulfilled,
			(state, action: PayloadAction<FRIEND_RESULT>) => {
				const friends: FRIEND[] = [];
				for (const friend of action.payload.results) {
					friends.push({
						id: friend.id,
						src_user: friend.src_user,
						dest_user: friend.dest_user,
						created_at: friend.created_at,
						updated_at: friend.updated_at,
						friend_request: friend.friend_request,
						detail: initialDetail
					});
				}

				return {
					...state,
					friends: friends
				}
			}
		);
		builder.addCase(
			fetchAsyncGetFriendDetail.fulfilled,
			(state, action) => {
				state.friends.filter((f) => (f.dest_user === action.payload.user))[0].detail = action.payload;
			}
		);
	}
});

export const {} = friendSlice.actions;

export const selectFriends = (state: RootState) => state.friend.friends;

export default friendSlice.reducer;
