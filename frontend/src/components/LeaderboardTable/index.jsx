import React from "react";
import "./index.css";

function LeaderboardTable({ jokes }) {
	return (
		<div class="leaderboardWrapper">
			<table>
				<thead>
					<tr>
						<td>Rank</td>

						<td>Summary</td>

						<td>Author</td>

						<td>ELO</td>
					</tr>
				</thead>
				<tbody>
					{jokes.map((joke, key) => {
						console.log(joke);
						return (
							<tr key={key}>
								<td className="rankCell">{joke.Rank}</td>
								<td className="summaryCell">
									{joke.Summary.split("\\n").map((item, idx) => {
										return (
											<React.Fragment key={idx}>
												{item}
												<br />
											</React.Fragment>
										);
									})}
								</td>
								<td className="authorCell">{joke.Author}</td>
								<td className="eloCell">{joke.ELO}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default LeaderboardTable;
