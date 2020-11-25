import React from "react";
import NextDocument, {Html, Head, Main, NextScript} from "next/document";
import {ServerStyleSheets} from "@material-ui/styles";
import Document from "next/document";
import style from "../static/styles/indexStyle";

type Props = {}

class SummiterHubDocument extends NextDocument<Props> {
	render() {
		return (
			<Html lang="ja">
				<Head>
					{style}
				</Head>
				<body>
				<Main/>
				<NextScript/>
				</body>
			</Html>
		)
	}
}

SummiterHubDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};

export default SummiterHubDocument
