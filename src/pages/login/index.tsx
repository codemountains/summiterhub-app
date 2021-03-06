import React from "react";
import Auth from "../../features/authentication/Auth";
import Head from "next/head";

const IndexLogin: React.FC = () => {
	return (
		<div>
			<Head>
				<title>Login: SummiterHub</title>
				<meta charSet="utf-8"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
			</Head>
			<Auth isLoginView={true}/>
		</div>
	);
};

export default IndexLogin;
