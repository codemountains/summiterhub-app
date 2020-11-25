import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {
	fetchAsyncGetPlanByPlanId,
	fetchAsyncGetPlanEscapeRoute,
	fetchAsyncGetPlanGear, fetchAsyncGetPlanMember,
	fetchAsyncGetPlanRoute,
	fetchAsyncGetPlanRouteDetail,
	selectEditedPlan,
} from "./planSlice";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useRouter} from "next/router";
import {PLAN_ROUTE} from "../../interfaces/planTypes";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {fetchAsyncSearchPlanByPlanId, selectSelectedSearchPlan} from "../search/searchSlice";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	headerName: {
		minWidth: 112,
	},
	headerGender: {
		minWidth: 48,
	},
	headerAddress: {
		minWidth: 380,
	},
	headerEmergency: {
		minWidth: 270,
	},
	headerInsurance: {
		minWidth: 120,
	},
	headerHitococo: {
		minWidth: 72,
	},
});

type PROPS = {
	fromSearch: boolean;
}

const PlanRead: React.FC<PROPS> = ({fromSearch}: PROPS) => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const plan = useSelector(selectEditedPlan);
	const searchedPlan = useSelector(selectSelectedSearchPlan);

	const router = useRouter();
	const {id} = router.query;

	// 日付を整形する
	const formattedDisplayDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.getFullYear().toString() + '年' + (date.getMonth() + 1).toString() + '月' + date.getDate().toString() + '日';
	}

	useEffect(() => {
		if (id) {
			const planId = id.toString();
			const getPlan = async () => {
				if (fromSearch) {
					await dispatch(fetchAsyncSearchPlanByPlanId(planId));
					await dispatch(fetchAsyncGetPlanEscapeRoute(planId));
					const result = await dispatch(fetchAsyncGetPlanRoute(planId));
					const getDetail = async (route: PLAN_ROUTE) => {
						await dispatch(fetchAsyncGetPlanRouteDetail(route));
					}
					if (fetchAsyncGetPlanRoute.fulfilled.match(result)) {
						result.payload.map((r) => (getDetail(r).then().catch()));
					}
					await dispatch(fetchAsyncGetPlanGear(planId));
				} else {
					await dispatch(fetchAsyncGetPlanByPlanId(planId));
					await dispatch(fetchAsyncGetPlanEscapeRoute(planId));
					const result = await dispatch(fetchAsyncGetPlanRoute(planId));
					const getDetail = async (route: PLAN_ROUTE) => {
						await dispatch(fetchAsyncGetPlanRouteDetail(route));
					}
					if (fetchAsyncGetPlanRoute.fulfilled.match(result)) {
						result.payload.map((r) => (getDetail(r).then().catch()));
					}
					await dispatch(fetchAsyncGetPlanGear(planId));
					await dispatch(fetchAsyncGetPlanMember(planId));
				}
			};
			getPlan().then().catch();
		}
	}, [dispatch, id, fromSearch]);

	const handleCopy = () => {
		router.push(`/plans/copy?id=${id}`).then().catch();
	}

	return (
		<Container maxWidth='lg' style={{marginTop: '16px'}}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Grid container direction='row' justify='flex-end' alignItems='center'>
						<Grid item xs={2}>
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={handleCopy}
							>
								計画をコピーして作成
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h4' component='h4' align='center' color='primary'>
						登山計画書
					</Typography>
					<Typography variant='h6' component='h6' align='right' color='primary'>
						{fromSearch ?
							formattedDisplayDate(String(searchedPlan.submitted_date))
							:
							formattedDisplayDate(String(plan.submitted_date))
						}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<div>
						<Typography variant='h6' component='h6' align='left' color='primary'>
							主な山岳の名称
						</Typography>
					</div>
					<div>
						{fromSearch ?
							(
								<Typography variant='h4' component='h4' align='center' color='primary' gutterBottom>
									{searchedPlan.mountain_first}　{searchedPlan.mountain_second}　{searchedPlan.mountain_third}　{searchedPlan.mountain_fourth}　{searchedPlan.mountain_fifth}
								</Typography>
							)
							:
							(
								<Typography variant='h4' component='h4' align='center' gutterBottom>
									{plan.mountain_first}　{plan.mountain_second}　{plan.mountain_third}　{plan.mountain_fourth}　{plan.mountain_fifth}
								</Typography>
							)
						}
					</div>
				</Grid>
				<Grid item xs={12}>
					{!fromSearch && (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align='center' className={classes.headerName}>
											氏名
										</TableCell>
										<TableCell align='center' className={classes.headerGender}>
											<Grid container spacing={0}>
												<Grid item xs={12}>
													性別
												</Grid>
												<Grid item xs={12}>
													血液型
												</Grid>
											</Grid>
										</TableCell>
										{/*<TableCell align='center'>年齢</TableCell>*/}
										<TableCell align='center' className={classes.headerAddress}>
											<Grid container spacing={0}>
												<Grid item xs={12}>
													住所
												</Grid>
												<Grid item xs={12}>
													電話番号 (自宅) / (携帯)
												</Grid>
											</Grid>
											{/*住所<br/>電話番号(自宅) / (携帯)*/}
										</TableCell>
										<TableCell align='center' className={classes.headerEmergency}>
											<Grid container spacing={0}>
												<Grid item xs={12}>
													緊急連絡先
												</Grid>
												<Grid item xs={12}>
													電話番号 / メールアドレス
												</Grid>
											</Grid>
										</TableCell>
										<TableCell align='center' className={classes.headerInsurance}>
											<Grid container spacing={0}>
												<Grid item xs={12}>
													山岳保険
												</Grid>
												<Grid item xs={12}>
													(会員番号)
												</Grid>
											</Grid>
										</TableCell>
										<TableCell align='center' className={classes.headerHitococo}>
											ヒトココID
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{plan.members.map((m) => (
										<TableRow key={m.id}>
											<TableCell align='center'>
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													{m.name}
												</Typography>
											</TableCell>
											<TableCell align='center'>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															{m.gender_type_name}
														</Typography>
													</Grid>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															{m.blood_type_name} 型
														</Typography>
													</Grid>
												</Grid>
											</TableCell>
											{/*<TableCell align='left'>00</TableCell>*/}
											<TableCell align='left'>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															〒{m.postal_code}　{m.prefecture_name}{m.address}
														</Typography>
													</Grid>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															(自宅){m.home_phone_number} /(携帯) {m.cell_phone_number}
														</Typography>
													</Grid>
												</Grid>
											</TableCell>
											<TableCell align='left'>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															{m.emergency_contact_name}
														</Typography>
													</Grid>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															{m.emergency_contact_phone} / {m.cell_phone_number}
														</Typography>
													</Grid>
												</Grid>
											</TableCell>
											<TableCell align='left'>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															{m.insurance_name}
														</Typography>
													</Grid>
													<Grid item xs={12}>
														<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
															({m.insurance_number})
														</Typography>
													</Grid>
												</Grid>
											</TableCell>
											<TableCell align='left'>
												<Typography variant='subtitle2' component='span' align='left' gutterBottom color='primary'>
													{m.hitococo_id}
												</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<Typography variant='h6' component='h6' align='center' color='secondary'>
								入山日
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant='h5' component='h5' align='center' color='primary'>
								{fromSearch ?
									formattedDisplayDate(String(searchedPlan.entering_date))
									:
									formattedDisplayDate(String(plan.entering_date))
								}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant='h6' component='h6' align='center' color='secondary'>
								下山日
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant='h5' component='h5' align='center' color='primary'>
								{fromSearch ?
									formattedDisplayDate(String(searchedPlan.descending_date))
									:
									formattedDisplayDate(String(plan.descending_date))
								}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							{!fromSearch && (
								<Typography variant='h5' component='h5' align='center' color='primary'>
									人数：{plan.members.length}
								</Typography>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align='center' width='240px'>月　日</TableCell>
									<TableCell align='center'>行動予定</TableCell>
									{/*<TableCell align='center'>宿泊地</TableCell>*/}
								</TableRow>
							</TableHead>
							<TableBody>
								{plan.routes.map((r) => (
									<TableRow key={r.id}>
										<TableCell align='center'>
											<Typography variant='subtitle1' component='h6' align='center' color='primary'>
												{formattedDisplayDate(r.plan_date)}
											</Typography>
										</TableCell>
										<TableCell align='left'>
											{r.details.map((d, index) => (
												<Typography variant='subtitle1' component='span' align='left' key={d.id} color='primary'>
													{d.name}
													{index !== r.details.length -1 && (' → ')}
												</Typography>
											))}
										</TableCell>
									</TableRow>
								))}
								<TableRow>
									<TableCell align='center'>エスケープルート</TableCell>
									<TableCell align='left'>
										<Typography variant='subtitle1' component='span' align='center' color='primary'>
											{plan.escape.content}
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' align='left' gutterBottom color='primary'>
						装備
					</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_rain_wear}
													disabled={true}
													name='has_transceiver'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													レインウェア
												</Typography>
											}
										/>

									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_winter_clothing}
													disabled={true}
													name='has_winter_clothing'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													<span>防寒着<br/>(フリース・ダウン)</span>
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_map}
													disabled={true}
													name='has_map'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													地図
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_compass}
													disabled={true}
													name='has_compass'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													コンパス
												</Typography>
											}
										/>
									</TableCell>
									<TableCell/>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_headlamp}
													disabled={true}
													name='has_headlamp'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ヘッドライト
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_mobile_phone}
													disabled={true}
													name='has_mobile_phone'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													携帯電話
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_spare_battery}
													disabled={true}
													name='has_spare_battery'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													予備バッテリー
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_first_aid_kit}
													disabled={true}
													name='has_first_aid_kit'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ファーストエイドキット
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='center'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_emergency_tent}
													disabled={true}
													name='has_emergency_tent'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ツェルト・サバイバルシート
												</Typography>
											}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={fromSearch ? searchedPlan.has_trail_snacks : plan.has_trail_snacks}
													disabled={true}
													name='has_trail_snacks'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													行動食
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<TextField
											fullWidth
											size='small'
											variant="outlined"
											label="行動水（リットル）"
											name='water_liters'
											type='text'
											value={fromSearch ? searchedPlan.water_liters : plan.water_liters}
											placeholder='行動水（リットル）を入力'
											disabled={true}
											InputLabelProps={{ shrink: true }}
										/>
									</TableCell>
									<TableCell align='left'>
										<TextField
											fullWidth
											size='small'
											variant="outlined"
											label="食料（日分）"
											name='food_times'
											type='text'
											value={fromSearch ? searchedPlan.food_times : plan.food_times}
											placeholder='食料（　日分）を入力'
											disabled={true}
											InputLabelProps={{ shrink: true }}
										/>
									</TableCell>
									<TableCell align='left'>
										<TextField
											fullWidth
											size='small'
											variant="outlined"
											label="'非常食（日分）"
											name='emergency_food_times'
											type='text'
											value={searchedPlan ? searchedPlan.emergency_food_times : plan.emergency_food_times}
											placeholder='非常食（日分）を入力'
											disabled={true}
											InputLabelProps={{ shrink: true }}
										/>
									</TableCell>
									<TableCell/>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_transceiver}
													disabled={true}
													name='has_transceiver'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													無線・トランシーバー
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<TextField
											fullWidth
											size='small'
											variant="outlined"
											label="コールサイン"
											name='call_sign'
											type='text'
											value={plan.gear.call_sign}
											disabled={true}
											InputLabelProps={{ shrink: true }}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_radio}
													disabled={true}
													name='has_radio'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ラジオ
												</Typography>
											}
										/>
									</TableCell>
									<TableCell/>
									<TableCell/>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_tent}
													disabled={true}
													name='has_tent'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													テント
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_sleeping_bag}
													disabled={true}
													name='has_sleeping_bag'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													寝袋
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_stove}
													disabled={true}
													name='has_stove'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ガスヘッド・ガス缶
												</Typography>
											}
										/>
									</TableCell>
									<TableCell/>
									<TableCell/>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_helmet}
													disabled={true}
													name='has_helmet'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ヘルメット
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_climbing_rope}
													disabled={true}
													name='has_climbing_rope'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													クライミングロープ
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_climbing_gear}
													disabled={true}
													name='has_climbing_gear'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													クライミング装備
												</Typography>
											}
										/>
									</TableCell>
									<TableCell/>
									<TableCell/>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_crampons}
													disabled={true}
													name='has_crampons'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													アイゼン・クランポン
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_ice_axe}
													disabled={true}
													name='has_ice_axe'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ピッケル
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_snow_saw}
													disabled={true}
													name='has_snow_saw'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													スノーソー
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_shovel}
													disabled={true}
													name='has_shovel'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													スコップ
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_beacon}
													disabled={true}
													name='has_beacon'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													ビーコン
												</Typography>
											}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_probe}
													disabled={true}
													name='has_probe'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													プローブ
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<FormControlLabel
											control={
												<Checkbox
													checked={plan.gear.has_riding_gear}
													disabled={true}
													name='has_riding_gear'
													color='primary'
												/>
											}
											label={
												<Typography variant='subtitle1' component='span' align='left' gutterBottom color='primary'>
													滑走道具
												</Typography>
											}
										/>
									</TableCell>
									<TableCell align='left'>
										<TextField
											fullWidth
											size='small'
											variant="outlined"
											label="滑走道具"
											name='call_sign'
											type='text'
											value={plan.gear.riding_type_name}
											disabled={true}
											InputLabelProps={{ shrink: true }}
										/>
									</TableCell>
									<TableCell/>
									<TableCell/>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Container>
	);
};

export default PlanRead;
