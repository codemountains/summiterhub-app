import React from 'react';
import Layout from "../../components/Layout";
import PlanRead from "../../features/plan/PlanRead";

const IdSearch: React.FC = () => {
	return (
		<Layout title='Search'>
			<PlanRead fromSearch={true}/>
		</Layout>
	);
};

export default IdSearch;
