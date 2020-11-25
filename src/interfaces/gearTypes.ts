export interface GEAR {
	id: string;
	user: string;
	created_at: string;
	updated_at: string;
	title: string;
	purpose_type: number;
	purpose_type_name: string;
	remarks: string;
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
}

export interface POST_GEAR {
	id: string;
	title: string;
	purpose_type: number;
	remarks: string;
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
}

export interface CUSTOM_GEAR {
	id: string;
	user: string;
	created_at: string;
	updated_at: string;
	gear: string;
	name: string;
	sort_index: number;
}

export interface POST_CUSTOM_GEAR {
	name: string;
	sort_index: number;
}

export interface POST_CUSTOM_GEAR_REQUEST {
	gear_id: string;
	custom_gear: POST_CUSTOM_GEAR;
}

export interface GEAR_STATE {
	gears: GEAR[];
	edited_gear: POST_GEAR;
	custom_gears: CUSTOM_GEAR[];
	edited_custom_gear: POST_CUSTOM_GEAR;
}

export interface GEAR_RESULT {
	count: number;
	next: string | null;
	previous: string | null;
	results: GEAR[];
}
