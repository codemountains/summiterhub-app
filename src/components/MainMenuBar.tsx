import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FilterHdrRoundedIcon from '@material-ui/icons/FilterHdrRounded';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import CategoryIcon from '@material-ui/icons/Category';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
	mainMenu: {
		padding: "0 12%",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	menuIcon: {
		marginRight: theme.spacing(2),
	},
	// mainMenuContainer: {
	// 	padding: 0,
	// 	[theme.breakpoints.up('sm')]: {
	// 		padding: "0 12%",
	// 	},
	// },
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
}));

const MainMenuBar: React.FC = () => {
	const classes = useStyles();

	const handleHome = () => {
		window.location.href = '/';
	}

	const handlePlans = () => {
		window.location.href = '/plans';
	}

	const handleBookmarks = () => {
		window.location.href = '/bookmarks';
	}

	const handleParties = () => {
		window.location.href = '/parties';
	}

	const handleFriends = () => {
		window.location.href = '/friends';
	}

	const handleGears = () => {
		window.location.href = '/gears';
	}

	return (
		<div className={classes.mainMenu}>
			<ButtonGroup variant='text' color='primary' fullWidth>
				<Button onClick={handleHome}>
					<HomeRoundedIcon className={classes.menuIcon} fontSize='large'/>
					<span>ホーム</span>
				</Button>
				<Button onClick={handlePlans}>
					<FilterHdrRoundedIcon className={classes.menuIcon} fontSize='large'/>
					<span>登山計画一覧</span>
				</Button>
				<Button onClick={handleBookmarks}>
					<BookmarksRoundedIcon className={classes.menuIcon}/>
					<span>ブックマーク</span>
				</Button>
				<Button onClick={handleParties}>
					<GroupRoundedIcon className={classes.menuIcon}/>
					<span>パーティ</span>
				</Button>
				<Button onClick={handleFriends}>
					<PersonRoundedIcon className={classes.menuIcon}/>
					<span>フレンド</span>
				</Button>
				<Button onClick={handleGears}>
					<CategoryIcon className={classes.menuIcon}/>
					<span>装備</span>
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default MainMenuBar;
