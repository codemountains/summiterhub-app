import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import Container from "@material-ui/core/Container";
import {
	fetchAsyncGetPlan,
	fetchAsyncGetPlanMember,
	fetchAsyncGetPlanRoute,
	fetchAsyncGetPlanRouteDetail,
	selectPlans
} from "./planSlice";
import PlanItem from "./PlanItem";
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useRouter } from 'next/router';

const PlanList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const plans = useSelector(selectPlans);

	useEffect(() => {
		const getPlans = async () => {
			const getPlanResult = await dispatch(fetchAsyncGetPlan());
			if (fetchAsyncGetPlan.fulfilled.match(getPlanResult)) {
				for (const plan of getPlanResult.payload.results) {
					const getRouteResult = await dispatch(fetchAsyncGetPlanRoute(plan.id));
					if (fetchAsyncGetPlanRoute.fulfilled.match(getRouteResult)) {
						for (const route of getRouteResult.payload) {
							await dispatch(fetchAsyncGetPlanRouteDetail(route));
						}
					}
					await dispatch(fetchAsyncGetPlanMember(plan.id));
				}
			}
		};
		getPlans().then().catch();
	}, [dispatch]);

	const router = useRouter()
	const handleCreate = () => {
		router.push('/plans/create').then().catch();
	};

	return (
		<div>
			<Container maxWidth='lg'>
				<Grid container spacing={4}>
					<Grid item xs={3}>
						<Button
							fullWidth
							variant='outlined'
							color='primary'
							startIcon={<AddRoundedIcon/>}
							onClick={handleCreate}
						>
							新規作成
						</Button>
						{/*<List component='nav'>*/}
						{/*	<ListItem button>*/}
						{/*		<ListItemText primary='すベて'/>*/}
						{/*	</ListItem>*/}
						{/*	<ListItem button>*/}
						{/*		<ListItemText primary='作成中'/>*/}
						{/*	</ListItem>*/}
						{/*	<ListItem button>*/}
						{/*		<ListItemText primary='提出済み'/>*/}
						{/*	</ListItem>*/}
						{/*	<ListItem button>*/}
						{/*		<ListItemText primary='下山完了'/>*/}
						{/*	</ListItem>*/}
						{/*</List>*/}
					</Grid>
					<Grid item xs={9}>
						<Grid container spacing={2}>
							{plans.map((plan) => (
								<Grid key={plan.id} item spacing={2} xs={12} md={6}>
									<PlanItem plan={plan}/>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default PlanList;
