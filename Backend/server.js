const express = require('express')
const app = express()
require('dotenv').config({path: '.env'})

const {QUERIES, QUERY_NAMES} = require('./helpers/constants')
const {queryDB} = require('./helpers/dbConnector')

app.get('/', (req, res) => {
    res.send('Hello World')
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
   
app.listen(3000)


// TEST

// RU1_res = query_aggregate(RU1)
// RU3_res = query_find(RU3)
// RU4_res = query_find(RU4)



