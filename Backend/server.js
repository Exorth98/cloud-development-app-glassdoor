const express = require('express')
const app = express()
require('dotenv').config({path: '.env'})

const {
    RDA3_TIMERANGE_MAPPING,
    RDA3_EMPNUMBER_MAPPING,
    QUERIES,
    QUERY_NAMES
} = require('./helpers/constants')

const {queryDB} = require('./helpers/dbConnector')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/stats', async (req, res) => {
    try{
        result = await queryDB(null,"stats")
        res.send(result)
    }
    catch(e){
        res.send(e)
        console.error(e)
    }
})

app.get('/:query', async (req, res) => {
    const queryParam = req.params['query']
    if (QUERY_NAMES.includes(queryParam)){
        const queryInfo = QUERIES[queryParam](req.query)
        // res.send(queryInfo)
        try{
            result = await queryDB(queryInfo.query,queryInfo.operation)
            res.send(result)
        }
        catch(e){
            res.send(e)
            console.error(e)
        }
    }
    else{
        res.send("Wrong query name")
    }
})
   
app.listen(5000)



