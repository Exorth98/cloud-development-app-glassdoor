import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {makeGetRequest} from '../API/apiData';


const useStyles = makeStyles((theme) => ({
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
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    actionButton:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
    }
    
    
  }));

  const convertType = (attribut) => {
    if(typeof attribut === 'number'){
        if(attribut % 1 === 0){
            return attribut;
        }else{
            return attribut.toFixed(2);
        }
        
    }
    return attribut;
} 




const DispValue = ({data, id}) => {
    const classes = useStyles();

    const [msg, setMessage] = useState ("Load data");
    const [dateToGet, setDateToGet] = useState(null);
    const [nbEmployees, setNbEmployees] = useState(null);
    const [apiData, setApiData] = useState(null);

    var attributs = null
    if(data){
      attributs = {data}.data[0];
    }

 

    const handleChangeDate =  (event) => {
      setDateToGet(event.target.value);
    };
    
    const handleChangeEmployees = (event) => {
      setNbEmployees(event.target.value);
    };

    const handleRequest = () => {
      ( async ()=>{
        if(dateToGet!=null && nbEmployees!=null){
          var name="RDA3?timeRange="+dateToGet+"&empNumber="+nbEmployees
          //const myData = await makeGetRequest({name});
          //setApiData(myData);
          console.log(name);
        }else{
          alert("Please fill the fields");
        }
        
    })();
    };

    const renderSelect = (classes, data) => (
      
      
      <div className={classes.actionButton}>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Date</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={dateToGet}
            onChange={handleChangeDate}
            label="Date"
            >
            <MenuItem value={"20M"}>20 minutes ago</MenuItem>
            <MenuItem value={'1H'}>1 hour ago</MenuItem>
            <MenuItem value={'10H'}>10 hours ago</MenuItem>
            <MenuItem value={'1D'}>yesterday</MenuItem>
            <MenuItem value={'3D'}>3 days ago</MenuItem>
            <MenuItem value={'1W'}>last week</MenuItem>
            <MenuItem value={'2W'}>2 weeks ago</MenuItem>
            <MenuItem value={'4W'}>4 weeks ago</MenuItem>
            <MenuItem value={'7W'}>7 weeks ago</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Number of employees</InputLabel>
            <Select
            value={nbEmployees}
            onChange={handleChangeEmployees}
            label="Number of employees"
            >
            <MenuItem value={'L50'}>1 to 50 employees</MenuItem>
            <MenuItem value={'L200'}>51 to 200 employees</MenuItem>
            <MenuItem value={'L500'}>201 to 500 employees</MenuItem>
            <MenuItem value={'L1000'}>501 to 1000 employees</MenuItem>
            <MenuItem value={'L5000'}>1001 to 5000 employees</MenuItem>
            <MenuItem value={'L10000'}>5001 to 10000 employees</MenuItem>
            <MenuItem value={'M10000'}>10000+ employees</MenuItem>
            <MenuItem value={'U'}>Unknown</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRequest}>
              {msg}
            </Button> 
      </div>
    )

    const renderValues = (data) => (
      <>
      {data.map((row) => (
        <Card className={classes.root} variant="outlined">
            <CardContent>
       {Object.keys(attributs).map((row2) =>(
         <Typography variant="h5" component="h2">{convertType(row[row2])}</Typography>
       ))}
        </CardContent>
       </Card>
    ))} 
    </>
    )
    
    var action;
    if(apiData == null){
    if(data && data.length>0){
      action = renderValues(data);
    }
    else{
      action = <CircularProgress />
    }
  }else{
    action = renderValues(apiData)
  }

    return(
        <div>

          {(id) && renderSelect(classes, data)}

          {action}
          
            
            
        </div>
    );
};

export default DispValue;