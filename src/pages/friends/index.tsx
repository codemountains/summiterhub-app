import React from "react";
import Layout from "../../components/Layout";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const IndexFriends = () => {
	return (
		<Layout title='Friend'>
			<Container maxWidth='lg'>
				<h3>
					フレンド一覧
				</h3>
				<Typography>
					開発中...
				</Typography>
			</Container>
		</Layout>
	);
};

export default IndexFriends;
