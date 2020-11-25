import React from 'react';
import Layout from "../../components/Layout";
import PlanRead from "../../features/plan/PlanRead";

const IdPlans: React.FC = () => {
	return (
		<Layout title='Plan'>
			<PlanRead fromSearch={false}/>
		</Layout>
	);
};

export default IdPlans;
