import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: '40vw',
      margin: 'auto'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const DispValue = ({data}) => {
    const classes = useStyles();

    const attributs = {data}.data[0];
    console.log(Object.keys(attributs));
    return(
        <div>
            {data.map((row) => (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
               {Object.keys(attributs).map((row2) =>(
                 <Typography variant="h5" component="h2">{row[row2]} </Typography>
               ))}
                </CardContent>
               </Card>
            ))} 
        </div>
    );
};

export default DispValue;