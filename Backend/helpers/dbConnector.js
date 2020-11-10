const tunnel = require('tunnel-ssh');
const MongoClient = require('mongodb').MongoClient

const {aggregate, find} = require('./queryOperators')
const {SSH_TUNEL_CONFIG} = require("./constants");

const queryDB = (query, operation) => new Promise ( (resolve, reject) => {

    const operator = operation == "find" ? find : aggregate

    console.log("Connecting tunnel...")
    tunnel(SSH_TUNEL_CONFIG, (error, server) => {

        if(error) reject(error)
        console.log("Tunnel connected successfully")
    
        console.log("Connecting to mongo client...")
        MongoClient.connect("mongodb://127.0.0.1:30000", async (err, mongoClient) => {

            if(err) reject(err)
            console.log("Mongo Client connected successfully")

            try{ 
                const db = mongoClient.db("glassdoor");    
                const collection = db.collection('glassdoor');
        
                console.log("Running query...")
                const response = await operator(collection, query)
                console.log(`Query returned ${response.length} records.`)

                mongoClient.close();
                console.log(response)
                resolve(response)
            }
            catch(e){reject(e)}
        });
    });
})

module.exports = {queryDB}





