import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {selectEditedPlanGear, editPlan, editPlanGear, initialState, selectEditedPlan} from "./planSlice";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import {fetchAsyncGetGear, selectGears} from "../gear/gearSlice";
import {PLAN_GEAR} from "../../interfaces/planTypes";
import {OutlinedInput} from "@material-ui/core";
import {ridingTypes} from '../../utils/selectItems';
// import {makeStyles} from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
// 	masterGear: {
// 		width: '310px',
// 	},
// 	masterGearAttention: {
// 		marginLeft: theme.spacing(2),
// 	}
// }));


const PlanEditGear: React.FC = () => {
	// const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const plan = useSelector(selectEditedPlan);
	const gear = useSelector(selectEditedPlanGear);
	const masterGears = useSelector(selectGears);

	useEffect(() => {
		const getGears = async () => {
			await dispatch(fetchAsyncGetGear());
		};
		getGears().then().catch();
	}, [dispatch]);

	// 装備マスタ
	const handleMasterGearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value: string = String(event.target.value);
		if (value !== '') {
			const masterGear = masterGears.filter((g) => (g.id === value))[0];
			const setPlanGear: PLAN_GEAR = {
				id: '',
				created_user: '',
				created_at: null,
				updated_user: '',
				updated_at: null,
				plan: masterGear.id,
				has_rain_wear: masterGear.has_rain_wear,
				has_winter_clothing: masterGear.has_winter_clothing,
				has_map: masterGear.has_map,
				has_compass: masterGear.has_map,
				has_headlamp: masterGear.has_headlamp,
				has_mobile_phone: masterGear.has_mobile_phone,
				has_spare_battery: masterGear.has_spare_battery,
				has_first_aid_kit: masterGear.has_first_aid_kit,
				has_emergency_tent: masterGear.has_emergency_tent,
				has_transceiver: masterGear.has_transceiver,
				call_sign: masterGear.call_sign,
				has_radio: masterGear.has_radio,
				has_tent: masterGear.has_tent,
				has_sleeping_bag: masterGear.has_sleeping_bag,
				has_stove: masterGear.has_stove,
				has_helmet: masterGear.has_helmet,
				has_climbing_rope: masterGear.has_climbing_rope,
				has_climbing_gear: masterGear.has_climbing_gear,
				has_crampons: masterGear.has_crampons,
				has_ice_axe: masterGear.has_ice_axe,
				has_shovel: masterGear.has_shovel,
				has_beacon: masterGear.has_beacon,
				has_probe: masterGear.has_probe,
				has_snow_saw: masterGear.has_snow_saw,
				has_riding_gear: masterGear.has_riding_gear,
				riding_type: masterGear.riding_type,
				riding_type_name: '',
				gear: value
			}
			dispatch(editPlanGear(setPlanGear));
		} else {
			dispatch(editPlanGear(initialState.edited_plan.gear));
		}
	}

	// チェックボックス更新
	const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked: boolean = event.target.checked;
		const name: string = event.target.name;
		dispatch(editPlanGear({...gear, [name]: checked}));
	};

	// コールサインの更新
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		const name: string = event.target.name;
		dispatch(editPlanGear({...gear, [name]: value}));
	};

	// 滑走タイプの更新
	const handleRidingTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value: number = Number(event.target.value);
		const name: string = 'riding_type';
		dispatch(editPlanGear({...gear, [name]: value === 0 ? null : value}));
	};

	// 計画情報のチェックボックス更新
	const handlePlanCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked: boolean = event.target.checked;
		const name: string = event.target.name;
		dispatch(editPlan({...plan, [name]: checked}));
	};

	// 計画情報の更新
	const handlePlanInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		const name: string = event.target.name;
		dispatch(editPlan({...plan, [name]: value}));
	};

	const isValidatedNumber = (target: string | null) => {
		if (!target) {
			return false;
		} else {
			const number = Number(target);
			return number >= 0;
		}
	}

	return (
		<div>
			<List>
				<ListItem>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<FormControl variant="outlined" size='small' fullWidth>
								<InputLabel id='master-gear-select-label' shrink>装備マスタ</InputLabel>
								<Select
									labelId='master-gear-select-label'
									value={gear.gear}
									onChange={handleMasterGearChange}
									label='装備マスタ'
									input={<OutlinedInput notched label={'装備マスタ'} />}
									inputProps={{shrink: true}}
								>
									<MenuItem value={''}><em>　</em></MenuItem>
									{masterGears.length > 0 && (masterGears.map((g) => (
										<MenuItem value={g.id}>{g.title}</MenuItem>
									)))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={9}>
							装備マスタから計画に反映させる
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					必携装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_rain_wear}
										onChange={handleCheckBoxChange}
										name='has_rain_wear'
										color='primary'
									/>
								}
								label='レインウェア'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_winter_clothing}
										onChange={handleCheckBoxChange}
										name='has_winter_clothing'
										color='primary'
									/>
								}
								label='防寒着（フリース・ダウンなど）'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_map}
										onChange={handleCheckBoxChange}
										name='has_map'
										color='primary'
									/>
								}
								label='地図'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_compass}
										onChange={handleCheckBoxChange}
										name='has_compass'
										color='primary'
									/>
								}
								label='コンパス'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_headlamp}
										onChange={handleCheckBoxChange}
										name='has_headlamp'
										color='primary'
									/>
								}
								label='ヘッドライト'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_mobile_phone}
										onChange={handleCheckBoxChange}
										name='has_mobile_phone'
										color='primary'
									/>
								}
								label='携帯電話'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_spare_battery}
										onChange={handleCheckBoxChange}
										name='has_spare_battery'
										color='primary'
									/>
								}
								label='予備バッテリー'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_first_aid_kit}
										onChange={handleCheckBoxChange}
										name='has_first_aid_kit'
										color='primary'
									/>
								}
								label='ファーストエイドキット'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_emergency_tent}
										onChange={handleCheckBoxChange}
										name='has_emergency_tent'
										color='primary'
									/>
								}
								label='ツェルト・サバイバルシート'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					食料・行動水
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<FormControlLabel
								control={
									<Checkbox
										checked={plan.has_trail_snacks}
										onChange={handlePlanCheckBoxChange}
										name='has_trail_snacks'
										color='primary'
									/>
								}
								label='行動食'
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								size='small'
								variant="outlined"
								label="行動水（リットル）"
								name='water_liters'
								type='number'
								value={plan.water_liters}
								placeholder='行動水（リットル）を入力'
								onChange={handlePlanInputChange}
								error={!isValidatedNumber(plan.water_liters)}
								helperText={!isValidatedNumber(plan.water_liters) && '整数で入力してください'}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								size='small'
								variant="outlined"
								label="食料（日分）"
								name='food_times'
								type='number'
								value={plan.food_times}
								placeholder='食料（　日分）を入力'
								onChange={handlePlanInputChange}
								error={!isValidatedNumber(String(plan.food_times))}
								helperText={!isValidatedNumber(String(plan.food_times)) && '整数で入力してください'}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								size='small'
								variant="outlined"
								label="'非常食（日分）"
								name='emergency_food_times'
								type='number'
								value={plan.emergency_food_times}
								placeholder='非常食（日分）を入力'
								onChange={handlePlanInputChange}
								error={!isValidatedNumber(String(plan.emergency_food_times))}
								helperText={!isValidatedNumber(String(plan.emergency_food_times)) && '整数で入力してください'}
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					推奨装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_transceiver}
										onChange={handleCheckBoxChange}
										name='has_transceiver'
										color='primary'
									/>
								}
								label='無線・トランシーバー'
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								size='small'
								variant="outlined"
								label="コールサイン"
								name='call_sign'
								type='text'
								value={gear.call_sign}
								placeholder='コールサインを入力'
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_radio}
										onChange={handleCheckBoxChange}
										name='has_radio'
										color='primary'
									/>
								}
								label='ラジオ'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					縦走装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_tent}
										onChange={handleCheckBoxChange}
										name='has_tent'
										color='primary'
									/>
								}
								label='テント'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_sleeping_bag}
										onChange={handleCheckBoxChange}
										name='has_sleeping_bag'
										color='primary'
									/>
								}
								label='寝袋'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_stove}
										onChange={handleCheckBoxChange}
										name='has_stove'
										color='primary'
									/>
								}
								label='ガスヘッド・ガス缶'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					クライミング装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_helmet}
										onChange={handleCheckBoxChange}
										name='has_helmet'
										color='primary'
									/>
								}
								label='ヘルメット'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_climbing_rope}
										onChange={handleCheckBoxChange}
										name='has_climbing_rope'
										color='primary'
									/>
								}
								label='クライミングロープ'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_climbing_gear}
										onChange={handleCheckBoxChange}
										name='has_climbing_gear'
										color='primary'
									/>
								}
								label='クライミング装備'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					雪山装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_crampons}
										onChange={handleCheckBoxChange}
										name='has_crampons'
										color='primary'
									/>
								}
								label='アイゼン・クランポン'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_ice_axe}
										onChange={handleCheckBoxChange}
										name='has_ice_axe'
										color='primary'
									/>
								}
								label='ピッケル'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_snow_saw}
										onChange={handleCheckBoxChange}
										name='has_snow_saw'
										color='primary'
									/>
								}
								label='スノーソー'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_shovel}
										onChange={handleCheckBoxChange}
										name='has_shovel'
										color='primary'
									/>
								}
								label='スコップ'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_beacon}
										onChange={handleCheckBoxChange}
										name='has_beacon'
										color='primary'
									/>
								}
								label='ビーコン'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_probe}
										onChange={handleCheckBoxChange}
										name='has_probe'
										color='primary'
									/>
								}
								label='プローブ'
							/>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
				<Typography>
					バックカントリー装備
				</Typography>
				<ListItem>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControlLabel
								control={
									<Checkbox
										checked={gear.has_riding_gear}
										onChange={handleCheckBoxChange}
										name='has_riding_gear'
										color='primary'
									/>
								}
								label='滑走道具'
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControl variant="outlined" size='small' fullWidth>
								<InputLabel id="riding-type-select-label" shrink>滑走道具タイプ</InputLabel>
								<Select
									labelId="riding-type-select-label"
									value={gear.riding_type}
									onChange={handleRidingTypeChange}
									label='滑走道具'
									input={<OutlinedInput notched label={'滑走道具タイプ'} />}
									inputProps={{shrink: true}}
								>
									<MenuItem value={0}><em>　</em></MenuItem>
									{ridingTypes.map((r) => (
										<MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</ListItem>
				<Divider/>
			</List>
		</div>
	);
};

export default PlanEditGear;
