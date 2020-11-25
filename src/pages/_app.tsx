import React, {useEffect} from "react";
import Head from "next/head";
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../app/store";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#62727b',
			main: '#37474f',
			dark: '#102027',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#a4a4a4',
			main: '#757575',
			dark: '#494949',
			contrastText: '#ffffff',
		},
		error: {
			light: '#ff867a',
			main: '#ef534e',
			dark: '#b61825',
			contrastText: '#ffffff',
		},
		warning: {
			light: '#ffd95d',
			main: '#ffa726',
			dark: '#c77800',
			contrastText: '#ffffff',
		},
		info: {
			light: '#80d6ff',
			main: '#42a5f5',
			dark: '#0077c2',
			contrastText: '#ffffff',
		},
		success: {
			light: '#96ed98',
			main: '#64ba69',
			dark: '#31893d',
			contrastText: '#ffffff',
		},
	},
	typography: {
		fontSize: 14,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		button: {
			textTransform: 'none'
		},
	},
	props: {
		MuiTextField: {
			variant: 'outlined'
		},
	},
})

const SummiterHubApp = ({Component, pageProps}: AppProps) => {
	useEffect(() => {
		const jssStyles: HTMLElement | null = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, [])

	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Head>
					{/*<meta name="viewport" content="viewport-fit=cover"/>*/}
					<meta charSet="utf-8"/>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<title/>
				</Head>
				<Component {...pageProps}/>
			</Provider>
		</MuiThemeProvider>
	);
};

export default SummiterHubApp;
