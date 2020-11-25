import React from 'react';
import Layout from "../../components/Layout";
import PlanEdit from "../../features/plan/PlanEdit";

const Create: React.FC = () => {
	return (
		<Layout title='Plan'>
			<PlanEdit id={null} isCreate={true}/>
		</Layout>
	);
};

export default Create;
