import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip";
// import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import {SEARCHED_PLAN} from "../../interfaces/planTypes";
import {Grid} from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
// import CardMedia from "@material-ui/core/CardMedia";
// import Image from 'next/image';

import styles from './SearchItem.module.css'
import {useRouter} from "next/router";

const useStyles = makeStyles( {
	mainCard: {
		minWidth: 275,
	},
	// bullet: {
	// 	display: 'inline-block',
	// 	margin: '0 2px',
	// 	transform: 'scale(0.8)',
	// },
	// title: {
	// 	fontWeight: 700,
	// },
	// pos: {
	// 	marginBottom: 12,
	// },
	purposeType: {
		display: 'flex',
		alignItems: 'center',
	},
	bookmark: {
		padding: '4px',
	},
	prefecture: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	cardActionButton: {
		float: 'right',
	}
});

type Props = {
	plan: SEARCHED_PLAN;
}

const SearchItem: React.FC<Props> = ({plan}: Props) => {
	const classes = useStyles();
	const dummyMountain = '　';

	const router = useRouter();

	const handleDetail = () => {
		router.push(`/search/${plan.id}`).then().catch();
	}

	return (
		<Card className={classes.mainCard} variant="outlined">
			<CardContent>
				<Grid container spacing={1}>
					<Grid item xs={10} className={classes.purposeType}>
						<Chip label={plan.purpose_type_name} color='secondary' variant='outlined'/>
					</Grid>
					<Grid item xs={2}>
						{/*<IconButton color='secondary' aria-label='bookmark' className={classes.bookmark}>*/}
						{/*	<BookmarkBorderRoundedIcon fontSize='large'/>*/}
						{/*</IconButton>*/}
					</Grid>
					<Grid item xs={12}>
						<img src='/purpose/1_mountain.jpg' alt='' className={styles.purposeImage}/>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography color="textSecondary">
									{plan.entering_date} ~ {plan.descending_date}
								</Typography>
							</Grid>
							<Grid item xs={9}>
								<Typography variant="h5" component="h3" noWrap align='center'>
									{plan.mountain_first}
								</Typography>
							</Grid>
							<Grid item xs={3} className={classes.prefecture} justify='center'>
								<Typography color='textSecondary' variant="body2" component="p">
									{plan.prefecture_name}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Typography color='textPrimary' noWrap align='center' component='h4'>
							{plan.mountain_second ? plan.mountain_second : dummyMountain}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography color='textPrimary' noWrap align='center' component='h4'>
							{plan.mountain_third ? plan.mountain_third : dummyMountain}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography color='textPrimary' noWrap align='center' component='h4'>
							{plan.mountain_fourth ? plan.mountain_fourth : dummyMountain}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography color='textPrimary' noWrap align='center' component='h4'>
							{plan.mountain_fifth ? plan.mountain_fifth : dummyMountain}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions className={classes.cardActionButton}>
				<Button size='medium' variant='text' onClick={handleDetail}>詳細 <ArrowRightRoundedIcon/></Button>
			</CardActions>
		</Card>
	);
};

export default SearchItem;
