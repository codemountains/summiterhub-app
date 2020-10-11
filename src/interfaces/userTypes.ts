export interface AUTHENTICATION_USER {
	email: string;
	password: string;
}

export interface LOGIN_STATE {
	loginUser: AUTHENTICATION_USER;
	isKeepLoggedIn: boolean;
}
