import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function StatsDialog({ joke }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <p onClick={handleClickOpen}>
                {joke.Summary.split('\\n').map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {item}
                            <br />
                        </React.Fragment>
                    );
                })}
            </p>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Joke Stats</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>
                            {joke.Summary.split('\\n').map((item, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </p>
                        <p>{joke.Author}</p>
                    </DialogContentText>
                    <Box
                        noValidate
                        component='form'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',

                            width: '280px',
                            height: '300px',
                        }}
                    >
                        <p>ELO: {joke.ELO}</p>
                        <p>Streak: {joke.Streak}</p>
                        <p>Current Rank: {joke.Rank}</p>
                        <p>Previous Rank: {joke.PreviousRank}</p>
                        <p>Wins: {joke.Wins}</p>
                        <p>Losses: {joke.Losses}</p>
                        <p>Rounds: {joke.Losses}</p>
                        <p>Ratio: {(joke.Wins / joke.Losses).toFixed(1)}</p>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
