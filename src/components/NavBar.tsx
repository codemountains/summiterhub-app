import React from "react";
import AppBar from "@material-ui/core/AppBar";
// import Badge from "@material-ui/core/Badge";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
// import NotificationIcon from '@material-ui/icons/Notifications';
import NavBarMenu from "./NavBarMenu";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
	appBar: {
		padding: "0 128px",
	},
	title: {
		flexGrow: 1,
	},
	badge: {
		marginRight: theme.spacing(1),
	},
}));

const NavBar: React.FC = () => {
	const classes = useStyles();

	return (
		<div>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Link href="/">
						<Typography variant="h5" className={classes.title}>
							SumitterHub
						</Typography>
					</Link>
					<NavBarMenu/>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
