import React from 'react';
import StatsDialog from '../StatsDialog';
import './index.css';

function LeaderboardTable({ jokes }) {
    const rankChangeEmoji = (joke) => {
        if (joke.Rank < joke.PreviousRank) {
            return '⬆️';
        } else if (joke.Rank > joke.PreviousRank) {
            return '⬇️';
        }
        return '';
    };

    const streakEmoji = (joke) => {
        return joke.Streak >= 3 ? '🔥' : '';
    };
    return (
        <div className='leaderboardWrapper'>
            <table>
                <thead>
                    <tr>
                        <td className='rankCell'>Rank</td>

                        <td className='summaryCell'>Summary</td>

                        <td className='authorCell'>Author</td>

                        <td className='eloCell'>ELO</td>
                    </tr>
                </thead>
                <tbody>
                    {jokes.map((joke, key) => {
                        return (
                            <tr key={key}>
                                <td className='rankCell'>
                                    {rankChangeEmoji(joke)} {joke.Rank}
                                </td>
                                <td className='summaryCell'>
                                    <StatsDialog joke={joke} />
                                </td>
                                <td className='authorCell'>{joke.Author}</td>
                                <td className='eloCell'>
                                    {' '}
                                    {joke.ELO} {streakEmoji(joke)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardTable;
