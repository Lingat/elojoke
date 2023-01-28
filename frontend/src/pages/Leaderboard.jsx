import React, { useEffect, useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import Airtable from 'airtable';

import { calculateRank } from '../helpers';

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
let base = new Airtable({ apiKey: airtableKey }).base(baseId);

function Leaderboard() {
    let [jokes, setJokes] = useState([]);

    let updateLeaderboard = () => {
        base('Jokes')
            .select()
            .all()
            .then((records) => {
                let updatedJokes = [];
                records.forEach(function (record) {
                    record.fields.Key = record.id;
                    updatedJokes.push(record.fields);
                });
                updatedJokes = calculateRank(updatedJokes);

                updatedJokes.forEach((joke) => {
                    base('Jokes').update(
                        [
                            {
                                id: joke.Key,
                                fields: joke,
                            },
                        ],
                        function (err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        }
                    );
                });
                setJokes(updatedJokes);
            });
    };

    useEffect(() => {
        let fetchData = () => {
            if (jokes.length < 1) {
                updateLeaderboard();
            }
        };
        fetchData();
    }, [jokes]);

    return (
        jokes.length > 1 && (
            <>
                <div className='leaderboardMain'>
                    <h1 className='leaderboardTitle'> Power Rankings</h1>
                    <LeaderboardTable jokes={jokes} />
                </div>
                <footer className='shamelessPlug'>
                    <p>
                        Created by{' '}
                        <a href='https://pierrelingat.web.app/'>
                            Pierre Lingat
                        </a>
                    </p>
                </footer>
            </>
        )
    );
}

export default Leaderboard;
