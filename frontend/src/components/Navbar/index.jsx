import React from 'react';
import './index.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BallotIcon from '@mui/icons-material/Ballot';
import { useNavigate } from 'react-router';
function Navbar() {
    let navigate = useNavigate();
    return (
        <div className='navbar'>
            <div className='navbarTitle'>
                <h1
                    onClick={() => {
                        navigate('/vote');
                    }}
                >
                    {' '}
                    Rank a Joke
                </h1>
            </div>
            <div
                onClick={() => {
                    navigate('/vote');
                }}
                className='navbarNavigateBtn'
            >
                <BallotIcon />
            </div>
            <div
                onClick={() => {
                    navigate('/leaderboard');
                }}
                className='navbarNavigateBtn'
            >
                <LeaderboardIcon />
            </div>
        </div>
    );
}

export default Navbar;
