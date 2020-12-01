import React from 'react';
import teamData from '../API/teamData'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width:'30vw',
      height:'17vh',
      margin:'auto',
      marginTop:'2vh',
      overflowY:'auto'
      
    },
    title: {
      fontSize: 12,
    },
    pos: {
      marginBottom: 12,
    },
  });

const ComponentAccordion = () => {
      const classes = useStyles();

    return(
        <div>
            {teamData.map((row) => (
                <Card className={classes.root}> 
                    <CardContent>
                        <Typography variant="h6" component="h3">
                            {row.name}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" >
                             {row.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" color="primary"><a href={row.linkedin} className="linkA" target="_blank">Linkedin</a></Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default ComponentAccordion;