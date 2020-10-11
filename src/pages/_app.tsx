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
	},
	typography: {
		fontSize: 14,
		button: {
			textTransform: "none"
		}
	},
	props: {
		MuiTextField: {
			variant: "outlined"
		}
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
				<Component {...pageProps} />
			</Provider>
		</MuiThemeProvider>
	);
};

export default SummiterHubApp;
