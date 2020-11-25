import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import {AppDispatch} from "../../app/store";
import {editedGear, selectEditedGear} from "./gearSlice";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {purposeTypes, ridingTypes} from "../../utils/selectItems";


const GearEdit: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const gear = useSelector(selectEditedGear);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string  = event.target.value;
		const name: string = event.target.name;
		dispatch(editedGear({...gear, [name]: value}));
	};

	const handlePurposeTypeChange = (event: React.ChangeEvent<{value: unknown}>) => {
		const value: number = Number(event.target.value);
		const name: string = 'purpose_type';
		dispatch(editedGear({...gear, [name]: value}));
	};

	const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked: boolean = event.target.checked;
		const name: string = event.target.name;
		dispatch(editedGear({...gear, [name]: checked}));
	};

	const handleRidingTypeChange = (event: React.ChangeEvent<{value: unknown}>) => {
		const value: number = Number(event.target.value);
		const name: string = 'riding_type';
		dispatch(editedGear({...gear, [name]: value === 0 ? null : value}));
	};

	return (
		<div>
			<Typography component='p'>
				登録した装備マスタを計画作成時に選択することで計画書を簡単に作成できます
			</Typography>
			<Container maxWidth='lg'>
				<List>
					<ListItem>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									autoFocus
									variant="outlined"
									label="タイトル　[必須]"
									name='title'
									type='text'
									value={gear.title}
									placeholder='装備マスタのタイトルを入力'
									onChange={handleInputChange}
									error={gear.title.length < 1}
									helperText={(gear.title.length < 1) && '必須項目です'}
								/>
							</Grid>
							<Grid item xs={3}>
								<FormControl variant="outlined" size='small' fullWidth>
									<InputLabel id="purpose-type-select-label">カテゴリー</InputLabel>
									<Select
										labelId="purpose-type-select-label"
										value={gear.purpose_type}
										onChange={handlePurposeTypeChange}
										label='カテゴリー'
									>
										{purposeTypes.map((type) => (
											<MenuItem value={type.id}>{type.name}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={9}>
								<TextField
									fullWidth
									size='small'
									variant="outlined"
									label="メモ"
									name='remarks'
									type='text'
									value={gear.remarks}
									placeholder='メモを入力'
									onChange={handleInputChange}
								/>
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
									<InputLabel id="riding-type-select-label">滑走道具タイプ</InputLabel>
									<Select
										labelId="riding-type-select-label"
										value={gear.riding_type}
										onChange={handleRidingTypeChange}
										label='滑走道具タイプ'
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
			</Container>
		</div>
	);
};

export default GearEdit;
