import React from 'react';
import data from '../API/data'

const componentPrinted = ({id}) => {
    return(
        <div>
              <h1>{data[id].name}</h1>
                <p>{data[id].description}</p>
        </div>
        //useEffect()
    );
};

export default componentPrinted;