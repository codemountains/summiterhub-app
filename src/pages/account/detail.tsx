import React from 'react';
import Layout from "../../components/Layout";
import {Container} from "@material-ui/core";

const Detail: React.FC = () => {
	return (
		<Layout title='Account'>
			<Container>
				<h1>
					アカウント情報
				</h1>
			</Container>
		</Layout>
	);
};

export default Detail;
