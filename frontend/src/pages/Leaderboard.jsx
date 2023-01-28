import React, { useEffect, useState } from "react";
import LeaderboardTable from "../components/LeaderboardTable";
import Airtable from "airtable";

import { calculateRank } from "../helpers";

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
let base = new Airtable({ apiKey: airtableKey }).base(baseId);

function Leaderboard() {
	let [jokes, setJokes] = useState([]);
	let [change, setChange] = useState(false);

	useEffect(() => {
		let fetchData = () => {
			if (jokes.length < 1) {
				base("Jokes")
					.select()
					.all()
					.then((records) => {
						records.forEach(function (record) {
							jokes.push(record.fields);

							setJokes(jokes);
						});
						setJokes(calculateRank(jokes));

						setChange(true);
					});
			}
		};
		fetchData();
	}, [change, jokes]);

	return (
		jokes.length > 1 && (
			<div className="leaderboardMain">
				<h1 className="leaderboardTitle"> Power Rankings</h1>
				<LeaderboardTable jokes={jokes} />
			</div>
		)
	);
}

export default Leaderboard;
