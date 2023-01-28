import React from 'react';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { getRandomInt } from '../../helpers';
import VoteCard from '../VoteCard';
import './index.css';

const airtableKey = 'keyrY4bCSA8vsHJHp';
const baseId = 'appbHf4I7EV9gwxpB';

let base = new Airtable({ apiKey: airtableKey }).base(baseId);

function VoteSection() {
    let [jokes, setJokes] = useState([]);
    let [change, setChange] = useState(false);
    let [rounds] = useState([]);
    let [currRound, setCurrRound] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let createRounds = () => {
        const res = {};
        let i = 0;
        while (i < jokes.length / 2) {
            const a = getRandomInt(0, jokes.length);
            const b = getRandomInt(0, jokes.length);
            if (!(a in res) && !(b in res) && a !== b) {
                res[a] = true;
                res[b] = true;
                rounds.push([jokes[a].fields, jokes[b].fields]);
                i++;
            }
            console.log(rounds);
        }
    };

    let castVote = () => {
        if (currRound < rounds.length - 1) setCurrRound(currRound + 1);
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
                <h2 className='roundCount'> Round: {currRound}</h2>
                {rounds.length > 1 && (
                    <div className='voteSection'>
                        <VoteCard
                            summary={rounds[currRound][0].Summary}
                            author={rounds[currRound][0].Author}
                            onClick={castVote}
                        />
                        <h1>OR</h1>
                        <VoteCard
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
