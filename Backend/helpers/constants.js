const { SSH_PASSWORD } = require('../config');

const SSH_TUNEL_CONFIG = {
    username:'administrateur',
    password: SSH_PASSWORD,
    host:'devicimongodb031.westeurope.cloudapp.azure.com',
    port:22,

    dstHost:'devicimongodb031',
    dstPort:30000,
     
    localHost:'127.0.0.1',
    localPort: 30000
}

const QUERY_NAMES = [
    "RU1", "RU2", "RU3", "RU4",
    "RDA1", "RDA2", "RDA3", "RDA4"
]


const QUERIES = {

    // User view

    RU1: {
        operation: "aggregate",
        query: [
            { 
                "$match": { 
                    "header_location": "London" 
                }
            },
            {
                "$project": {
                    "entreprise": "$header_employerName",
                    "location": "$header_location",
                },
            },
        ]
    },

    RU2: {
        operation: "aggregate",
        query: [
            {"$unwind": { 'path': '$salary_salaries' } }, 
            {"$match": { 'salary_salaries.salary_salaries_val_jobTitle': 'Project Manager' } },
            {"$group": { '_id': 'salaries', 'moyenne salaires': { "$avg": "$salary_salaries.salary_salaries_val_salaryPercentileMap_payPercentile50" }}}
        ]
    },


    RU3: {
        operation: "find",
        query: {
            'benefits_benefitRatingDecimal': 5
        }
    },

    RU4: {
        operation: "find",
        query: {
            "header_location": "Paris",
            "overview_sector": "Information Technology"
        }
    },

    // Data Analyst view

    RDA1: {
        operation: "aggregate",
        query: [
            {"$unwind": {'path': "$salary_salaries"}}, 
            {"$group": {'_id': {"$toInt": "$benefits_benefitRatingDecimal"},'average:': {"$avg": '$salary_salaries.salary_salaries_val_salaryPercentileMap_payPercentile50'}}}
        ]
    },

    RDA2: {
        operation: "aggregate",
        query: [
            {"$unwind": { 'path': "$salary_salaries" } }, 
            {"$group": {
                "_id": "$overview_sector",
                 "Average salary": {
                     "$avg": "$salary_salaries.salary_salaries_val_salaryPercentileMap_payPercentile50"
                  },
                 "Average number of comments": {
                     "$avg": { 
                         "$cond": { 
                             "if": { "$isArray": "$benefits_comments" }, 
                             "then": { "$size": "$benefits_comments" }, 
                             "else": "0"} 
                         }
                     }
                 }
            }    
        ]
    },

    RDA3: (timeRange,empNumber) => {
        return{
            operation: "aggregate",
            query: [
                {"$unwind": {'path': "$reviews"}},
                {"$match": {'overview_size': empNumber, 'reviews.reviews_val_date': timeRange}},
                {"$count": 'reviews'}        
            ]
        }
    },

    RDA4: {
        operation: "aggregate",
        query: [
            {"$group": {"_id" : {"employer": "$header_employerName", "country": "$map_country"}, 
            "total":{"$sum" :1}}},
            {"$project" : {"employer" : "$_id.employer", "country" : "$_id.country", "total" : "$total", "_id" : 0}}
        ]    
    }

}

RDA3_TIMERANGE_MAPPING = {
    "20M":"20 minutes ago",
    "1H":"1 hour ago",
    "10H":"10 hours ago",
    "1D":"yesterday",
    "3D":"3 days ago",
    "1W": "last week",
    "2W":"2 weeks ago",
    "4W":"4 weeks ago",
    "7W": "7 weeks ago"
}


RDA3_EMPNUMBER_MAPPING = {
    "L50":"1 to 50 employees",
    "L200":"51 to 200 employees",
    "L500":"201 to 500 employees",
    "L1000":"501 to 1000 employees",
    "L5000":"1001 to 5000 employees",
    "L10000":"5001 to 10000 employees",
    "M10000":"10000+ employees",
    "U":"Unknown"
}

module.exports = {
    SSH_TUNEL_CONFIG,
    QUERIES,
    QUERY_NAMES,
    RDA3_TIMERANGE_MAPPING,
    RDA3_EMPNUMBER_MAPPING
}