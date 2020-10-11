import React from "react";
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import styles from "./Login.module.css";

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
	}
}));

interface State {
	password: string;
	showPassword: boolean;
}

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

const Login: React.FC = () => {
	const classes = useStyles();

	const [values, setValues] = React.useState<State>({
		password: '',
		showPassword: false,
	});

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					ログイン
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="メールアドレス"
						name="email"
						autoComplete="email"
						autoFocus
						placeholder="メールアドレスを入力"
						size="small"
					/>
					<FormControl variant="outlined" fullWidth required margin="normal" size="small">
						<InputLabel htmlFor="password">パスワード</InputLabel>
						<OutlinedInput
							id="password"
							labelWidth={100}
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							placeholder="パスワードを入力"
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" size="small"/>}
						label={<span className={styles.keepLoggedIn}>ログイン状態を保持する</span>}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						ログイン
					</Button>
					<div className={styles.forgotPasswordContainer}>
						<Link href="/password-reset" passHref>
							<a className={styles.forgotPasswordLink}>パスワードを忘れた方はこちら</a>
						</Link>
					</div>
					<Link href="/signup">
						<Button
							className={classes.signUpButton}
							type="button"
							fullWidth
							variant="outlined"
							color="secondary"
							size="small"
						>
							新規アカウント登録
						</Button>
					</Link>
				</form>
			</div>
			<Box mt={8}>
				<Copyright/>
			</Box>
		</Container>
	);
};

export default Login;
