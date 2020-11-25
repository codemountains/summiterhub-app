import React from 'react';
import Layout from "../../components/Layout";
import PlanEdit from "../../features/plan/PlanEdit";
import {useRouter} from "next/router";

const Copy: React.FC = () => {
	const router = useRouter();
	const {id} = router.query;

	return (
		<Layout title="Plan">
			<PlanEdit id={String(id)} isCreate={true}/>
		</Layout>
	);
};

export default Copy;
