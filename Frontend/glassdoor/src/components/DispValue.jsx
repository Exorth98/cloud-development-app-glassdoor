import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const DispValue = ({data}) => {
   // console.log({data});
    return(
        <div>
            <p>{data.salaries}</p>
        </div>
    );
};

export default DispValue;