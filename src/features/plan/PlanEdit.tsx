import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, List, ListItem} from "@material-ui/core";
import {AppDispatch} from "../../app/store";
import {
	editPlan,
	editPlanEscapeRoute,
	fetchAsyncDeletePlanMember,
	fetchAsyncDeletePlanRoute,
	fetchAsyncDeletePlanRouteDetail,
	fetchAsyncGetPlanByPlanId,
	fetchAsyncGetPlanEscapeRoute,
	fetchAsyncGetPlanGear,
	fetchAsyncGetPlanMember,
	fetchAsyncGetPlanRoute,
	fetchAsyncGetPlanRouteDetail,
	fetchAsyncPostPlan,
	fetchAsyncPostPlanEscapeRoute,
	fetchAsyncPostPlanGear,
	fetchAsyncPostPlanMember,
	fetchAsyncPostPlanRoute,
	fetchAsyncPostPlanRouteDetail,
	fetchAsyncPutPlan,
	fetchAsyncPutPlanEscapeRoute,
	fetchAsyncPutPlanGear,
	fetchAsyncPutPlanMember,
	fetchAsyncPutPlanRoute,
	fetchAsyncPutPlanRouteDetail,
	formattedDate,
	initialState,
	selectDeletedPlanMembers,
	selectDeletedPlanRouteDetails,
	selectDeletedPlanRoutes,
	selectEditedPlan,
	fetchAsyncGetCopyPlanByPlanId, editPlanMember, selectEditedPlanMembers, fetchAsyncDeletePlan
} from "./planSlice";
import {
	PLAN,
	PLAN_ESCAPE_ROUTE, PLAN_MEMBER
} from '../../interfaces/planTypes';
import {prefectures, purposeTypes} from "../../utils/selectItems";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import 'date-fns';
import PlanEditRoute from "./PlanEditRoute";
import Container from "@material-ui/core/Container";
import {useRouter} from "next/router";
import PlanEditGear from "./PlanEditGear";
import PlanEditMember from "./PlanEditMember";
import {fetchAsyncGetUserDetail} from "../authentication/authSlice";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		button: {
			marginRight: theme.spacing(1),
		},
		backButton: {
			marginRight: theme.spacing(1),
		},
		completed: {
			display: 'inline-block',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		purposeType: {
			width: '256px',
		},
		buttonContainer: {
			margin: theme.spacing(1),
		},
		deletePlanButton: {
			color: theme.palette.error.main
		}
	}),
);

const getSteps = () => {
	return [
		'登山情報を入力',
		'メンバー情報を入力',
		'装備情報を入力'
	];
}

const getStepContent = (step: number) => {
	switch (step) {
		case 0:
			return '登山目的、主な山名、入山・下山日を入力してください。';
		case 1:
			return 'メンバーを入力してください。';
		case 2:
			return '装備を入力してください';
		default:
			return 'Unknown step';
	}
}

type PLAN_EDIT_PROPS = {
	id: string | null;
	isCreate: boolean;
}

// 電話番号はどちら必須
const isInputtedPhoneNumber = (member: PLAN_MEMBER) => {
	if (member.home_phone_number && member.home_phone_number.length > 0) {
		return true;
	}
	return !!(member.cell_phone_number && member.cell_phone_number.length > 0);
}

// 有効な数字か
const isValidatedNumber = (target: string | null) => {
	if (!target) {
		return false;
	} else {
		const number = Number(target);
		return number >= 0;
	}
}

// バリデーション
export const isValidated = (plan: PLAN) => {
	// plan
	if (plan.mountain_first.length === 0) {
		return false;
	}
	if (plan.entering_date.length === 0) {
		return false;
	}
	if (plan.descending_date.length === 0) {
		return false;
	}
	if (!isValidatedNumber(plan.water_liters)) {
		return false;
	}
	if (!isValidatedNumber(String(plan.food_times))) {
		return false;
	}
	if (!isValidatedNumber(String(plan.emergency_food_times))) {
		return false;
	}

	// routes
	for (const route of plan.routes) {
		if (route.plan_date.length === 0) {
			return false
		}

		// details
		for (const detail of route.details) {
			if (detail.name.length === 0) {
				return false;
			}
		}
	}

	// members
	for (const member of plan.members) {
		if (
			member.name.length === 0
			|| member.postal_code.length === 0
			|| member.address.length === 0
			|| member.emergency_contact_name.length === 0
			|| member.emergency_contact_phone.length === 0
		) {
			return false;
		}
		if (!isInputtedPhoneNumber(member)) {
			return false;
		}
	}

	// OK
	return true;
}

const PlanEdit: React.FC<PLAN_EDIT_PROPS> = ({id, isCreate}: PLAN_EDIT_PROPS) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const plan = useSelector(selectEditedPlan);
	const members = useSelector(selectEditedPlanMembers);
	const deletedRoutes = useSelector(selectDeletedPlanRoutes);
	const deletedDetails = useSelector(selectDeletedPlanRouteDetails);
	const deleteMembers = useSelector(selectDeletedPlanMembers);

	const router = useRouter();

	useEffect(() => {
		if (id) {
			const planId = String(id);
			const getPlan = async () => {
				if (!isCreate) {
					// 編集
					const getPlanResult = await dispatch(fetchAsyncGetPlanByPlanId(planId));
					if (fetchAsyncGetPlanByPlanId.fulfilled.match(getPlanResult)) {
						await dispatch(fetchAsyncGetPlanEscapeRoute(planId));
						const getRouteResult = await dispatch(fetchAsyncGetPlanRoute(planId));
						if (fetchAsyncGetPlanRoute.fulfilled.match(getRouteResult)) {
							for (const route of getRouteResult.payload) {
								await dispatch(fetchAsyncGetPlanRouteDetail(route));
							}
						}
						await dispatch(fetchAsyncGetPlanGear(planId));
						await dispatch(fetchAsyncGetPlanMember(planId));
					}
				} else {
					// 複製による新規作成
					const searchResult = await dispatch(fetchAsyncGetCopyPlanByPlanId(planId));
					if (fetchAsyncGetCopyPlanByPlanId.fulfilled.match(searchResult)) {
						await dispatch(fetchAsyncGetPlanEscapeRoute(planId));
						const getRouteResult = await dispatch(fetchAsyncGetPlanRoute(planId));
						if (fetchAsyncGetPlanRoute.fulfilled.match(getRouteResult)) {
							for (const route of getRouteResult.payload) {
								await dispatch(fetchAsyncGetPlanRouteDetail(route));
							}
						}
					}
				}
			};
			getPlan().then().catch();
		} else {
			const initializePlan = async () => {
				await dispatch(editPlan(initialState.edited_plan));
			}
			initializePlan().then().catch();
		}

		if (isCreate) {
			const initializeMember = async () => {
				const getUserDetailResult = await dispatch(fetchAsyncGetUserDetail());
				if (fetchAsyncGetUserDetail.fulfilled.match(getUserDetailResult)) {
					const userDetail = getUserDetailResult.payload;
					await dispatch(editPlanMember({
						id: members[0].id,
						created_user: '',
						created_at: null,
						updated_user: '',
						updated_at: null,
						plan: '',
						user: userDetail.user,
						name: userDetail.name,
						postal_code: userDetail.postal_code,
						prefecture: userDetail.prefecture,
						prefecture_name: '',
						address: userDetail.address,
						gender_type: userDetail.gender_type,
						gender_type_name: '',
						blood_type: userDetail.blood_type,
						blood_type_name: '',
						home_phone_number: userDetail.home_phone_number,
						cell_phone_number: userDetail.cell_phone_number,
						emergency_contact_name: userDetail.emergency_contact_name,
						emergency_contact_phone: userDetail.emergency_contact_phone,
						emergency_contact_email: userDetail.emergency_contact_email,
						insurance_name: userDetail.insurance_name,
						insurance_number: userDetail.insurance_number,
						hitococo_id: userDetail.hitococo_id,
						sort_index: 1
					}));
				}
			}
			initializeMember().then().catch();
		}
	}, [dispatch, id, isCreate]);

	const [activeStep, setActiveStep] = React.useState(0);
	// const [completed, setCompleted] = React.useState(new Set<number>());
	const steps = getSteps();

	// const totalSteps = () => {
	// 	return getSteps().length;
	// };

	// const completedSteps = () => {
	// 	return completed.size;
	// };
	//
	// const allStepsCompleted = () => {
	// 	return completedSteps() === totalSteps();
	// };
	//
	// const isLastStep = () => {
	// 	return activeStep === totalSteps() - 1;
	// };

	// const handleNext = () => {
	// 	const newActiveStep =
	// 		isLastStep() && !allStepsCompleted()
	// 			? // It's the last step, but not all steps have been completed
	// 			  // find the first step that has been completed
	// 			steps.findIndex((_step, i) => !completed.has(i))
	// 			: activeStep + 1;
	//
	// 	setActiveStep(newActiveStep);
	// };

	// const handleBack = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	// const handleComplete = () => {
	// 	const newCompleted = new Set(completed);
	// 	newCompleted.add(activeStep);
	// 	setCompleted(newCompleted);
	// 	if (completed.size !== totalSteps()) {
	// 		handleNext();
	// 	}
	// };

	// const handleReset = () => {
	// 	setActiveStep(0);
	// 	setCompleted(new Set<number>());
	// };

	// function isStepComplete(step: number) {
	// 	return completed.has(step);
	// }

	const handlePurposeTypeChange = (event: React.ChangeEvent<{value: unknown}>) => {
		const value: number = Number(event.target.value);
		const name: string = 'purpose_type';
		dispatch(editPlan({...plan, [name]: value}));
	};

	const handlePrefectureChange = (event: React.ChangeEvent<{value: unknown}>) => {
		const value: number = Number(event.target.value);
		const name: string = 'prefecture';
		dispatch(editPlan({...plan, [name]: value}));
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string  = event.target.value;
		const name: string = event.target.name;
		dispatch(editPlan({...plan, [name]: value}));
	};

	const handleEscapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string  = event.target.value;
		const name: string = 'content';

		const escape = plan.escape;
		const newEscape: PLAN_ESCAPE_ROUTE = {...escape, [name]: value};

		dispatch(editPlanEscapeRoute(newEscape));
	};

	// 削除
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const handleDelete = () => {
		setOpenDeleteDialog(true);
	};
	const handleDeleteCancel = () => {
		setOpenDeleteDialog(false);
	};

	const handleDeleteConfirm = () => {
		setOpenDeleteDialog(false);
		const deletePlan = async () => {
			await dispatch(fetchAsyncDeletePlan(plan.id));
		}
		deletePlan().then().catch();
	};

	// エラー
	const [openErrorDialog, setOpenErrorDialog] = useState(false);
	const handleErrorCancel = () => {
		setOpenErrorDialog(false);
	}

	// 計画作成: POST
	const createPlan = async (isSubmit: boolean) => {
		const planPostResult = await dispatch(fetchAsyncPostPlan({
			...plan,
			is_submitted: isSubmit ? !plan.is_submitted : plan.is_submitted,
			submitted_date: isSubmit ? (!plan.is_submitted ? formattedDate((new Date()).toString()) : null ) : plan.submitted_date
		}));
		if (fetchAsyncPostPlan.fulfilled.match(planPostResult)) {
			const planId = planPostResult.payload.id;

			// ルート・ルート詳細を登録
			for (const route of plan.routes) {
				const createRouteResult = await dispatch(fetchAsyncPostPlanRoute({...route, plan: planId}));
				if (fetchAsyncPostPlanRoute.fulfilled.match(createRouteResult)) {
					const routeId = createRouteResult.payload.id;
					for (const detail of route.details) {
						await dispatch(fetchAsyncPostPlanRouteDetail({plan_id: planId, detail: {...detail, plan_route: routeId}}));
					}
				}
			}

			// エスケープルートを登録
			const escape = plan.escape;
			await dispatch(fetchAsyncPostPlanEscapeRoute({...escape, plan: planId}));

			// 装備を登録
			const gear = plan.gear;
			await dispatch(fetchAsyncPostPlanGear({...gear, plan: planId}));

			// メンバーを登録
			for (const member of plan.members) {
				await dispatch(fetchAsyncPostPlanMember({...member, plan: planId}));
			}
		}
	}

	// 計画更新: PUT
	const updatePlan = async (isSubmit: boolean) => {
		const planPutResult = await dispatch(fetchAsyncPutPlan({
			...plan,
			is_submitted: isSubmit ? !plan.is_submitted : plan.is_submitted,
			submitted_date: isSubmit ? (!plan.is_submitted ? formattedDate((new Date()).toString()) : null ) : plan.submitted_date
		}));
		if (fetchAsyncPutPlan.fulfilled.match(planPutResult)) {
			const planId = planPutResult.payload.id;

			// ルート・ルート詳細を登録
			for (const route of plan.routes) {
				const details = route.details;

				if (route.created_user !== '') {
					// 更新
					const updateRouteResult = await dispatch(fetchAsyncPutPlanRoute(route));
					if (fetchAsyncPutPlanRoute.fulfilled.match(updateRouteResult)) {
						const routeId = updateRouteResult.payload.id;
						for (const detail of details) {
							if (detail.created_user !== '') {
								// ルート詳細の更新
								await dispatch(fetchAsyncPutPlanRouteDetail({plan_id: planId, detail: detail}));
							} else {
								// ルート詳細の登録
								await dispatch(fetchAsyncPostPlanRouteDetail({plan_id: planId, detail: {...detail, plan_route: routeId}}));
							}
						}
					}
				} else {
					// 登録
					const createRouteResult = await dispatch(fetchAsyncPostPlanRoute({...route, plan: planId}));
					if (fetchAsyncPostPlanRoute.fulfilled.match(createRouteResult)) {
						const routeId = createRouteResult.payload.id;
						for (const detail of details) {
							await dispatch(fetchAsyncPostPlanRouteDetail({plan_id: planId, detail: {...detail, plan_route: routeId}}));
						}
					}
				}
			}

			// エスケープルートを更新
			const escape = plan.escape;
			await dispatch(fetchAsyncPutPlanEscapeRoute({...escape, plan: planId}));

			// 装備を更新
			const gear = plan.gear;
			await dispatch(fetchAsyncPutPlanGear({...gear, plan: planId}));

			// メンバーを更新
			for (const member of plan.members) {
				if (member.created_user !== '') {
					// 更新
					await dispatch(fetchAsyncPutPlanMember({...member, plan: planId}));
				} else {
					// 登録（新規のメンバー）
					await dispatch(fetchAsyncPostPlanMember({...member, plan: planId}));
				}
			}

			// 削除したルート詳細をDBから削除
			for (const deleteDetail of deletedDetails) {
				await dispatch(fetchAsyncDeletePlanRouteDetail(deleteDetail))
			}

			// 削除したルートをDBから削除
			for (const deleteRoute of deletedRoutes) {
				await dispatch(fetchAsyncDeletePlanRoute(deleteRoute));
			}

			// 削除したメンバーをDBから削除
			for (const deleteMember of deleteMembers) {
				await dispatch(fetchAsyncDeletePlanMember(deleteMember));
			}
		}
	}

	// 保存する
	const handleSave = () => {
		if(!isValidated(plan)) {
			setOpenErrorDialog(true);
			return;
		}

		if (plan.id) {
			// 更新
			updatePlan(false).then().catch();
			router.push('/plans').then().catch();
		} else {
			// 新規作成
			createPlan(false).then().catch();
			router.push('/plans').then().catch();
		}
	};

	// 提出・提出解除
	const handleSubmit = () => {
		if(!isValidated(plan)) {
			setOpenErrorDialog(true);
			return;
		}

		if (plan.id) {
			// 更新
			updatePlan(true).then().catch();
			router.push('/plans').then().catch();
		} else {
			// 新規作成
			createPlan(true).then().catch();
			router.push('/plans').then().catch();
		}
	}

	return (
		<div>
			<Container maxWidth='lg'>
				<div className={classes.root}>
					<Stepper nonLinear activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							const buttonProps: { optional?: React.ReactNode } = {};
							return (
								<Step key={label} {...stepProps}>
									<StepButton
										onClick={handleStep(index)}
										// completed={isStepComplete(index)}
										{...buttonProps}
									>
										{label}
									</StepButton>
								</Step>
							);
						})}
					</Stepper>
					<div className={classes.buttonContainer}>
						<Grid container direction='row' justify='flex-end' alignItems='center' spacing={1}>
							<Grid item xs={9}>
								<Typography className={classes.instructions}>
									{getStepContent(activeStep)}
								</Typography>
							</Grid>
							{isCreate && (<Grid item xs={1}/>)}
							<Grid item xs={1}>
								<Button
									variant='outlined'
									color='primary'
									onClick={handleSave}
									// disabled={!isValidated(plan)}
									fullWidth
								>
									保存する
								</Button>
							</Grid>
							<Grid item xs={1}>
								<Button
									variant='contained'
									color='primary'
									onClick={handleSubmit}
									// disabled={!isValidated(plan)}
									fullWidth
								>
									{plan.is_submitted ? '提出解除' : '提出する'}
								</Button>
							</Grid>
							{!isCreate && (
								<Grid item xs={1}>
									<Button
										variant='text'
										// color='primary'
										className={classes.deletePlanButton}
										onClick={handleDelete}
										// disabled={!isValidated(plan)}
										fullWidth
									>
										削除する
									</Button>
								</Grid>
							)}
						</Grid>
					</div>
					<div>
						{
							// 基本情報
							activeStep === 0
							&&
							<div>
								<List>
									<ListItem>
										<Grid container spacing={2}>
											<Grid item xs={3}>
												<FormControl variant="outlined" size='small' fullWidth>
													<InputLabel id="purpose-type-select-label">カテゴリー</InputLabel>
													<Select
														labelId="purpose-type-select-label"
														value={plan.purpose_type}
														onChange={handlePurposeTypeChange}
														label='カテゴリー'
													>
														{purposeTypes.map((type) => (
															<MenuItem value={type.id} key={type.id}>{type.name}</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={3}>
												<FormControl variant="outlined" size='small' fullWidth>
													<InputLabel id="prefecture-select-label">都道府県</InputLabel>
													<Select
														labelId="prefecture-select-label"
														value={plan.prefecture}
														onChange={handlePrefectureChange}
														label='都道府県'
													>
														{prefectures.map((prefecture) => (
															<MenuItem value={prefecture.id} key={prefecture.id}>{prefecture.name}</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<TextField
													fullWidth
													size='medium'
													variant="outlined"
													label="目的の山名・山域　[必須]"
													name='mountain_first'
													type='text'
													value={plan.mountain_first}
													placeholder='目的の山名・山域を入力'
													onChange={handleInputChange}
													error={plan.mountain_first.length < 1}
													helperText={(plan.mountain_first.length < 1) && '必須項目です'}
												/>
											</Grid>
										</Grid>
									</ListItem>
									<Divider/>
									<Typography>
										目的の山名・山域を最大で5つまで追加できます　[任意]
									</Typography>
									<ListItem>
										<Grid container spacing={2}>
											<Grid item xs={3}>
												<TextField
													fullWidth
													size='small'
													variant="outlined"
													name='mountain_second'
													type='text'
													value={plan.mountain_second}
													placeholder='目的の山名・山域を入力'
													onChange={handleInputChange}
												/>
											</Grid>
											<Grid item xs={3}>
												<TextField
													fullWidth
													size='small'
													variant="outlined"
													name='mountain_third'
													type='text'
													value={plan.mountain_third}
													placeholder='目的の山名・山域を入力'
													onChange={handleInputChange}
												/>
											</Grid>
											<Grid item xs={3}>
												<TextField
													fullWidth
													size='small'
													variant="outlined"
													name='mountain_fourth'
													type='text'
													value={plan.mountain_fourth}
													placeholder='目的の山名・山域を入力'
													onChange={handleInputChange}
												/>
											</Grid>
											<Grid item xs={3}>
												<TextField
													fullWidth
													size='small'
													variant="outlined"
													name='mountain_fifth'
													type='text'
													value={plan.mountain_fifth}
													placeholder='目的の山名・山域を入力'
													onChange={handleInputChange}
												/>
											</Grid>
										</Grid>
									</ListItem>
									<Divider/>
									<Typography>
										ルート詳細
									</Typography>
									<ListItem>
										<Grid container spacing={1}>
											<Grid item xs={12}>
												{/*<PlanEditRoute/>*/}
												{plan.routes && plan.routes.map((route, index) => (
													<PlanEditRoute route={route} index={index} key={route.id}/>
												))}
											</Grid>
										</Grid>
									</ListItem>
									<Divider/>
									<Typography>
										エスケープルート
									</Typography>
									<ListItem>
										<Grid container spacing={1}>
											<Grid item xs={12}>
												<TextField
													fullWidth
													multiline
													rows={4}
													size='small'
													variant="outlined"
													name='mountain_third'
													type='text'
													value={plan.escape && plan.escape.content}
													placeholder='エスケープルートを入力'
													onChange={handleEscapeChange}
												/>
											</Grid>
										</Grid>
									</ListItem>
								</List>
							</div>
						}
						{
							// メンバー
							activeStep === 1
							&&
							<PlanEditMember isCreate={isCreate}/>
						}
						{
							// 装備
							activeStep === 2
							&&
							<PlanEditGear/>
						}

						{/*{allStepsCompleted() ? (*/}
						{/*	<div>*/}
						{/*		<Typography className={classes.instructions}>*/}
						{/*			All steps completed - you&apos;re finished*/}
						{/*		</Typography>*/}
						{/*		<Button onClick={handleReset}>Reset</Button>*/}
						{/*	</div>*/}
						{/*) : (*/}
						{/*	<div>*/}
						{/*		<div>*/}
						{/*			<Button*/}
						{/*				disabled={activeStep === 0}*/}
						{/*				onClick={handleBack}*/}
						{/*				className={classes.button}*/}
						{/*			>*/}
						{/*				Back*/}
						{/*			</Button>*/}
						{/*			<Button*/}
						{/*				variant="contained"*/}
						{/*				color="primary"*/}
						{/*				onClick={handleNext}*/}
						{/*				className={classes.button}*/}
						{/*			>*/}
						{/*				Next*/}
						{/*			</Button>*/}
						{/*			{activeStep !== steps.length &&*/}
						{/*			(completed.has(activeStep) ? (*/}
						{/*				<Typography variant="caption" className={classes.completed}>*/}
						{/*					Step {activeStep + 1} already completed*/}
						{/*				</Typography>*/}
						{/*			) : (*/}
						{/*				<Button variant="contained" color="primary" onClick={handleComplete}>*/}
						{/*					{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}*/}
						{/*				</Button>*/}
						{/*			))}*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*)}*/}
					</div>
				</div>
			</Container>
			{/* 削除確認ダイアログ */}
			<Dialog
				open={openDeleteDialog}
				onClose={handleDeleteCancel}
				maxWidth='sm'
				fullWidth
				aria-labelledby="gear-delete-dialog-title"
				aria-describedby="gear-delete-dialog-description"
			>
				<DialogTitle id="gear-delete-dialog-title">確認</DialogTitle>
				<DialogContent>
					<DialogContentText id="gear-delete-dialog-description">
						この登山計画を削除します。
						<br/>
						この操作は取り消せません。
					</DialogContentText>
				</DialogContent>
				<Divider/>
				<DialogActions>
					<Button onClick={handleDeleteCancel} color="secondary" variant='text'>
						キャンセル
					</Button>
					<Button onClick={handleDeleteConfirm} color="primary" variant='text'>
						削除する
					</Button>
				</DialogActions>
			</Dialog>

			{/* 削除確認ダイアログ */}
			<Dialog
				open={openErrorDialog}
				onClose={handleErrorCancel}
				maxWidth='sm'
				fullWidth
				aria-labelledby="gear-delete-dialog-title"
				aria-describedby="gear-delete-dialog-description"
			>
				<DialogTitle id="gear-delete-dialog-title">確認</DialogTitle>
				<DialogContent>
					<DialogContentText id="gear-delete-dialog-description">
						この登山計画の入力に不備があります。
						<br/>
						確認してください。
					</DialogContentText>
				</DialogContent>
				<Divider/>
				<DialogActions>
					<Button onClick={handleErrorCancel} color="primary" variant='text'>
						閉じる
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PlanEdit;
