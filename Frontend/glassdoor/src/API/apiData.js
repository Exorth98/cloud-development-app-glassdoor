import axios from 'axios';


export async function makeGetRequest({name}) {   
 let res = await axios.get(`http://localhost:5000/${name}`);         
 let data = res.data;
 return data;
 }

 export default makeGetRequest;
            
