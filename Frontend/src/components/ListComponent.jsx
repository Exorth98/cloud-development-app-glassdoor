import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DispValue from '../components/DispValue';
import TabsValues from '../components/TabsValues';
import ComponentLine from '../components/ComponentLine';
import ComponentAccordion from '../components/ComponentAccordion';



const ListToPrint = ({dataToProcess, id}) => {

    var action
    if(Object.keys(dataToProcess).length>0){
        if(id === '0'){ //RU1 Ok
            action = <TabsValues data={dataToProcess}/>
        }
        if(id === '1'){ //RU2 OK
            action = <DispValue data={dataToProcess}/>
        }
        if(id === '2'){ //RU3 Faire avec des Accordions
            action = <ComponentAccordion data={dataToProcess}/>
        }
        if(id === '3'){ //RU4
            action = <ComponentAccordion data={dataToProcess}/>
        }
        if(id === '4'){ //RDA1
            action = <ComponentLine data={dataToProcess}/>
        }
        if(id === '5'){ //RDA2
            action = <TabsValues data={dataToProcess}/>
        }
        if(id === '6'){ //RDA3
            action = <DispValue data={dataToProcess} id={id}/>
        }
        if(id === '7'){ //RDA4
            action = <TabsValues data={dataToProcess}/>
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