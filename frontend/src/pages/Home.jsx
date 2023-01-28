import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	return (
		<div className="homeSection">
			<Button
				variant="contained"
				onClick={() => {
					navigate("/vote");
				}}
			>
				Start Voting
			</Button>
		</div>
	);
}

export default Home;
