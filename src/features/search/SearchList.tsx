import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {fetchAsyncSearchPlan, selectSearchedPlans, selectSearchParams, editSearchParams} from "./searchSlice";
import SearchItem from "./SearchItem";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles( {
	titleContainer: {
		margin: '16px',
	},
	searchContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBox: {
		margin: '8px',
		width: '360px',
	}
});


const SearchList: React.FC = () => {
	const classes = useStyles();

	const dispatch: AppDispatch = useDispatch();
	const searched_plans = useSelector(selectSearchedPlans);
	const search_prams = useSelector(selectSearchParams);

	useEffect(() => {
		const searchPlans = async () => {
			await dispatch(fetchAsyncSearchPlan(search_prams));
		};
		searchPlans().then().catch();
	}, [dispatch])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string  = event.target.value;
		const name: string = 'mountain';
		dispatch(editSearchParams({...search_prams, [name]: value}));
	};

	const handleSearch = async () => {
		await dispatch(fetchAsyncSearchPlan(search_prams));
	}

	return (
		<div style={{marginTop: '16px'}}>
			<Container maxWidth='lg'>
				<div className={classes.titleContainer}>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant='h4' color='textSecondary'>
								みんなの登山計画
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<div className={classes.searchContainer}>
								<TextField
									className={classes.searchBox}
									id="input-with-icon-search-box"
									size='medium'
									placeholder='山名で検索'
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchRoundedIcon/>
											</InputAdornment>
										),
									}}
									onChange={handleInputChange}
								/>
								<Button
									variant='contained'
									color='primary'
									size='large'
									onClick={handleSearch}
								>
									検索
								</Button>
							</div>
						</Grid>
					</Grid>
				</div>
				<Grid container spacing={2}>
					{searched_plans.map((plan) => (
						<Grid key={plan.id} item xs={12} sm={6} md={4} lg={3}>
							<SearchItem plan={plan}/>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default SearchList;
