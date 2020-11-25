export interface PROPS_AUTHENTICATION {
	isLoginView: boolean;
}

/* 認証 */
export interface AUTHENTICATION_USER {
	email: string;
	password: string;
}

export interface AUTH_SIMPLE_JWT {
	refresh: string;
	access: string;
}

/* ユーザ */
export interface LOGGED_IN_USER {
	id: string;
	email: string;
}

export interface POST_USER {
	id: string;
	emil: string;
	password: string;
}

/* ユーザ詳細 */
export interface USER_DETAIL {
	id: string;
	user: string;
	created_at: string;
	updated_at: string;
	profile_name: string;
	profile_image: string | null;
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
}

/* POST UserDetail */
export interface POST_USER_DETAIL {
	id: string;
	profile_name: string;
	profile_image: string | null;
	name: string;
	postal_code: string;
	prefecture: number;
	address: string;
	gender_type: number;
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
}

/* Friend */
export interface FRIEND {
	id: string;
	src_user: string;
	dest_user: string;
	created_at: string;
	updated_at: string;
	friend_request: string;
	detail: USER_DETAIL;
}

export interface FRIEND_RESULT {
	count: number;
	next: string | null;
	previous: string | null;
	results: FRIEND[];
}

/* State */
export interface USER_STATE {
	user: LOGGED_IN_USER;
	edited_user: POST_USER;
	user_detail: USER_DETAIL;
	edited_user_detail: POST_USER_DETAIL;
}

export interface FRIEND_STATE {
	friends: FRIEND[];
}