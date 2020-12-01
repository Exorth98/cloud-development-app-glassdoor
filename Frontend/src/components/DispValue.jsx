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
    const [dateToGet, setDateToGet] = useState("last week");
    const [nbEmployees, setNbEmployees] = useState("10000+ employees");
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
          var name="RDA3?timeRange="+encodeURIComponent(dateToGet)+"&empNumber="+encodeURIComponent(nbEmployees);
          const myData = await makeGetRequest({name});
          setApiData(myData);
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
            <MenuItem value={"20 minutes ago"}>20 minutes ago</MenuItem>
            <MenuItem value={'1 hour ago'}>1 hour ago</MenuItem>
            <MenuItem value={'10 hours ago'}>10 hours ago</MenuItem>
            <MenuItem value={'yesterday'}>yesterday</MenuItem>
            <MenuItem value={'3 days ago'}>3 days ago</MenuItem>
            <MenuItem value={'last week'}>last week</MenuItem>
            <MenuItem value={'2 weeks ago'}>2 weeks ago</MenuItem>
            <MenuItem value={'4 weeks ago'}>4 weeks ago</MenuItem>
            <MenuItem value={'7 weeks ago'}>7 weeks ago</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Number of employees</InputLabel>
            <Select
            value={nbEmployees}
            onChange={handleChangeEmployees}
            label="Number of employees"
            >
            <MenuItem value={'1 to 50 employees'}>1 to 50 employees</MenuItem>
            <MenuItem value={'51 to 200 employees'}>51 to 200 employees</MenuItem>
            <MenuItem value={'201 to 500 employees'}>201 to 500 employees</MenuItem>
            <MenuItem value={'501 to 1000 employees'}>501 to 1000 employees</MenuItem>
            <MenuItem value={'1001 to 5000 employees'}>1001 to 5000 employees</MenuItem>
            <MenuItem value={'5001 to 10000 employees'}>5001 to 10000 employees</MenuItem>
            <MenuItem value={'10000+ employees'}>10000+ employees</MenuItem>
            <MenuItem value={'Unknown'}>Unknown</MenuItem>
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