import React, {useState} from 'react';
// @ts-ignore
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Formik} from 'formik';
import {useDispatch} from "react-redux";
import * as Yup from 'yup';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
// @ts-ignore
import styles from "./Auth.module.css";
import {
	fetchAsyncGetUserDetail,
	fetchAsyncLogin,
	fetchAsyncSignup
} from "./authSlice";
import {AppDispatch} from "../../app/store";
import {PROPS_AUTHENTICATION} from '../../interfaces/userTypes';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import clsx from "clsx";

const emailErrorFormatMsg: string = 'メールアドレスの形式で入力してください';
const emailRequiredMsg: string = 'メールアドレスを入力してください';
const passwordRequiredMsg: string = 'パスワードを入力してください';
const passwordMinValidateMsg: string = 'パスワードは8文字以上で入力してください';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: 40,
	},
	signUpButton: {
		margin: theme.spacing(3, 0, 0)
	},
	validationError: {
		color: theme.palette.error.main
	}
}));

const Copyright: React.FC = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link href="/">SummiterHub</Link>
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

function Alert(props: AlertProps) {
	return (
		<MuiAlert elevation={6} variant='filled' {...props}/>
	)
}

const Auth: React.FC<PROPS_AUTHENTICATION> = ({isLoginView}: PROPS_AUTHENTICATION) => {
	const classes = useStyles();
	const dispatch: AppDispatch = useDispatch();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isRejected, setIsRejected] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setIsRejected(false);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Link href="/">
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
				</Link>
				<Typography component="h1" variant="h5">
					{isLoginView ? 'ゲストログイン' : '新規アカウント登録'}
				</Typography>
				<Formik
					// initialErrors={{email: 'required'}}
					initialValues={
						{
							email: isLoginView ? process.env.demoUserEmail as string : '',
							password: isLoginView ? process.env.demoUserPassword as string : ''
						}
					}
					onSubmit={async (values) => {
						if (isLoginView) {
							const resultLogin = await dispatch(fetchAsyncLogin(values));
							if (fetchAsyncLogin.fulfilled.match(resultLogin)) {
								// ログイン成功
								const result = await dispatch(fetchAsyncGetUserDetail());
								if (fetchAsyncGetUserDetail.fulfilled.match(result)) {
									window.location.href = '/';
								}
							}
							if (fetchAsyncLogin.rejected.match(resultLogin)) {
								setIsRejected(true);
							}
						} else {
							const resultSignup = await dispatch(fetchAsyncSignup(values));
							if (fetchAsyncSignup.fulfilled.match(resultSignup)) {
								alert('新規登録成功')
							}
						}
					}}
					validationSchema={
						Yup.object().shape({
							email: Yup.string().email(emailErrorFormatMsg).required(emailRequiredMsg),
							password: Yup.string().required(passwordRequiredMsg).min(8, passwordMinValidateMsg)
						})
					}
				>
					{(
						{
							handleSubmit,
							handleChange,
							handleBlur,
							values,
							errors,
							touched,
							isValid
						}
					) => (
						<form className={classes.form} onSubmit={handleSubmit} noValidate>
							<TextField
								margin="normal"
								fullWidth
								id="email"
								label="メールアドレス"
								name="email"
								// autoComplete="email"
								placeholder="メールアドレスを入力"
								size="small"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								// @ts-ignore
								error={(touched.email && errors.email)}
							/>
							{touched.email && errors.email ? (
								<div className={clsx([styles.validationError, classes.validationError])}>
									<ErrorOutlineRoundedIcon fontSize='small'/>
									<span>{errors.email}</span>
								</div>
							) : null}
							<FormControl
								variant="outlined"
								fullWidth
								margin="normal"
								size="small"
								// @ts-ignore
								error={(touched.password && errors.password)}
							>
								<InputLabel htmlFor="password">パスワード</InputLabel>
								<OutlinedInput
									id="password"
									name='password'
									labelWidth={100}
									type={showPassword ? 'text' : 'password'}
									value={values.password}
									placeholder='パスワードを入力'
									onChange={handleChange}
									onBlur={handleBlur}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <Visibility/> : <VisibilityOff/>}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							{!isLoginView && (
								<div className={styles.passwordLengthAttention}>
									パスワードは8文字以上入力してください
								</div>
							)}
							{touched.password && errors.password ? (
								<div className={clsx([styles.validationError, classes.validationError])}>
									<ErrorOutlineRoundedIcon fontSize='small'/>
									<span>{errors.password}</span>
								</div>
							) : null}
							{/*<FormControlLabel*/}
							{/*	control={<Checkbox value="remember" color="primary" size="small"/>}*/}
							{/*	label={<span className={styles.keepLoggedIn}>ログイン状態を保持する</span>}*/}
							{/*/>*/}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={!isValid || !isLoginView}
							>
								{isLoginView ? 'ゲストログイン' : '新規登録'}
							</Button>
							{!isLoginView && (
								<div style={{textAlign: 'center', color: 'red'}}>
									新規登録は開発中のため、ゲストログインしてください
								</div>
							)}
						</form>
					)}
				</Formik>

				{isLoginView && (
					<>
						{/*開発中のため非表示*/}
						{/*<div className={styles.forgotPasswordContainer}>*/}
						{/*	<Link href="/password-reset" passHref>*/}
						{/*		<a className={styles.forgotPasswordLink}>パスワードを忘れた方はこちら</a>*/}
						{/*	</Link>*/}
						{/*</div>*/}
						<Button
							className={classes.signUpButton}
							type="button"
							fullWidth
							variant="outlined"
							color="secondary"
							size="small"
							onClick={() => {window.location.href = '/signup';}}
							disabled
						>
							新規アカウント登録
						</Button>
						<div style={{textAlign: 'center', color: 'red', marginTop: '8px'}}>
							新規登録は開発中のため、ゲストログインしてください
						</div>
					</>
				)}
				{isLoginView && (
					<Snackbar open={isRejected} autoHideDuration={8000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='error' color='error'>
							ログインに失敗しました
						</Alert>
					</Snackbar>
				)}
			</div>
			<Box mt={8}>
				<Copyright/>
			</Box>
		</Container>
	);
};

export default Auth;
