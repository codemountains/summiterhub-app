import React from "react";
import Link from "next/link"
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	loginButton: {
		margin: theme.spacing(0, 3, 0, 0),
		width: 96,
	},
	signUpButton: {
		margin: theme.spacing(0, 0, 0, 0),
		width: 96,
	},
}));

// ログイン前後で切り替える
const NavBarMenu: React.FC = () => {
	const classes = useStyles();

	return (
		<div>
			<Link href="/login" passHref>
				<Button
					className={classes.loginButton}
					type="button"
					variant="text"
					color="inherit"
					size="small"
				>
					ログイン
				</Button>
			</Link>
			<Link href="/signup" passHref>
				<Button
					className={classes.signUpButton}
					type="button"
					variant="outlined"
					color="inherit"
					size="small"
				>
					新規登録
				</Button>
			</Link>
		</div>
	);
};

export default NavBarMenu;
