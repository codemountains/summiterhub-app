import React from "react";
import Layout from "../components/Layout";
import SearchList from "../features/search/SearchList";

const IndexPage = () => {
	return (
		<Layout title="Home">
			<SearchList/>
		</Layout>
	);
};

export default IndexPage;
