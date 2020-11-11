import React, { useState  } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DispValue from '../components/DispValue';
import TabsValues from '../components/TabsValues';



const ListToPrint = ({dataToProcess, id}) => {

    var action
    if(Object.keys(dataToProcess).length>0){
        if(id === '0'){
            action = <TabsValues data={dataToProcess}/>
        }
        if(id === '1'){
            action = <DispValue data={dataToProcess}/>
        }
        
    }else{
        action = <CircularProgress />
    }
     
   
    return(
        <div>
              {action}
        </div>
    );
};

export default ListToPrint;