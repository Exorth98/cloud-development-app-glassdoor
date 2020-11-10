const tunnel = require('tunnel-ssh');
const MongoClient = require('mongodb').MongoClient

require('dotenv').config({path: '.env'})

const config = {
    username:'administrateur',
    password: process.env.SSH_PASSWORD,
    host:'devicimongodb031.westeurope.cloudapp.azure.com',
    port:22,

    dstHost:'devicimongodb031',
    dstPort:30000,

    localHost:'127.0.0.1',
    localPort: 30000
};

const aggregate = (collection, command) => new Promise( (resolve, reject) => {
    res = collection.aggregate(command).toArray( (err, docs) => {
        if(err) reject(err)
        else resolve(docs)
    })
})

const find = (collection, command) => new Promise( (resolve, reject) => {
    res = collection.find(command).toArray( (err, docs) => {
        if(err) reject(err)
        else resolve(docs)
    })
})

const queryDB = (query, operation) => new Promise ( (resolve, reject) => {

    // console.log("Connecting tunnel...")
    tunnel(config, (error, server) => {

        if(error) reject(error)
        // console.log("Tunnel connected successfully")
    
        // console.log("Connecting to mongo client...")
        MongoClient.connect("mongodb://127.0.0.1:30000", async (err, mongoClient) => {

            if(err) reject(err)
            // console.log("Mongo Client connected successfully")

            try{ 
                const db = mongoClient.db("glassdoor");    
                const collection = db.collection('glassdoor');
        
                // console.log("Running aggregate query...")
                response = await operation(collection, query)
                console.log(`Query returned ${response.length} records.`)

                mongoClient.close();
                resolve(response)
            }
            catch(e){reject(e)}
        });
    });
})

const query_aggregate = async (query) => {
    res = await queryDB(query, aggregate)
    console.log(res)
    return res
}

const query_find = async (query) => {
    res = await queryDB(query, find)
    console.log(res)
    return res
}

// TEST

const RU1 = [
    { $match: { header_location: "London" } },
    {
      $project: {
        entreprise: "$header_employerName",
        location: "$header_location",
      },
    },
  ]

const RU3 = {
	'benefits_benefitRatingDecimal': 5
}

const RU4 = {
    "header_location": "Paris", "overview_sector": "Information Technology"
}

// RU1_res = query_aggregate(RU1)
// RU3_res = query_find(RU3)
RU4_res = query_find(RU4)



