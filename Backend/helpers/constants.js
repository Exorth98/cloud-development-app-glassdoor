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

    RU1: {
        operation: "aggregate",
        query: [
            { 
                $match: { 
                    header_location: "London" 
                }
            },
            {
                $project: {
                    entreprise: "$header_employerName",
                    location: "$header_location",
                },
            },
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
    }

}

module.exports = {
    SSH_TUNEL_CONFIG,
    QUERIES,
    QUERY_NAMES
}