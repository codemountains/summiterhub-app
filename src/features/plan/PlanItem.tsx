import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Grid} from "@material-ui/core";
import {PLAN, PLAN_SUBMIT_REQUEST} from "../../interfaces/planTypes";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {useRouter} from 'next/router';
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {fetchAsyncDeletePlan, fetchAsyncPatchPlanSubmit, formattedDate} from "./planSlice";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

const useStyles = makeStyles({
	mainCard: {
		minWidth: 275,
	},
	purposeType: {
		display: 'flex',
		alignItems: 'center',
	},
	statusContainer: {
		textAlign: 'right',
	},
	status: {
		padding: '4px',
	},
	prefecture: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	cardActionButton: {
		float: 'right',
	},
	actionButton: {
		width: '148px',
	},
	grow: {
		flexGrow: 1,
	},
});

// 今日を過ぎているか
const isPast = (checkDate: string) => {
	const descendingDate = new Date(checkDate);
	const today = new Date();

	const descendingYear = descendingDate.getFullYear();
	const descendingMonth = descendingDate.getMonth() + 1;
	const descendingDay = descendingDate.getDate();

	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth() + 1;
	const todayDay = today.getDate();

	if (descendingYear == todayYear) {
		if (descendingMonth == todayMonth) {
			return descendingDay < todayDay;
		} else {
			return descendingMonth < todayMonth;
		}
	} else {
		return descendingYear < todayYear;
	}
}

const status = (plan: PLAN) => {
	if (plan.is_submitted) {
		// 提出済み
		if (isPast(plan.descending_date)) {
			return String('下山完了');
		} else {
			return String('提出済み');
		}
	} else {
		// 作成中（未提出）
		return String('作成中');
	}
}

// 入山日を超過: 警告
const isWarning = (plan: PLAN) => {
	return isPast(plan.entering_date) && !plan.is_submitted;
}

// 提出可能か
// 下山日を超過している場合は提出不可
const isDisableSubmit = (plan: PLAN) => {
	return isPast(plan.descending_date) && !plan.is_submitted;
}

type Props = {
	plan: PLAN;
}

const PlanItem: React.FC<Props> = ({plan}: Props) => {
	const classes = useStyles();
	const dummyMountain = '　';

	// const defaultProps = {
	// 	bgcolor: 'background.paper',
	// 	borderColor: 'text.primary',
	// 	m: 1,
	// 	border: 1,
	// 	style: {width: '24px', height: '24px'},
	// };

	const dispatch: AppDispatch = useDispatch();
	const router = useRouter();
	const handleDetail = () => {
		router.push(`/plans/${plan.id}`).then().catch();
	};
	const handleEdit = () => {
		router.push(`/plans/${plan.id}/edit`).then().catch();
	};

	// 提出・提出解除
	const handleSubmit = () => {
		if (plan.is_submitted) {
			const cancelSubmitted = async () => {
				const request: PLAN_SUBMIT_REQUEST = {
					id: plan.id,
					is_submitted: false,
					submitted_date: null
				}
				await dispatch(fetchAsyncPatchPlanSubmit(request));
			}
			cancelSubmitted().then().catch();
		} else {
			const submitted = async () => {
				const request: PLAN_SUBMIT_REQUEST = {
					id: plan.id,
					is_submitted: true,
					submitted_date: formattedDate((new Date()).toString())
				}
				await dispatch(fetchAsyncPatchPlanSubmit(request));
			}
			submitted().then().catch();
		}
		// router.push('/plans').then().catch();
	};

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const handleDelete = () => {
		setOpenDeleteDialog(true);
	};
	const handleDeleteCancel = () => {
		setOpenDeleteDialog(false);
	};

	// 削除
	const handleDeleteConfirm = () => {
		setOpenDeleteDialog(false);
		const deletePlan = async () => {
			await dispatch(fetchAsyncDeletePlan(plan.id));
		}
		deletePlan().then().catch();
		// router.push('/plans').then().catch();
	};

	return (
		<div>
			<Card className={classes.mainCard} variant="outlined">
				<CardActionArea onClick={handleDetail}>
					<CardContent>
						<Grid container spacing={1}>
							<Grid item xs={10} className={classes.purposeType}>
								<Chip label={plan.purpose_type_name} color='secondary' variant='outlined'/>
							</Grid>
							<Grid item xs={2} className={classes.statusContainer}>
								{status(plan)}
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography color="textSecondary">
											{plan.entering_date} ~ {plan.descending_date}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h5" component="h3" noWrap align='left'>
											{plan.mountain_first}
										</Typography>
									</Grid>
									<Grid item xs={6} className={classes.prefecture}>
										<Typography color='textSecondary' variant="body2" component="p" align='left'>
											{plan.prefecture_name}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={3}>
								<Typography color='textPrimary' noWrap align='left' component='h4'>
									{plan.mountain_second ? plan.mountain_second : dummyMountain}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography color='textPrimary' noWrap align='left' component='h4'>
									{plan.mountain_third ? plan.mountain_third : dummyMountain}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography color='textPrimary' noWrap align='left' component='h4'>
									{plan.mountain_fourth ? plan.mountain_fourth : dummyMountain}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography color='textPrimary' noWrap align='left' component='h4'>
									{plan.mountain_fifth ? plan.mountain_fifth : dummyMountain}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									ルート
								</Grid>
								<Grid item xs={5}>
									<div>IN</div>
									<div>{plan.routes && plan.routes[0].details[0].name}</div>
								</Grid>
								<Grid item xs={2}>
									<ArrowRightRoundedIcon fontSize='large'/>
								</Grid>
								<Grid item xs={5}>
									<div>OUT</div>
									<div>{plan.routes && plan.routes[plan.routes.length - 1].details[plan.routes[plan.routes.length - 1].details.length - 1].name}</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									メンバー
								</Grid>
								{plan.members && plan.members.map((m) => (
									<Grid item xs={4} key={m.id}>
										<Grid container spacing={1} alignItems="flex-end">
											<Grid item xs={3}>
												<FaceOutlinedIcon/>
											</Grid>
											<Grid item xs={9}>
												{m.name}
											</Grid>
										</Grid>
									</Grid>
								))}
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<div>
								{isDisableSubmit(plan) ?
									(<div>下山日を過ぎているため、提出できません</div>)
									:
									(isWarning(plan) && (<div>入山日を過ぎています</div>))
								}
							</div>
						</Grid>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						startIcon={<CreateRoundedIcon/>}
						onClick={handleEdit}
					>
						編集
					</Button>
					{plan.is_submitted ?
						(
							<Button
								startIcon={<WarningRoundedIcon/>}
								onClick={handleSubmit}
							>
								提出解除
							</Button>
						)
						:
						(
							<Button
								startIcon={<DoneRoundedIcon/>}
								onClick={handleSubmit}
								disabled={isDisableSubmit(plan)}
							>
								計画提出
							</Button>
						)
					}
					<Button
						startIcon={<DeleteRoundedIcon/>}
						onClick={handleDelete}
					>
						削除
					</Button>
				</CardActions>
			</Card>

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
					{plan.entering_date} ~ {plan.descending_date}: {plan.mountain_first}
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
		</div>
	);
};

export default PlanItem;
