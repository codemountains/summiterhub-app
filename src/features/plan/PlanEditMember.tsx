import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {fetchAsyncGetFriend, fetchAsyncGetFriendDetail, selectFriends} from '../friend/friendSlice';
import {editPlanMember, initialState, pushPlanMember, deletePlanMember, selectEditedPlanMembers} from './planSlice';
import {PLAN_MEMBER} from "../../interfaces/planTypes";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {ListItem, OutlinedInput} from "@material-ui/core";
import {genderTypes, bloodTypes, prefectures} from "../../utils/selectItems";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import {selectUserDetail} from "../authentication/authSlice";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const genderTypeLabel: string = '性別';
const bloodTypeLabel: string = '血液型';
const prefectureLabel: string = '都道府県';
const friendSelectLabel: string = 'フレンド';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		deleteButton: {
			color: theme.palette.error.main
		},
	}),
);

type PROPS = {
	isCreate: boolean;
}

const PlanEditMember: React.FC<PROPS> = ({isCreate}: PROPS) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const friends = useSelector(selectFriends);
	const members = useSelector(selectEditedPlanMembers);
	const ownDetail = useSelector(selectUserDetail);

	useEffect(() => {
		if (isCreate) {
			const setInitialMember = async () => {
				await dispatch(editPlanMember({
					id: members[0].id,
					created_user: '',
					created_at: null,
					updated_user: '',
					updated_at: null,
					plan: '',
					user: ownDetail.user,
					name: ownDetail.name,
					postal_code: ownDetail.postal_code,
					prefecture: ownDetail.prefecture,
					prefecture_name: '',
					address: ownDetail.address,
					gender_type: ownDetail.gender_type,
					gender_type_name: '',
					blood_type: ownDetail.blood_type,
					blood_type_name: '',
					home_phone_number: ownDetail.home_phone_number,
					cell_phone_number: ownDetail.cell_phone_number,
					emergency_contact_name: ownDetail.emergency_contact_name,
					emergency_contact_phone: ownDetail.emergency_contact_phone,
					emergency_contact_email: ownDetail.emergency_contact_email,
					insurance_name: ownDetail.insurance_name,
					insurance_number: ownDetail.insurance_number,
					hitococo_id: ownDetail.hitococo_id,
					sort_index: 1
				}));
			}
			setInitialMember().then().catch();

			// const initializeMember = async () => {
			// 	const getUserDetailResult = await dispatch(fetchAsyncGetUserDetail());
			// 	if (fetchAsyncGetUserDetail.fulfilled.match(getUserDetailResult)) {
			// 		const userDetail = getUserDetailResult.payload;
			// 		await dispatch(editPlanMember({
			// 			id: members[0].id,
			// 			created_user: '',
			// 			created_at: null,
			// 			updated_user: '',
			// 			updated_at: null,
			// 			plan: '',
			// 			user: userDetail.user,
			// 			name: userDetail.name,
			// 			postal_code: userDetail.postal_code,
			// 			prefecture: userDetail.prefecture,
			// 			prefecture_name: '',
			// 			address: userDetail.address,
			// 			gender_type: userDetail.gender_type,
			// 			gender_type_name: '',
			// 			blood_type: userDetail.blood_type,
			// 			blood_type_name: '',
			// 			home_phone_number: userDetail.home_phone_number,
			// 			cell_phone_number: userDetail.cell_phone_number,
			// 			emergency_contact_name: userDetail.emergency_contact_name,
			// 			emergency_contact_phone: userDetail.emergency_contact_phone,
			// 			emergency_contact_email: userDetail.emergency_contact_email,
			// 			insurance_name: userDetail.insurance_name,
			// 			insurance_number: userDetail.insurance_number,
			// 			hitococo_id: userDetail.hitococo_id,
			// 			sort_index: 1
			// 		}));
			// 	}
			// }
			// initializeMember().then().catch();
		}

		const getFriend = async () => {
			// await dispatch(fetchAsyncGetUserDetail());
			const result = await dispatch(fetchAsyncGetFriend());
			if (fetchAsyncGetFriend.fulfilled.match(result)) {
				for (const friend of result.payload.results) {
					await dispatch(fetchAsyncGetFriendDetail(friend.id));
				}
			}
		}
		getFriend().then().catch();
	}, [dispatch]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, member: PLAN_MEMBER) => {
		const value: string = event.target.value;
		const name: string = event.target.name;
		dispatch(editPlanMember({...member, [name]: value}));
	};

	const handleGenderTypeChange = (event: React.ChangeEvent<{ value: unknown }>, member: PLAN_MEMBER) => {
		const value: number = Number(event.target.value);
		const name: string = 'gender_type';
		dispatch(editPlanMember({...member, [name]: value}));
	}

	const handleBloodTypeChange = (event: React.ChangeEvent<{ value: unknown }>, member: PLAN_MEMBER) => {
		const value: number = Number(event.target.value);
		const name: string = 'blood_type';
		dispatch(editPlanMember({...member, [name]: value}));
	}

	// フレンド
	const handleFriendChange = (event: React.ChangeEvent<{ value: unknown }>, member: PLAN_MEMBER) => {
		const value: string = String(event.target.value);
		if (value !== '') {
			const friend = friends.filter((f) => (f.detail.user === value))[0];
			const setMember: PLAN_MEMBER = {
				id: member.id,
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan: '',
				user: friend.detail.user,
				name: friend.detail.name,
				postal_code: friend.detail.postal_code,
				prefecture: friend.detail.prefecture,
				prefecture_name: '',
				address: friend.detail.address,
				gender_type: friend.detail.gender_type,
				gender_type_name: '',
				blood_type: friend.detail.blood_type,
				blood_type_name: '',
				home_phone_number: friend.detail.home_phone_number,
				cell_phone_number: friend.detail.cell_phone_number,
				emergency_contact_name: friend.detail.emergency_contact_name,
				emergency_contact_phone: friend.detail.emergency_contact_phone,
				emergency_contact_email: friend.detail.emergency_contact_email,
				insurance_name: friend.detail.insurance_name,
				insurance_number: friend.detail.insurance_number,
				hitococo_id: friend.detail.hitococo_id,
				sort_index: member.sort_index
			}
			dispatch(editPlanMember(setMember));
		} else {
			const initialMember = initialState.edited_plan.members[0];
			dispatch(editPlanMember({...initialMember, id: member.id, sort_index: member.sort_index}));
		}
	}

	// メンバー削除
	const handleDeleteMember = (member: PLAN_MEMBER) => {
		dispatch(deletePlanMember(member));
	}

	// 電話番号はどちら必須
	const isInputtedPhoneNumber = (member: PLAN_MEMBER) => {
		if (member.home_phone_number && member.home_phone_number.length > 0) {
			return true;
		}
		return !!(member.cell_phone_number && member.cell_phone_number.length > 0);
	}

	return (
		<div>
			<List>
				{members && members.map((member, index) => (
					<>
						{index !== 0 && (
							<ListItem>
								<Grid container spacing={1}>
									<Grid item xs={3}>
										<FormControl variant="outlined" size='small' fullWidth>
											<InputLabel id='plan-friend-select-label' shrink>
												{friendSelectLabel}
											</InputLabel>
											<Select
												labelId='plan-friend-select-label'
												value={member.user}
												onChange={(event) => (handleFriendChange(event, member))}
												label={friendSelectLabel}
												input={<OutlinedInput notched label={friendSelectLabel}/>}
												inputProps={{shrink: true}}
											>
												<MenuItem value={''}><em>　</em></MenuItem>
												{friends.length > 0 && (friends.map((f) => (
													<MenuItem value={f.detail.user} key={f.detail.user}>
														{f.detail.name}
													</MenuItem>
												)))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
											フレンドの情報をメンバー情報に反映させる
										</Typography>
									</Grid>
									<Grid item xs={2}/>
									<Grid item xs={1}>
										<Button
											variant='text'
											className={classes.deleteButton}
											fullWidth
											startIcon={<DeleteIcon />}
											onClick={() => (handleDeleteMember(member))}
										>
											削除
										</Button>
									</Grid>
								</Grid>
							</ListItem>
						)}
						<ListItem key={index}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									基本情報
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										size='small'
										variant="outlined"
										label='氏名'
										name='name'
										type='text'
										value={member.name}
										placeholder='名前を入力'
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
										InputLabelProps={{shrink: true}}
										error={member.name.length < 1}
										helperText={(member.name.length < 1) && '必須項目です'}
									/>
								</Grid>
								<Grid item xs={3}>
									<FormControl variant="outlined" size='small' fullWidth>
										<InputLabel id='plan-member-gender-type-select-label'
													shrink>{genderTypeLabel}</InputLabel>
										<Select
											labelId='plan-member-gender-type-select-label'
											value={member.gender_type}
											onChange={(event) => (handleGenderTypeChange(event, member))}
											label={genderTypeLabel}
											input={<OutlinedInput notched label={genderTypeLabel}/>}
											inputProps={{shrink: true}}
										>
											{genderTypes.map((g) => (
												<MenuItem value={g.id} key={g.id}>{g.name}</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={3}>
									<FormControl variant="outlined" size='small' fullWidth>
										<InputLabel id='plan-member-blood-type-select-label'
													shrink>{bloodTypeLabel}</InputLabel>
										<Select
											labelId='plan-member-blood-type-select-label'
											value={member.blood_type}
											onChange={(event) => (handleBloodTypeChange(event, member))}
											label={bloodTypeLabel}
											input={<OutlinedInput notched label={bloodTypeLabel}/>}
											inputProps={{shrink: true}}
										>
											{bloodTypes.map((b) => (
												<MenuItem value={b.id} key={b.id}>{b.name}</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={2}>
									<TextField
										fullWidth
										size='small'
										variant="outlined"
										label='郵便番号'
										name='postal_code'
										type='text'
										value={member.postal_code}
										placeholder='名前を入力'
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
										InputLabelProps={{shrink: true}}
										error={member.postal_code.length < 1}
										helperText={(member.postal_code.length < 1) && '必須項目です'}
									/>
								</Grid>
								<Grid item xs={2}>
									<FormControl variant="outlined" size='small' fullWidth>
										<InputLabel id='plan-blood-type-select-label'
													shrink>{prefectureLabel}</InputLabel>
										<Select
											labelId='plan-member-prefecture-select-label'
											value={member.prefecture}
											onChange={(event) => (handleBloodTypeChange(event, member))}
											label={prefectureLabel}
											input={<OutlinedInput notched label={prefectureLabel}/>}
											inputProps={{shrink: true}}
										>
											{prefectures.map((p) => (
												<MenuItem value={p.id} key={p.id}>{p.name}</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={8}>
									<TextField
										fullWidth
										size='small'
										variant="outlined"
										label='住所'
										name='address'
										type='text'
										value={member.address}
										placeholder='住所を入力'
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
										InputLabelProps={{shrink: true}}
										error={member.address.length < 1}
										helperText={(member.address.length < 1) && '必須項目です'}
									/>
								</Grid>
								<Grid item xs={4}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											電話番号
										</Grid>
										<Grid item xs={6}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='自宅'
												name='home_phone_number'
												type='text'
												value={member.home_phone_number}
												placeholder='電話番号を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
												error={!isInputtedPhoneNumber(member)}
												helperText={!isInputtedPhoneNumber(member) && '電話番号もしくは携帯番号を入力してください'}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='携帯'
												name='cell_phone_number'
												type='text'
												value={member.cell_phone_number}
												placeholder='携帯番号を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
												error={!isInputtedPhoneNumber(member)}
												helperText={!isInputtedPhoneNumber(member) && '電話番号もしくは携帯番号を入力してください'}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={8}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											山岳保険・ヒトココID
										</Grid>
										<Grid item xs={5}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='山岳保険名'
												name='insurance_name'
												type='text'
												value={member.insurance_name}
												placeholder='山岳保険名を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='山岳保険 - 会員番号'
												name='insurance_number'
												type='text'
												value={member.insurance_number}
												placeholder='会員番号を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='ヒトココID'
												name='hitococo_id'
												type='text'
												value={member.hitococo_id}
												placeholder='ヒトココIDを入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											緊急連絡先
										</Grid>
										<Grid item xs={3}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='氏名'
												name='emergency_contact_name'
												type='text'
												value={member.emergency_contact_name}
												placeholder='氏名を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
												error={member.emergency_contact_name.length < 1}
												helperText={(member.emergency_contact_name.length < 1) && '必須項目です'}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='電話番号'
												name='emergency_contact_phone'
												type='text'
												value={member.emergency_contact_phone}
												placeholder='電話番号を入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
												error={member.emergency_contact_phone.length < 1}
												helperText={(member.emergency_contact_phone.length < 1) && '必須項目です'}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												fullWidth
												size='small'
												variant="outlined"
												label='メールアドレス'
												name='emergency_contact_email'
												type='text'
												value={member.emergency_contact_email}
												placeholder='メールアドレスを入力'
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => (handleInputChange(event, member))}
												InputLabelProps={{shrink: true}}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</ListItem>
						<Divider/>
						<ListItem>
							{index === members.length - 1 && (
								<Button
									fullWidth
									variant='outlined'
									color='primary'
									startIcon={<AddRoundedIcon/>}
									onClick={() => (dispatch(pushPlanMember(member)))}
								>
									メンバーを追加する
								</Button>
							)}
						</ListItem>
					</>
				))}
			</List>
		</div>
	);
};

export default PlanEditMember;
