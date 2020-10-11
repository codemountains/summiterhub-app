import React, {ReactNode} from 'react'
import Head from 'next/head'
import NavBar from "./NavBar";
import style from "../static/layoutStyle";

type Props = {
	children?: ReactNode
	title?: string
}

const Layout = ({children, title = 'SummiterHub'}: Props) => {
	return (
		<div>
			<Head>
				<title>{title}: SummiterHub</title>
				<meta charSet="utf-8"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
				{style}
			</Head>
			<NavBar/>
			<div className="childrenContainer">
				{children}
			</div>
			<footer>
				<hr/>
				<span>I'm here to stay (Footer)</span>
			</footer>
		</div>
	);
};

export default Layout;
