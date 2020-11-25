import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {AppDispatch} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {
	editPlanRoute,
	pushPlanRoute,
	pushPlanRouteDetail,
	deletePlanRoute,
	editPlanRouteDetail,
	deletePlanRouteDetail,
	selectEditedPlanRoutes
} from "./planSlice";
import {
	DELETE_PLAN_ROUTE_DETAIL_REQUEST,
	PLAN_ROUTE,
	PLAN_ROUTE_DETAIL
} from "../../interfaces/planTypes";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Button from "@material-ui/core/Button";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';

interface PROPS {
	route: PLAN_ROUTE;
	index: number;
}

const PlanEditRoute: React.FC<PROPS> = ({route, index}: PROPS) => {
	const dispatch: AppDispatch = useDispatch();
	const routes = useSelector(selectEditedPlanRoutes);

	// 日付更新
	const handlePlanDateChange = (date: Date | null) => {
		// const route: PLAN_ROUTE = routes.filter((r) => (r.id === routeId))[0];

		const name: string = 'plan_date';
		dispatch(editPlanRoute({...route, [name]: date}));
	};

	// ルート詳細更新
	const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>, detail: PLAN_ROUTE_DETAIL) => {
		const value: string = event.target.value;
		const name: string = event.target.name

		dispatch(editPlanRouteDetail({...detail, [name]: value}));
	};

	// 日付追加
	const handleAddDate = (route: PLAN_ROUTE) => {
		dispatch(pushPlanRoute({...route}));
	};

	// 日付削除
	const handleDeleteDate = (route: PLAN_ROUTE) => {
		dispatch(deletePlanRoute(route));
		// if (route.created_user !== '') {
		// 	dispatch(deletePlanRoute(route));
		// }
	}

	// ルート詳細削除
	const handleDeleteDetail = (planId: string, detail: PLAN_ROUTE_DETAIL) => {
		const deleteRequest: DELETE_PLAN_ROUTE_DETAIL_REQUEST = {
			plan_id: planId,
			detail: detail
		}
		dispatch(deletePlanRouteDetail(deleteRequest));
		// if (detail.created_user !== '') {
		// 	const deleteRequest: DELETE_PLAN_ROUTE_DETAIL_REQUEST = {
		// 		plan_id: planId,
		// 		detail: detail
		// 	}
		// 	dispatch(deletePlanRouteDetail(deleteRequest));
		// }
	}

	return (
		<Grid container spacing={1} key={index}>
			<Grid item xs={3}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<DatePicker
						autoOk
						disableToolbar
						variant="inline"
						format="yyyy/MM/dd"
						margin="normal"
						size='small'
						fullWidth
						label={'DAY ' + (index + 1)}
						placeholder='日付を選択'
						value={route && route.plan_date}
						onChange={handlePlanDateChange}
						invalidDateMessage={'日付の形式で入力してください'}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item xs={1}>
				{routes.length > 1 && (
					<IconButton aria-label="delete" onClick={() => (handleDeleteDate(route))}>
						<DeleteIcon/>
					</IconButton>
				)}
			</Grid>
			<Grid item xs={8}/>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					{route.details && route.details.map((detail, index) => (
						<Grid item xs={3} key={index}>
							<TextField
								size='small'
								variant="outlined"
								name='name'
								type='text'
								value={detail.name}
								placeholder='ルートを入力'
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleDetailChange(event, detail))}
								error={detail.name.length < 1}
								helperText={(detail.name.length < 1) && '必須項目です'}
							/>
							{index !== route.details.length - 1 && (
								<IconButton aria-label="delete" onClick={() => (handleDeleteDetail(route.plan, detail))}>
									<DeleteIcon/>
								</IconButton>
							)}
							<ArrowForwardRoundedIcon/>
							{index === route.details.length - 1 && (
								<IconButton aria-label='ルート追加' onClick={() => {
									dispatch(pushPlanRouteDetail({...detail}))
								}}>
									<AddCircleRoundedIcon/>
								</IconButton>
							)}
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item xs={12}>
				{index === routes.length - 1 && (
					<Button
						fullWidth
						variant='outlined'
						color='primary'
						startIcon={<AddRoundedIcon/>}
						onClick={() => handleAddDate(route)}
					>
						日程を追加する
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default PlanEditRoute;
