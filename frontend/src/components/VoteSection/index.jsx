import React from 'react';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { elo, expected, getRandomInt } from '../../helpers';
import VoteCard from '../VoteCard';
import './index.css';
import { useNavigate } from 'react-router';

const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
let base = new Airtable({ apiKey: airtableKey }).base(baseId);

function VoteSection() {
    let [jokes, setJokes] = useState([]);
    let [change, setChange] = useState(false);
    let [rounds] = useState([]);
    let [currRound, setCurrRound] = useState(0);
    let navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let createRounds = () => {
        const res = {};
        let i = 0;
        while (i < 10) {
            const a = getRandomInt(0, jokes.length);
            const b = getRandomInt(0, jokes.length);
            if (!(a in res) && !(b in res) && a !== b) {
                res[a] = true;
                res[b] = true;
                jokes[a].fields.id = jokes[a].id;
                jokes[b].fields.id = jokes[b].id;
                rounds.push([jokes[a].fields, jokes[b].fields]);
                i++;
            }
        }
    };

    let updateElos = (winner, loser) => {
        let changes = [
            {
                id: winner.id,
                fields: {
                    ELO: winner.ELO,
                    Wins: winner.Wins + 1,
                    Streak: winner.Streak + 1,
                    Rounds: winner.Rounds + 1,
                },
            },
            {
                id: loser.id,
                fields: {
                    ELO: loser.ELO,
                    Losses: loser.Losses + 1,
                    Streak: 0,
                    Rounds: loser.Rounds + 1,
                },
            },
        ];

        base('Jokes').update(changes, function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
        });
    };

    let calculateElos = (winner, loser) => {
        let exp = expected(winner.ELO, loser.ELO);

        let newEloWinner = Math.round(elo(winner.ELO, exp, 1, 32));
        let newEloLoser = Math.round(elo(loser.ELO, exp, 0, 32));

        return {
            newEloLoser,
            newEloWinner,
        };
    };

    let calculateWinAndUpdate = (chosen) => {
        let notChosen =
            rounds[currRound][0] === chosen
                ? rounds[currRound][1]
                : rounds[currRound][0];
        let result = calculateElos(chosen, notChosen);

        chosen.ELO = result.newEloWinner;
        notChosen.ELO = result.newEloLoser;
        updateElos(chosen, notChosen);
    };

    let castVote = (chosen) => {
        if (currRound < rounds.length - 1) {
            calculateWinAndUpdate(chosen);
            setCurrRound(currRound + 1);
        } else {
            calculateWinAndUpdate(chosen);
            navigate('/leaderboard');
        }
    };

    useEffect(() => {
        let fetchData = () => {
            if (jokes.length < 1) {
                base('Jokes')
                    .select()
                    .all()
                    .then((records) => {
                        records.forEach(function (record) {
                            jokes.push(record);

                            setJokes(jokes);
                        });
                        setChange(true);
                        createRounds();
                    });
            }
        };
        fetchData();
    }, [change, createRounds, jokes]);

    return (
        rounds && (
            <div>
                <h2 className='roundCount'>
                    {' '}
                    {currRound}/{rounds.length}
                </h2>
                {rounds.length > 1 && (
                    <div className='voteSection'>
                        <VoteCard
                            joke={rounds[currRound][0]}
                            summary={rounds[currRound][0].Summary}
                            author={rounds[currRound][0].Author}
                            onClick={castVote}
                        />
                        <h2>OR</h2>
                        <VoteCard
                            joke={rounds[currRound][1]}
                            summary={rounds[currRound][1].Summary}
                            author={rounds[currRound][1].Author}
                            onClick={castVote}
                        />
                    </div>
                )}
            </div>
        )
    );
}

export default VoteSection;
