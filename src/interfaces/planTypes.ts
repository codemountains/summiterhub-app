/* Plan 共通 */
export interface SEARCH_PARAMS {
	mountain: string;
	purpose_type: number;
}

/* Search */
export interface SEARCHED_PLAN {
	id: string;
	purpose_type: number;
	purpose_type_name: string;
	prefecture: number;
	prefecture_name: string;
	mountain_first: string;
	mountain_second: string;
	mountain_third: string;
	mountain_fourth: string;
	mountain_fifth: string;
	submitted_date: string | null;
	entering_date: string;
	descending_date: string;
	has_trail_snacks: boolean;
	water_liters: string;
	food_times: number | null;
	emergency_food_times: number | null;
}

export interface SEARCH_PLAN_STATE {
	searched_plans: SEARCHED_PLAN[];
	search_params: SEARCH_PARAMS;
	selected_searched_plan: SEARCHED_PLAN;
}

export interface SEARCH_PLAN_RESULT {
	count: number;
	next: string | null;
	previous: string | null;
	results: SEARCHED_PLAN[];
}

/* PlanRouteDetail */
export interface PLAN_ROUTE_DETAIL {
	id: string;
	created_user: string | null;
	created_at: string | null;
	updated_user: string | null;
	updated_at: string | null;
	plan_route: string;
	name: string;
	is_staying: boolean;
	sort_index: number;
}

export interface POST_PLAN_ROUTE_DETAIL_REQUEST {
	plan_id: string;
	detail: PLAN_ROUTE_DETAIL;
}

export interface DELETE_PLAN_ROUTE_DETAIL_REQUEST {
	plan_id: string;
	detail: PLAN_ROUTE_DETAIL;
}

/* PlanRoute */
export interface PLAN_ROUTE {
	id: string;
	created_user: string | null;
	created_at: string | null;
	updated_user: string | null;
	updated_at: string | null;
	plan: string;
	plan_date: string;
	details: PLAN_ROUTE_DETAIL[];
}

/* PlanEscapeRoute */
export interface PLAN_ESCAPE_ROUTE {
	id: string;
	created_user: string | null;
	created_at: string | null;
	updated_user: string | null;
	updated_at: string | null;
	plan: string;
	content: string;
}

/* PlanGear */
export interface PLAN_GEAR {
	id: string;
	created_user: string;
	created_at: string | null;
	updated_user: string;
	updated_at: string | null;
	plan: string;
	has_rain_wear: boolean;
	has_winter_clothing: boolean;
	has_map: boolean;
	has_compass: boolean;
	has_headlamp: boolean;
	has_mobile_phone: boolean;
	has_spare_battery: boolean;
	has_first_aid_kit: boolean;
	has_emergency_tent: boolean;
	has_transceiver: boolean;
	call_sign: string;
	has_radio: boolean;
	has_tent: boolean;
	has_sleeping_bag: boolean;
	has_stove: boolean;
	has_helmet: boolean;
	has_climbing_rope: boolean;
	has_climbing_gear: boolean;
	has_crampons: boolean;
	has_ice_axe: boolean;
	has_shovel: boolean;
	has_beacon: boolean;
	has_probe: boolean;
	has_snow_saw: boolean;
	has_riding_gear: boolean;
	riding_type: number | null;
	riding_type_name: string | null;
	gear: string | null;
}
/* PlanMember */
export interface PLAN_MEMBER {
	id: string;
	created_user: string | null;
	created_at: string | null;
	updated_user: string | null;
	updated_at: string | null;
	plan: string;
	user: string;
	name: string;
	postal_code: string;
	prefecture: number;
	prefecture_name: string;
	address: string;
	gender_type: number;
	gender_type_name: string;
	blood_type: number;
	blood_type_name: string;
	home_phone_number: string | null;
	cell_phone_number: string | null;
	emergency_contact_name: string;
	emergency_contact_phone: string;
	emergency_contact_email: string;
	insurance_name: string | null;
	insurance_number: string | null;
	hitococo_id: string | null;
	sort_index: number;
}

/* Plan */
export interface PLAN {
	id: string;
	created_user: string | null;
	created_at: string | null;
	updated_user: string | null;
	updated_at: string | null;
	purpose_type: number;
	purpose_type_name: string | null;
	prefecture: number;
	prefecture_name: string | null;
	mountain_first: string;
	mountain_second: string | null;
	mountain_third: string | null;
	mountain_fourth: string | null;
	mountain_fifth: string | null;
	is_submitted: boolean;
	submitted_date: string | null;
	entering_date: string;
	descending_date: string;
	affiliate_group_name: string | null;
	affiliate_group_phone: string | null;
	has_trail_snacks: boolean;
	water_liters: string;
	food_times: number | null;
	emergency_food_times: number | null;
	routes: PLAN_ROUTE[];
	escape: PLAN_ESCAPE_ROUTE;
	gear: PLAN_GEAR;
	members: PLAN_MEMBER[];
}

export interface PLAN_STATE {
	plans: PLAN[];
	search_params: SEARCH_PARAMS;
	edited_plan: PLAN;
	deleted_routes: PLAN_ROUTE[];
	deleted_route_details: DELETE_PLAN_ROUTE_DETAIL_REQUEST[];
	deleted_members: PLAN_MEMBER[];
}

export interface PLAN_RESULT {
	count: number;
	next: string | null;
	previous: string | null;
	results: PLAN[];
}

export interface PLAN_SUBMIT_REQUEST {
	id: string;
	is_submitted: boolean;
	submitted_date: string | null;
}

// export interface DELETE_PLAN_ROUTE_DETAIL_ACTION {
// 	route_id: string;
// 	detail_id: string;
// }
