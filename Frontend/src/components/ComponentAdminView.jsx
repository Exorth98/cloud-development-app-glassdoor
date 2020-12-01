import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeGetRequest} from '../API/apiData';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width:'80vw',
      margin:'auto',
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
    table: {
        minWidth: 650,
        width: '80vw',
        height: '40vh',
        margin:'auto',
      },
  });



const AdminView = () => {
    const [myData, setMyData] = useState(null);
    const classes = useStyles();
    //const shards = dataTest.shards; //change for myData §/////////////////////////////////////////////

    const renderValues = (data,shards) => (
        <>
        {console.log(Object.keys(shards))}
        <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Mongo
                    </Typography>
                    <Typography variant="body2" component="p">
                    <p>Number of Shards: {data.nb_shards}</p>
                    <p>Number of Documents: {data.nb_documents}</p>
                    <p>Chunks: {data.chunks}</p>
                    </Typography>
                </CardContent>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Shard's name</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">Number of documents</TableCell>
                                <TableCell align="right">Average objects size</TableCell>
                                <TableCell align="right">number of indexes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(Object.keys(shards)).map((shardKeys) => (
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                    {shardKeys}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                    {shards[shardKeys].size}
                                    </TableCell>   
                                    <TableCell align="right" component="th" scope="row">
                                    {shards[shardKeys].nb_documents}
                                    </TableCell>    
                                    <TableCell align="right" component="th" scope="row">
                                    {shards[shardKeys].avg_obj_size}
                                    </TableCell>    
                                    <TableCell align="right" component="th" scope="row">
                                    {shards[shardKeys].nb_indexes}
                                    </TableCell>       

                                </TableRow>   
                                
                                
                             ))}
                        </TableBody>
                    </Table>
                </TableContainer>

        </Card>
        </>
    )
          useEffect(()=>{
            ( async ()=>{
                const data = await makeGetRequest({name:'stats'});
                 setMyData(data);     
            })();
          }, [])

    
    return(
        <div>
            <h1>Admin view</h1>
            {myData && renderValues(myData, myData.shards)}
            {!myData && <CircularProgress />}

        </div>     
    );
};

export default AdminView;