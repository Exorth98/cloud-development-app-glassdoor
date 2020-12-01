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
        const query = QUERIES[queryParam]
        try{
            result = await queryDB(query.query,query.operation)
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

app.get('/RDA3/:timeRange/:empNumber', async (req,res) => {
    let timeRange = req.params['timeRange']
    let empNumber = req.params['empNumber']
    if(timeRange && empNumber){
        timeRange = RDA3_TIMERANGE_MAPPING[timeRange]
        empNumber = RDA3_EMPNUMBER_MAPPING[empNumber]
        const query = QUERIES.RDA3(timeRange,empNumber)
        try{
            result = await queryDB(query.query,query.operation)
            res.send(result)
        }
        catch(e){
            res.send(e)
            console.error(e)
        }
    }
    else{
        res.send("Wrong timeRange or empNumber")
    }
})
   
app.listen(5000)



