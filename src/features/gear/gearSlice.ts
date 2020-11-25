import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {
	GEAR,
	GEAR_STATE,
	GEAR_RESULT,
	CUSTOM_GEAR,
	POST_GEAR,
	POST_CUSTOM_GEAR_REQUEST
} from "../../interfaces/gearTypes";

const apiBaseUrl = process.env.apiUrl;

// Gear
export const fetchAsyncGetGear = createAsyncThunk(
	'gear/get',
	async () => {
		const response = await axios.get<GEAR_RESULT>(
			`${apiBaseUrl}/v1/gears/`,
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

export const fetchAsyncPostGear = createAsyncThunk(
	'gear/post',
	async (gear: POST_GEAR) => {
		const response = await axios.post<GEAR>(
			`${apiBaseUrl}/v1/gears/`,
			gear,
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

export const fetchAsyncPutGear = createAsyncThunk(
	'gear/put',
	async (gear: POST_GEAR) => {
		const response = await axios.put<GEAR>(
			`${apiBaseUrl}/v1/gears/${gear.id}/`,
			gear,
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

export const fetchAsyncDeleteGear = createAsyncThunk(
	'gear/delete',
	async (gearId: string) => {
		await axios.delete(
			`${apiBaseUrl}/v1/gears/${gearId}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return gearId;
	}
);

// Custom Gear
export const fetchAsyncGetCustomGear = createAsyncThunk(
	'customGear/get',
	async (gearId: string) => {
		const response = await axios.get<CUSTOM_GEAR[]>(
			`${apiBaseUrl}/v1/gears/${gearId}/customs/`,
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

export const fetchAsyncPostCustomGear = createAsyncThunk(
	'customGear/post',
	async ({gear_id, custom_gear}: POST_CUSTOM_GEAR_REQUEST) => {
		const response = await axios.post<CUSTOM_GEAR>(
			`${apiBaseUrl}/v1/gears/${gear_id}/customs/`,
			custom_gear,
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

export const initialState: GEAR_STATE = {
	gears: [],
	edited_gear: {
		id: '',
		title: '',
		purpose_type: 1,
		remarks: '',
		has_rain_wear: true,
		has_winter_clothing: true,
		has_map: true,
		has_compass: true,
		has_headlamp: true,
		has_mobile_phone: true,
		has_spare_battery: true,
		has_first_aid_kit: true,
		has_emergency_tent: true,
		has_transceiver: false,
		call_sign: '',
		has_radio: false,
		has_tent: false,
		has_sleeping_bag: false,
		has_stove: false,
		has_helmet: false,
		has_climbing_rope: false,
		has_climbing_gear: false,
		has_crampons: false,
		has_ice_axe: false,
		has_shovel: false,
		has_beacon: false,
		has_probe: false,
		has_snow_saw: false,
		has_riding_gear: false,
		riding_type: null
	},
	custom_gears: [],
	edited_custom_gear: {
		name: '',
		sort_index: 0
	}
}

export const gearSlice = createSlice({
	name: 'gear',
	initialState,
	reducers: {
		editedGear(state, action: PayloadAction<POST_GEAR>) {
			state.edited_gear = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAsyncGetGear.fulfilled,
			(state, action: PayloadAction<GEAR_RESULT>) => {
				return {
					...state,
					gears: action.payload.results
				};
			}
		);
		builder.addCase(
			fetchAsyncPostGear.fulfilled,
			(state, action: PayloadAction<GEAR>) => {
				return {
					...state,
					gears: [action.payload, ...state.gears],
					edited_gear: initialState.edited_gear
				};
			}
		);
		builder.addCase(
			fetchAsyncPutGear.fulfilled,
			(state, action: PayloadAction<GEAR>) => {
				return {
					...state,
					gears: state.gears.map((gear) => (gear.id === action.payload.id ? action.payload : gear)),
					edited_gear: initialState.edited_gear
				};
			}
		);
		builder.addCase(
			fetchAsyncDeleteGear.fulfilled,
			(state, action: PayloadAction<string>) => {
				return {
					...state,
					gears: state.gears.filter((gear) => gear.id !== action.payload)
				};
			}
		);
	}
});

export const {editedGear} = gearSlice.actions;

export const selectGears = (state: RootState) => state.gear.gears;
export const selectEditedGear = (state: RootState) => state.gear.edited_gear;

export default gearSlice.reducer;
