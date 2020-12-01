import React, { useState ,useEffect } from 'react';
import {makeGetRequest} from '../API/apiData'
import Listcomponent from '../components/ListComponent'

const  Visualisation =  ({name,id}) => {
    const [myData, setMyData] = useState([]);
    const [numero] = useState(id);
     
        useEffect(()=>{
            //can't async the useEffect so we use that
            ( async ()=>{
                const myData = await makeGetRequest({name});
                setMyData(myData);
            })();
          }, [])

    return(
    <>
        <div>
           {numero === '0' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '1' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '2' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '3' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '4' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '5' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '6' && <Listcomponent dataToProcess={myData} id={numero}/>}
           {numero === '7' && <Listcomponent dataToProcess={myData} id={numero}/>}
        </div>
    </> 
    );
};

export default Visualisation;