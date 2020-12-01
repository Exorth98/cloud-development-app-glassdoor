import React from 'react';
import data from '../API/data'
import DataVisualisation from '../components/DataVisualisation'

const componentPrinted = ({id}) => {
    return(
        
        <div>
              <h1>{data[id].name}</h1>
                <p>{data[id].description}</p>
                <DataVisualisation name={data[id].name} id={id} />
        </div>
        //useEffect()
        
    );
};

export default componentPrinted;