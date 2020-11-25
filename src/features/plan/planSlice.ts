import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from 'axios';
import {
	DELETE_PLAN_ROUTE_DETAIL_REQUEST,
	PLAN,
	PLAN_ESCAPE_ROUTE,
	PLAN_GEAR,
	PLAN_MEMBER,
	PLAN_RESULT,
	PLAN_ROUTE,
	PLAN_ROUTE_DETAIL,
	PLAN_STATE,
	POST_PLAN_ROUTE_DETAIL_REQUEST,
	SEARCH_PARAMS,
	PLAN_SUBMIT_REQUEST, SEARCHED_PLAN
} from "../../interfaces/planTypes";

const apiBaseUrl = process.env.apiUrl;

// Plan
export const fetchAsyncGetPlan = createAsyncThunk(
	'plan/get',
	async () => {
		const response = await axios.get<PLAN_RESULT>(
			`${apiBaseUrl}/v1/plans/?purpose_type=&mountain=`,
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

export const fetchAsyncGetPlanByPlanId = createAsyncThunk(
	'plan/getById',
	async (planId: string) => {
		const response = await axios.get<PLAN>(
			`${apiBaseUrl}/v1/plans/${planId}/`,
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

export const fetchAsyncGetCopyPlanByPlanId = createAsyncThunk(
	'copyPlan/getById',
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

export const fetchAsyncPostPlan = createAsyncThunk(
	'plan/post',
	async (plan: PLAN) => {
		const response = await axios.post<PLAN>(
			`${apiBaseUrl}/v1/plans/`,
			plan,
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

export const fetchAsyncPutPlan = createAsyncThunk(
	'plan/put',
	async (plan: PLAN) => {
		const response = await axios.put<PLAN>(
			`${apiBaseUrl}/v1/plans/${plan.id}/`,
			plan,
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

export const fetchAsyncPatchPlanSubmit = createAsyncThunk(
	'planSubmit/patch',
	async (request: PLAN_SUBMIT_REQUEST) => {
		const response = await axios.patch<PLAN>(
			`${apiBaseUrl}/v1/plans/${request.id}/`,
			request,
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

export const fetchAsyncDeletePlan = createAsyncThunk(
	'plan/delete',
	async (planId: string) => {
		await axios.delete(
			`${apiBaseUrl}/v1/plans/${planId}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return planId;
	}
);

// PlanRoute
export const fetchAsyncGetPlanRoute = createAsyncThunk(
	'planRoute/get',
	async (planId: string) => {
		const response = await axios.get<PLAN_ROUTE[]>(
			`${apiBaseUrl}/v1/plans/${planId}/routes/`,
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

export const fetchAsyncPostPlanRoute = createAsyncThunk(
	'planRoute/post',
	async (route: PLAN_ROUTE) => {
		const response = await axios.post<PLAN_ROUTE>(
			`${apiBaseUrl}/v1/plans/${route.plan}/routes/`,
			route,
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

export const fetchAsyncPutPlanRoute = createAsyncThunk(
	'planRoute/put',
	async (route: PLAN_ROUTE) => {
		const response = await axios.put<PLAN_ROUTE>(
			`${apiBaseUrl}/v1/plans/${route.plan}/routes/${route.id}/`,
			route,
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

export const fetchAsyncDeletePlanRoute = createAsyncThunk(
	'planRoute/delete',
	async (route: PLAN_ROUTE) => {
		await axios.delete(
			`${apiBaseUrl}/v1/plans/${route.plan}/routes/${route.id}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return route.id;
	}
);

// PlanRouteDetail
export const fetchAsyncGetPlanRouteDetail = createAsyncThunk(
	'planRouteDetail/get',
	async (route: PLAN_ROUTE) => {
		const response = await axios.get<PLAN_ROUTE_DETAIL[]>(
			`${apiBaseUrl}/v1/plans/${route.plan}/routes/${route.id}/details/`,
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

export const fetchAsyncPostPlanRouteDetail = createAsyncThunk(
	'planRouteDetail/post',
	async (request: POST_PLAN_ROUTE_DETAIL_REQUEST) => {
		const response = await axios.post<PLAN_ROUTE_DETAIL>(
			`${apiBaseUrl}/v1/plans/${request.plan_id}/routes/${request.detail.plan_route}/details/`,
			request.detail,
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

export const fetchAsyncPutPlanRouteDetail = createAsyncThunk(
	'planRouteDetail/put',
	async (request: POST_PLAN_ROUTE_DETAIL_REQUEST) => {
		const response = await axios.put<PLAN_ROUTE_DETAIL>(
			`${apiBaseUrl}/v1/plans/${request.plan_id}/routes/${request.detail.plan_route}/details/${request.detail.id}/`,
			request.detail,
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

export const fetchAsyncDeletePlanRouteDetail = createAsyncThunk(
	'planRouteDetail/delete',
	async (request: DELETE_PLAN_ROUTE_DETAIL_REQUEST) => {
		await axios.delete(
			`${apiBaseUrl}/v1/plans/${request.plan_id}/routes/${request.detail.plan_route}/details/${request.detail.id}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return request.detail.id;
	}
);

// PlanEscapeRoute
export const fetchAsyncGetPlanEscapeRoute = createAsyncThunk(
	'planEscapeRoute/get',
	async (planId: string) => {
		const response = await axios.get<PLAN_ESCAPE_ROUTE[]>(
			`${apiBaseUrl}/v1/plans/${planId}/escapes/`,
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

export const fetchAsyncPostPlanEscapeRoute = createAsyncThunk(
	'planEscapeRoute/post',
	async (escape: PLAN_ESCAPE_ROUTE) => {
		const response = await axios.post<PLAN_ESCAPE_ROUTE>(
			`${apiBaseUrl}/v1/plans/${escape.plan}/escapes/`,
			escape,
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

export const fetchAsyncPutPlanEscapeRoute = createAsyncThunk(
	'planEscapeRoute/put',
	async (escape: PLAN_ESCAPE_ROUTE) => {
		const response = await axios.put<PLAN_ESCAPE_ROUTE>(
			`${apiBaseUrl}/v1/plans/${escape.plan}/escapes/${escape.id}/`,
			escape,
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

export const fetchAsyncDeletePlanEscapeRoute = createAsyncThunk(
	'planEscapeRoute/delete',
	async (escape: PLAN_ESCAPE_ROUTE) => {
		await axios.delete(
			`${apiBaseUrl}/v1/plans/${escape.plan}/escapes/${escape.id}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return escape.id;
	}
);

// PlanGear
export const fetchAsyncGetPlanGear = createAsyncThunk(
	'planGear/get',
	async (planId: string) => {
		const response = await axios.get<PLAN_GEAR[]>(
			`${apiBaseUrl}/v1/plans/${planId}/gears/`,
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

export const fetchAsyncPostPlanGear = createAsyncThunk(
	'planGear/post',
	async (gear: PLAN_GEAR) => {
		const response = await axios.post<PLAN_GEAR>(
			`${apiBaseUrl}/v1/plans/${gear.plan}/gears/`,
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

export const fetchAsyncPutPlanGear = createAsyncThunk(
	'planGear/put',
	async (gear: PLAN_GEAR) => {
		const response = await axios.put<PLAN_GEAR>(
			`${apiBaseUrl}/v1/plans/${gear.plan}/gears/${gear.id}/`,
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

// PlanMember
export const fetchAsyncGetPlanMember = createAsyncThunk(
	'planMember/get',
	async (planId: string) => {
		const response = await axios.get<PLAN_MEMBER[]>(
			`${apiBaseUrl}/v1/plans/${planId}/members/`,
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

export const fetchAsyncPostPlanMember = createAsyncThunk(
	'planMember/post',
	async (member: PLAN_MEMBER) => {
		const response = await axios.post<PLAN_GEAR>(
			`${apiBaseUrl}/v1/plans/${member.plan}/members/`,
			member,
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

export const fetchAsyncPutPlanMember = createAsyncThunk(
	'planMember/put',
	async (member: PLAN_MEMBER) => {
		const response = await axios.put<PLAN_GEAR>(
			`${apiBaseUrl}/v1/plans/${member.plan}/members/${member.id}/`,
			member,
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

export const fetchAsyncDeletePlanMember = createAsyncThunk(
	'planMember/delete',
	async (member: PLAN_MEMBER) => {
		await axios.delete<PLAN_GEAR>(
			`${apiBaseUrl}/v1/plans/${member.plan}/members/${member.id}/`,
			{
				headers: {
					Authorization: `JWT ${localStorage.JWTAccess}`,
					'Content-Type': 'application/json'
				},
			}
		);
		return member.id;
	}
);


// 仮IDの生成 ※このIDでDB登録はしない
export const tempId = (): string => {
	let chars = "temp-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
	for (let i = 0, len = chars.length; i < len; i++) {
		switch (chars[i]) {
			case "x":
				chars[i] = Math.floor(Math.random() * 16).toString(16);
				break;
			case "y":
				chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
				break;
		}
	}
	return chars.join("");
}

// 日付を整形する
export const formattedDate = (dateString: string): string => {
	const date = new Date(dateString);
	return [
		date.getFullYear().toString(),
		(date.getMonth() + 1).toString(),
		date.getDate().toString()
	].join('-');
}

const tempPlanId: string = tempId();
const tempDetailId: string = tempId();
const initialDate: string = formattedDate((new Date()).toString());

export const initialState: PLAN_STATE = {
	plans: [],
	search_params: {
		mountain: '',
		purpose_type: 0
	},
	edited_plan: {
		id: '',
		created_user: '',
		created_at: null,
		updated_user: '',
		updated_at: null,
		purpose_type: 1,
		purpose_type_name: null,
		prefecture: 1,
		prefecture_name: null,
		mountain_first: '',
		mountain_second: '',
		mountain_third: '',
		mountain_fourth: '',
		mountain_fifth: '',
		is_submitted: false,
		submitted_date: null,
		entering_date: initialDate,
		descending_date: initialDate,
		affiliate_group_name: '',
		affiliate_group_phone: '',
		has_trail_snacks: true,
		water_liters: '1',
		food_times: 0,
		emergency_food_times: 0,
		routes: [
			{
				id: tempPlanId,
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan: '',
				plan_date: initialDate,
				details: [
					{
						id: tempDetailId,
						created_user: '',
						created_at: null,
						updated_user: '',
						updated_at: null,
						plan_route: tempPlanId,
						name: '',
						is_staying: false,
						sort_index: 1
					},
				],
			},
		],
		escape: {
			id: '',
			created_user: '',
			created_at: null,
			updated_user: '',
			updated_at: null,
			plan: '',
			content: ''
		},
		gear: {
			id: '',
			created_user: '',
			created_at: null,
			updated_user: '',
			updated_at: null,
			plan: '',
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
			riding_type: null,
			riding_type_name: '',
			gear: null
		},
		members: [
			{
				id: tempId(),
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan: '',
				user: '',
				name: '',
				postal_code: '',
				prefecture: 1,
				prefecture_name: '',
				address: '',
				gender_type: 1,
				gender_type_name: '',
				blood_type: 1,
				blood_type_name: '',
				home_phone_number: '',
				cell_phone_number: '',
				emergency_contact_name: '',
				emergency_contact_phone: '',
				emergency_contact_email: '',
				insurance_name: '',
				insurance_number: '',
				hitococo_id: '',
				sort_index: 1
			},
		]
	},
	deleted_routes: [],
	deleted_route_details: [],
	deleted_members: []
}

export const planSlice = createSlice({
	name: 'plan',
	initialState,
	reducers: {
		search_params(state, action: PayloadAction<SEARCH_PARAMS>) {
			state.search_params = action.payload;
		},
		editPlan(state, action: PayloadAction<PLAN>) {
			state.edited_plan = action.payload;
		},
		pushPlanRoute(state, action: PayloadAction<PLAN_ROUTE>) {
			let date = new Date(action.payload.plan_date);
			date.setDate(date.getDate() + 1);

			const pushingTempPlanId: string = tempId();
			const pushingTempDetailId: string = tempId();

			const pushingRoute: PLAN_ROUTE = {
				id: pushingTempPlanId,
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan: '',
				plan_date: formattedDate((date).toString()),
				details: [
					{
						id: pushingTempDetailId,
						created_user: '',
						created_at: null,
						updated_user: '',
						updated_at: null,
						plan_route: pushingTempPlanId,
						name: '',
						is_staying: false,
						sort_index: 1
					},
				]
			}
			state.edited_plan.routes.push(pushingRoute);

			// 入山・下山日の更新
			state.edited_plan.entering_date = formattedDate(state.edited_plan.routes[0].plan_date);
			state.edited_plan.descending_date = formattedDate(state.edited_plan.routes[state.edited_plan.routes.length - 1].plan_date);
		},
		editPlanRoute(state, action: PayloadAction<PLAN_ROUTE>) {
			state.edited_plan.routes = state.edited_plan.routes.map((route) => (route.id === action.payload.id ? action.payload : route));

			// 入山・下山日の更新
			state.edited_plan.entering_date = formattedDate(state.edited_plan.routes[0].plan_date);
			state.edited_plan.descending_date = formattedDate(state.edited_plan.routes[state.edited_plan.routes.length - 1].plan_date);
		},
		deletePlanRoute(state, action: PayloadAction<PLAN_ROUTE>) {
			state.edited_plan.routes = state.edited_plan.routes.filter((route) => (route.id !== action.payload.id));
			if (action.payload.created_user !== '') {
				state.deleted_routes.push(action.payload);
			}

			// 入山・下山日の更新
			state.edited_plan.entering_date = formattedDate(state.edited_plan.routes[0].plan_date);
			state.edited_plan.descending_date = formattedDate(state.edited_plan.routes[state.edited_plan.routes.length - 1].plan_date);
		},
		pushPlanRouteDetail(state, action: PayloadAction<PLAN_ROUTE_DETAIL>) {
			const details = state.edited_plan.routes.filter((r) => (r.id === action.payload.plan_route))[0].details;

			const pushingDetail: PLAN_ROUTE_DETAIL = {
				id: tempId(),
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan_route: action.payload.plan_route.length > 1 ? action.payload.plan_route : state.edited_plan.routes[state.edited_plan.routes.length - 1].id,
				name: '',
				is_staying: false,
				sort_index: details.length === 0 ? 1 : details[details.length - 1].sort_index + 1
			}
			state.edited_plan.routes.filter((r) => (r.id === action.payload.plan_route))[0].details.push(pushingDetail);
		},
		editPlanRouteDetail(state, action: PayloadAction<PLAN_ROUTE_DETAIL>) {
			const details = state.edited_plan.routes.filter((r) => (r.id === action.payload.plan_route))[0].details;
			state.edited_plan.routes.filter((r) => (r.id === action.payload.plan_route))[0].details = details.map((d) => (d.id === action.payload.id ? action.payload : d))
		},
		deletePlanRouteDetail(state, action: PayloadAction<DELETE_PLAN_ROUTE_DETAIL_REQUEST>) {
			const details = state.edited_plan.routes.filter((r) => (r.id === action.payload.detail.plan_route))[0].details;
			state.edited_plan.routes.filter((r) => (r.id === action.payload.detail.plan_route))[0].details = details.filter((d) => (d.id !== action.payload.detail.id));

			if (action.payload.detail.created_user !== '') {
				state.deleted_route_details.push({plan_id: action.payload.plan_id, detail: action.payload.detail});
			}
		},
		editPlanEscapeRoute(state, action: PayloadAction<PLAN_ESCAPE_ROUTE>) {
			state.edited_plan.escape = action.payload;
		},
		editPlanGear(state, action: PayloadAction<PLAN_GEAR>) {
			state.edited_plan.gear = action.payload;
		},
		pushPlanMember(state, action: PayloadAction<PLAN_MEMBER>) {
			const member = initialState.edited_plan.members[0];
			state.edited_plan.members.push({...member, id: tempId(), sort_index: action.payload.sort_index + 1});
		},
		editPlanMember(state, action: PayloadAction<PLAN_MEMBER>) {
			state.edited_plan.members = state.edited_plan.members.map((m) => (m.id === action.payload.id ? action.payload : m));
		},
		deletePlanMember(state, action: PayloadAction<PLAN_MEMBER>) {
			state.edited_plan.members = state.edited_plan.members.filter((m) => (m.id !== action.payload.id));

			if (action.payload.created_user !== '') {
				state.deleted_members.push(action.payload);
			}
		},
		initializePlanId(state) {
			state.edited_plan.id = '';
			state.edited_plan.is_submitted = false;
			state.edited_plan.submitted_date = null;
			return state;
		},
		editSubmittedDate(state) {
			if (!state.edited_plan.is_submitted) {
				// 提出
				state.edited_plan.is_submitted = true;
				state.edited_plan.submitted_date = formattedDate((new Date()).toString());
			} else {
				// 提出解除
				state.edited_plan.is_submitted = false;
				state.edited_plan.submitted_date = null;
			}
			return state;
		}
	},
	extraReducers: builder => {
		builder.addCase(
			fetchAsyncGetPlan.fulfilled,
			(state, action: PayloadAction<PLAN_RESULT>) => {
				const initialize = (plan: PLAN) => {
					plan.routes = initialState.edited_plan.routes;
					plan.escape = initialState.edited_plan.escape;
					plan.gear = initialState.edited_plan.gear;
					plan.members = initialState.edited_plan.members;
					return plan;
				}

				return {
					...state,
					plans: action.payload.results.map((p) => (initialize(p)))
				};
			}
		);
		builder.addCase(
			fetchAsyncGetPlanByPlanId.fulfilled,
			(state, action: PayloadAction<PLAN>) => {
				action.payload.routes = initialState.edited_plan.routes;
				action.payload.escape = initialState.edited_plan.escape;
				action.payload.gear = initialState.edited_plan.gear;
				action.payload.members = initialState.edited_plan.members;

				return {
					...state,
					edited_plan: action.payload
				}
			}
		);
		builder.addCase(
			fetchAsyncGetCopyPlanByPlanId.fulfilled,
			(state, action: PayloadAction<SEARCHED_PLAN>) => {
				const copy = action.payload;
				const newPlan: PLAN = {
					id: '',
					created_user: '',
					created_at: null,
					updated_user: '',
					updated_at: null,
					purpose_type: copy.purpose_type,
					purpose_type_name: null,
					prefecture: copy.prefecture,
					prefecture_name: null,
					mountain_first: copy.mountain_first,
					mountain_second: copy.mountain_second,
					mountain_third: copy.mountain_third,
					mountain_fourth: copy.mountain_fourth,
					mountain_fifth: copy.mountain_fifth,
					is_submitted: false,
					submitted_date: null,
					entering_date: copy.entering_date,
					descending_date: copy.descending_date,
					affiliate_group_name: '',
					affiliate_group_phone: '',
					has_trail_snacks: copy.has_trail_snacks,
					water_liters: copy.water_liters,
					food_times: copy.food_times,
					emergency_food_times: copy.emergency_food_times,
					routes: initialState.edited_plan.routes,
					escape: initialState.edited_plan.escape,
					gear: initialState.edited_plan.gear,
					members: initialState.edited_plan.members
				}

				return {
					...state,
					edited_plan: newPlan
				}
			}
		);
		builder.addCase(
			fetchAsyncPostPlan.fulfilled,
			(state, action: PayloadAction<PLAN>) => {
				return {
					...state,
					plans: [action.payload, ...state.plans],
					edited_plan: initialState.edited_plan
				}
			}
		);
		builder.addCase(
			fetchAsyncPostPlan.rejected,
			() => {
				// alert(fetchAsyncPostPlan.rejected);
			}
		);
		builder.addCase(
			fetchAsyncPutPlan.fulfilled,
			(state, action: PayloadAction<PLAN>) => {
				return {
					...state,
					plans: state.plans.map((plan) => (plan.id === action.payload.id ? action.payload : plan))
					// edited_plan: action.payload
				}
			}
		);
		builder.addCase(
			fetchAsyncDeletePlan.fulfilled,
			(state, action: PayloadAction<string>) => {
				return {
					...state,
					plans: state.plans.filter((plan) => (plan.id !== action.payload))
				}
			}
		);
		builder.addCase(
			fetchAsyncGetPlanRoute.fulfilled,
			(state, action: PayloadAction<PLAN_ROUTE[]>) => {
				action.payload.map((r) => (r.details = initialState.edited_plan.routes[0].details))
				const routes = action.payload.sort((a, b) => {
					const routeA = new Date(a.plan_date);
					const routeB = new Date(b.plan_date);
					if (routeA < routeB) return -1;
					if (routeA > routeB) return 1;
					return 0;
				});

				// plans
				for (const plan of state.plans) {
					if (plan.id === routes[0].plan) {
						plan.routes = routes;
					}
				}

				state.edited_plan.routes = routes;
				return state;
			}
		);
		builder.addCase(
			fetchAsyncGetPlanRouteDetail.fulfilled,
			(state, action: PayloadAction<PLAN_ROUTE_DETAIL[]>) => {
				const details = action.payload.sort((a, b) => {
					const detailA = a.sort_index;
					const detailB = b.sort_index;
					if (detailA < detailB) return -1;
					if (detailA > detailB) return 1;
					return 0;
				});

				// plans
				for (const plan of state.plans) {
					for (const route of plan.routes) {
						if (route.id === details[0].plan_route) {
							route.details = details;
						}
					}
				}

				state.edited_plan.routes.filter((r) => (r.id === action.payload[0].plan_route))[0].details = details;
				return state;
			}
		);
		builder.addCase(
			fetchAsyncGetPlanEscapeRoute.fulfilled,
			(state, action: PayloadAction<PLAN_ESCAPE_ROUTE>) => {
				const escapeRoute = action.payload;

				// plans
				for (const plan of state.plans) {
					if (plan.id === escapeRoute.plan) {
						plan.escape = escapeRoute;
					}
				}

				state.edited_plan.escape = escapeRoute;
				return state;
			}
		);
		builder.addCase(
			fetchAsyncGetPlanGear.fulfilled,
			(state, action: PayloadAction<PLAN_GEAR>) => {
				const gear = action.payload;

				// plans
				for (const plan of state.plans) {
					if (plan.id === gear.plan) {
						plan.gear = gear;
					}
				}

				state.edited_plan.gear = gear;
				return state;
			}
		);
		builder.addCase(
			fetchAsyncGetPlanMember.fulfilled,
			(state, action: PayloadAction<PLAN_MEMBER[]>) => {
				const members = action.payload.sort((a, b) => {
					const memberA = a.sort_index;
					const memberB = b.sort_index;
					if (memberA < memberB) return -1;
					if (memberA > memberB) return 1;
					return 0;
				});

				// plans
				for (const plan of state.plans) {
					if (plan.id === members[0].plan) {
						plan.members = members;
					}
				}

				state.edited_plan.members = members;
				return state;
			}
		);
		builder.addCase(
			fetchAsyncPatchPlanSubmit.fulfilled,
			(state, action: PayloadAction<PLAN>) => {
				// plans
				for (const plan of state.plans) {
					if (plan.id === action.payload.id) {
						plan.is_submitted = action.payload.is_submitted;
						plan.submitted_date = action.payload.submitted_date;
					}
				}
				return state;
			}
		)
	}
});

export const {
	search_params,
	editPlan,
	pushPlanRoute,
	editPlanRoute,
	deletePlanRoute,
	pushPlanRouteDetail,
	editPlanRouteDetail,
	deletePlanRouteDetail,
	editPlanEscapeRoute,
	editPlanGear,
	editPlanMember,
	pushPlanMember,
	deletePlanMember,
	initializePlanId,
	editSubmittedDate
} = planSlice.actions;

export const selectPlans = (state: RootState) => state.plan.plans;
export const selectSearchParams = (state: RootState) => state.plan.search_params;
export const selectEditedPlan = (state: RootState) => state.plan.edited_plan;
export const selectEditedPlanRoutes = (state: RootState) => state.plan.edited_plan.routes;
export const selectEditedPlanEscapeRoute = (state: RootState) => state.plan.edited_plan.escape;
export const selectEditedPlanGear = (state: RootState) => state.plan.edited_plan.gear;
export const selectEditedPlanMembers  =(state: RootState) => state.plan.edited_plan.members;
export const selectDeletedPlanRoutes = (state: RootState) => state.plan.deleted_routes;
export const selectDeletedPlanRouteDetails = (state: RootState) => state.plan.deleted_route_details;
export const selectDeletedPlanMembers = (state: RootState) => state.plan.deleted_members;

export default planSlice.reducer;
