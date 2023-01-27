import React from "react";
import { Route, Routes } from "react-router";
import Vote from "./Vote";

function PageRoutes(props) {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<p>Hi</p>}></Route>
				<Route exact path="/vote" element={<Vote></Vote>}></Route>

				<Route path="*" element={<div>Oh no! Page not found! </div>}></Route>
			</Routes>
		</div>
	);
}

PageRoutes.propTypes = {};

export default PageRoutes;
