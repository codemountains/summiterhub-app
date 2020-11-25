import React, {useState, MouseEvent, useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {makeStyles} from '@material-ui/core/styles';
// import NavBarMenu from "./NavBarMenu";
// @ts-ignore
import Link from "next/link";
import Button from "@material-ui/core/Button";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import MainMenuBar from "./MainMenuBar";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchAsyncGetUserDetail, fetchAsyncGetUserMe, logout,
	selectUserDetail
} from "../features/authentication/authSlice";
import {AppDispatch} from "../app/store";

const useStyles = makeStyles((theme) => ({
	appBar: {
		padding: 0,
		[theme.breakpoints.up('sm')]: {
			padding: "0 10%",
		},
	},
	badge: {
		marginRight: theme.spacing(1),
	},
	loginButton: {
		margin: theme.spacing(0, 3, 0, 0),
		width: 124,
		// width: 96,
	},
	signUpButton: {
		margin: theme.spacing(0, 0, 0, 0),
		width: 96,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	mainMenuContainer: {
		padding: 0,
		[theme.breakpoints.up('sm')]: {
			padding: "0 12%",
		},
	}
}));

const NavBar: React.FC = () => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		const getUser = async () => {
			const user = await dispatch(fetchAsyncGetUserMe());
			if (fetchAsyncGetUserMe.fulfilled.match(user)) {
				await dispatch(fetchAsyncGetUserDetail());
			}
		}
		getUser().then().catch();
	}, [dispatch]);
	const userDetail = useSelector(selectUserDetail);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const isAuthMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleAuthMenuClose = () => {
		setMobileMoreAnchorEl(null);
	}

	const handleAuthMenuOpen = (event: MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	}

	const handleLogin = () => {
		window.location.href = '/login';
	}

	const handleSignup = () => {
		window.location.href = '/signup';
	}

	const handleLogout = () => {
		logout();
		handleMenuClose();
	}

	const authMenuId = 'auth-menu';
	const renderAuthMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={authMenuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isAuthMenuOpen}
			onClose={handleAuthMenuClose}
		>
			<MenuItem onClick={handleLogin}>
				<span style={{width: '96px'}}>ログイン</span>
			</MenuItem>
			<MenuItem onClick={handleSignup}>
				<span style={{width: '96px'}}>新規登録</span>
			</MenuItem>
		</Menu>
	);

	const menuId = 'logged-in-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={menuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{/*<MenuItem onClick={handleMenuClose}>Profile</MenuItem>*/}
			{/*<MenuItem onClick={handleMenuClose}>My account</MenuItem>*/}
			<MenuItem onClick={handleLogout}>ログアウト</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'logged-in-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="logged-in-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle/>
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Link href="/">
						<Typography variant="h5" className={classes.title}>
							SumitterHub
						</Typography>
					</Link>
					{userDetail.id ? (
						<>
							<div className={classes.grow}/>
							<div className={classes.sectionDesktop}>
								<Button
									variant='text'
									color='inherit'
									aria-label={userDetail.profile_name}
									aria-controls={menuId}
									onClick={handleProfileMenuOpen}
									startIcon={<AccountCircle/>}
								>
									{userDetail.profile_name}
								</Button>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MenuRoundedIcon/>
								</IconButton>
							</div>
							{renderMobileMenu}
							{renderMenu}
						</>
					) : (
						<>
							<div className={classes.grow}/>
							<div className={classes.sectionDesktop}>
								<Button
									className={classes.loginButton}
									type="button"
									variant="text"
									color="inherit"
									size="small"
									onClick={handleLogin}
								>
									ゲストログイン
								</Button>
								<Button
									className={classes.signUpButton}
									type="button"
									variant="outlined"
									color="inherit"
									size="small"
									onClick={handleSignup}
								>
									新規登録
								</Button>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={authMenuId}
									aria-haspopup="true"
									onClick={handleAuthMenuOpen}
									color="inherit"
								>
									<MenuRoundedIcon/>
								</IconButton>
							</div>
							{renderAuthMenu}
						</>
					)}
				</Toolbar>
			</AppBar>
			{userDetail.id && (
				<MainMenuBar/>
			)}
		</div>
	);
};

export default NavBar;
