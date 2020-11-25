import React from "react";
import Layout from "../../components/Layout";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const IndexBookmarks: React.FC = () => {
	return (
		<Layout title="Bookmark">
			<Container maxWidth='lg'>
				<h3>
					ブックマーク一覧
				</h3>
				<Typography>
					開発中...
				</Typography>
			</Container>
		</Layout>
	);
};

export default IndexBookmarks;
