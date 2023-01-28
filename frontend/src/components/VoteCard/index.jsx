import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function VoteCard({ joke, summary, author, onClick }) {
	return (
		<Card sx={{ maxWidth: 500, width: 450, height: 250 }}>
			<CardActionArea
				sx={{ height: 250 }}
				onClick={() => {
					onClick(joke);
				}}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{author}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{summary.split("\\n").map((item, idx) => {
							return (
								<React.Fragment key={idx}>
									{item}
									<br />
								</React.Fragment>
							);
						})}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
