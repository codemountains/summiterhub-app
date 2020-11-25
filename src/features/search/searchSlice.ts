import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {
	SEARCHED_PLAN,
	SEARCH_PARAMS,
	SEARCH_PLAN_STATE,
	SEARCH_PLAN_RESULT
} from "../../interfaces/planTypes";

const apiBaseUrl = process.env.apiUrl;

export const fetchAsyncSearchPlan = createAsyncThunk(
	'searchPlan/get',
	async (params: SEARCH_PARAMS) => {
		const response = await axios.get<SEARCH_PLAN_RESULT>(
			`${apiBaseUrl}/v1/plans/search/?mountain=${params.mountain}`,
			{
				headers: {
					// Authorization: `JWT `,
					'Content-Type': 'application/json'
				},
			}
		);
		return response.data;
	}
);

export const fetchAsyncSearchPlanByPlanId = createAsyncThunk(
	'searchPlan/getById',
	async (planId: string) => {
		const response = await axios.get<SEARCHED_PLAN>(
			`${apiBaseUrl}/v1/plans/search/${planId}/`,
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

export const initialState: SEARCH_PLAN_STATE = {
	searched_plans: [],
	search_params: {
		mountain: '',
		purpose_type: 0
	},
	selected_searched_plan: {
		id: '',
		purpose_type: 1,
		purpose_type_name: '',
		prefecture: 1,
		prefecture_name: '',
		mountain_first: '',
		mountain_second: '',
		mountain_third: '',
		mountain_fourth: '',
		mountain_fifth: '',
		submitted_date: null,
		entering_date: '',
		descending_date: '',
		has_trail_snacks: true,
		water_liters: '1.5',
		food_times: 0,
		emergency_food_times: 0,
	}
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		editSearchParams(state, action: PayloadAction<SEARCH_PARAMS>) {
			state.search_params = action.payload;
		},
		selectedSearchPlan(state, action: PayloadAction<SEARCHED_PLAN>) {
			state.selected_searched_plan = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAsyncSearchPlan.fulfilled,
			(state, action: PayloadAction<SEARCH_PLAN_RESULT>) => {
				return {
					...state,
					searched_plans: action.payload.results
				};
			}
		);
		builder.addCase(
			fetchAsyncSearchPlanByPlanId.fulfilled,
			(state, action: PayloadAction<SEARCHED_PLAN>) => {
				return {
					...state,
					selected_searched_plan: action.payload
				};
			}
		);
	}
});

export const {editSearchParams, selectedSearchPlan} = searchSlice.actions;

export const selectSearchedPlans = (state: RootState) => state.search.searched_plans;
export const selectSearchParams = (state: RootState) => state.search.search_params;
export const selectSelectedSearchPlan = (state: RootState) => state.search.selected_searched_plan;

export default searchSlice.reducer;
