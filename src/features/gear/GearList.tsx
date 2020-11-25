import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppDispatch} from "../../app/store";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {fetchAsyncDeleteGear, fetchAsyncGetGear, fetchAsyncPutGear, selectEditedGear, selectGears} from "./gearSlice";
import Avatar from "@material-ui/core/Avatar";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import FiberNewRoundedIcon from '@material-ui/icons/FiberNewRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
// 仮のアイコン
import FolderIcon from '@material-ui/icons/Folder';
import {editedGear, initialState, fetchAsyncPostGear} from './gearSlice';
import {GEAR} from "../../interfaces/gearTypes";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
// import {purposeTypes} from "../../utils/selectItems";
import GearEdit from "./GearEdit";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: 'relative',
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
		createButton: {
			margin: '12px 0',
		}
	}),
);

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const GearList: React.FC = () => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const gears = useSelector(selectGears);
	const editGear = useSelector(selectEditedGear);

	useEffect(() => {
		const getGears = async () => {
			await dispatch(fetchAsyncGetGear());
		};
		getGears().then().catch();
	}, [dispatch]);

	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleCreate = () => {
		setOpenEditDialog(true);
		dispatch(editedGear(initialState.edited_gear));
	};

	const handleEdit = (gear: GEAR) => {
		setOpenEditDialog(true);
		// setIsValidated(true);
		dispatch(editedGear(gear));
	}

	const handleClose = () => {
		setOpenEditDialog(false);
		dispatch(editedGear(initialState.edited_gear));
	};

	const handleSave = () => {
		if (editGear.title !== '') {
			setOpenEditDialog(false);
			if (editGear.id) {
				dispatch(fetchAsyncPutGear(editGear));
			} else {
				dispatch(fetchAsyncPostGear(editGear));
			}
			dispatch(editedGear(initialState.edited_gear));
		}
	}

	const handleDelete = (gear: GEAR) => {
		setOpenDeleteDialog(true);
		dispatch(editedGear(gear));
	}

	const handleDeleteCancel = () => {
		setOpenDeleteDialog(false);
		dispatch(editedGear(initialState.edited_gear));
	}

	const handleDeleteConfirm = () => {
		setOpenDeleteDialog(false);
		dispatch(fetchAsyncDeleteGear(editGear.id));
		dispatch(editedGear(initialState.edited_gear));
	}

	return (
		<div>
			<Container maxWidth='lg'>
				<Grid container spacing={4}>
					<Grid item xs={3}>
						<Button
							className={classes.createButton}
							fullWidth
							variant='outlined'
							color='primary'
							startIcon={<AddRoundedIcon/>}
							onClick={handleCreate}
						>
							新規作成
						</Button>
						{/*<Divider/>*/}
						{/*<Typography>カテゴリー</Typography>*/}
						{/*<List component='nav'>*/}
						{/*	{purposeTypes.map((type) => (*/}
						{/*		<ListItem key={type.id} button onClick={() => {*/}
						{/*			alert(type.id);*/}
						{/*		}}>*/}
						{/*			<ListItemText primary={type.name}/>*/}
						{/*		</ListItem>*/}
						{/*	))}*/}
						{/*</List>*/}
					</Grid>
					<Grid item xs={9}>
						<List>
							{gears.map((gear) => (
								<ListItem button onClick={() => handleEdit(gear)}>
									<ListItemAvatar>
										<Avatar>
											<FolderIcon/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={
											<>
												<Chip label={gear.purpose_type_name} color='secondary'
													  variant='outlined' size='small'/>
												<Typography color='textPrimary' variant='h6'>
													{gear.title}
												</Typography>
											</>
										}
										secondary={gear.remarks}
									/>
									<ListItemSecondaryAction>
										<Button
											color='secondary'
											startIcon={<DeleteRoundedIcon/>}
											onClick={() => {handleDelete(gear)}}
										>
											削除
										</Button>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</Container>

			{/* 新規作成・編集ダイアログ */}
			<Dialog fullScreen open={openEditDialog} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon/>
						</IconButton>
						{editGear.id ?
							<BorderColorRoundedIcon/>
							:
							<FiberNewRoundedIcon fontSize='large'/>
						}
						<Typography variant="h6" className={classes.title}>
							装備マスタ
						</Typography>
						<Button autoFocus color="inherit" onClick={handleSave} variant='outlined' size='small'>
							{editGear.id ? '更新する' : '保存する'}
						</Button>
					</Toolbar>
				</AppBar>
				<GearEdit/>
			</Dialog>

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
						<span>{editGear.title}</span>を削除します。
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
		</div>
	);
};

export default GearList;
