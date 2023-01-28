import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function VoteCard({ summary, author, onClick }) {
    return (
        <Card sx={{ maxWidth: 345, width: 400, height: 200 }}>
            <CardActionArea sx={{ height: 200 }} onClick={onClick}>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {author}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        {summary.split('\n').map((item, idx) => {
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
