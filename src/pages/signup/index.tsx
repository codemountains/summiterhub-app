import React from "react";
import Layout from "../../components/Layout";
import Auth from "../../features/authentication/Auth";

const indexSignUp: React.FC = () => {
	return (
		<Layout title="Join">
			<h1>
				Join SummiterHub
			</h1>
			<Auth isLoginView={false}/>
		</Layout>
	);
};

export default indexSignUp;
