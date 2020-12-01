import axios from 'axios';


export async function makeGetRequest({name}) {   
    let res = await axios.get(`http://localhost:5000/${name}`);   
    return res.data;
 }

 export default makeGetRequest;
            
