from sshtunnel import SSHTunnelForwarder
import pymongo
import pprint
import time

MONGO_HOST = "devicimongodb031.westeurope.cloudapp.azure.com"
MONGO_DB = "glassdoor"
MONGO_USER = "administrateur"
MONGO_PASS = "fcwP6h3H"

server = SSHTunnelForwarder(
    MONGO_HOST,
    ssh_username=MONGO_USER,
    ssh_password=MONGO_PASS,
    remote_bind_address=(MONGO_DB, 22)
)

def ExecuteQuery(memoTime,db,numQuery):
    if numQuery not in memoTime:
        memoTime[numQuery] = []
    
    start_time = time.time()

    if numQuery == 0: 
        db.glassdoor.aggregate([
            { '$match': { 'header_location': 'London'}},
            { '$project': {'entreprise': '$header_employerName', 
                            'location': '$header_location'}}
            ])
    elif numQuery == 1:
        db.glassdoor.aggregate([
            {'$unwind': { 'path': '$salary_salaries' } }, 
            {'$match': { 'salary_salaries.salary_salaries_val_jobTitle': 'Project Manager' } },
            {'$group': { '_id': 'salaries', 
                        'moyenne salaires': { '$avg': '$salary_salaries.salary_salaries_val_salaryPercentileMap_payPercentile50' }}}
            ])
    elif numQuery == 2:
        db.glassdoor.find({'benefits_benefitRatingDecimal': 5})
    elif numQuery == 3:
        db.glassdoor.find({"header_location": "Paris", "overview_sector": "Information Technology"})
    elif numQuery == 4:
        db.glassdoor.aggregate([
            {'$unwind': {'path': '$salary_salaries'}}, 
            {'$group': {'_id': {'$toInt': '$benefits_benefitRatingDecimal'},
                        'average:': {'$avg': '$salary_salaries.salary_salaries_val_salaryPercentileMap_payPercentile50'}}}
            ])
    elif numQuery == 5:
        db.glassdoor.aggregate([
            {'$unwind': { 'path': '$salary_salaries' } }, 
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
            }])
    elif numQuery == 6:
        db.glassdoor.aggregate([
            {'$unwind': {'path': '$reviews'}},
            {'$match': {'overview_size': '10000+ employees',
                        'reviews.reviews_val_date': 'last week'}},
            {'$count': 'reviews'}
            ])

    else:
        db.glassdoor.aggregate([
            {"$group": {"_id" : {
                            "employer" : '$header_employerName',
                            "country":'$map_country'}, 
                            "total": {"$sum" :1}}
                        },
            {"$project" : {"employer" : '$_id.employer', 
                            "country" : '$_id.country', 
                            "total" : '$total', 
                            "_id" : 0}
                        }
            ])

    memoTime[numQuery].append(time.time() - start_time)

def GetAverage(memoTime, numQuery):
    timeArr = memoTime[numQuery]
    timeArr.remove(max(timeArr))
    timeArr.remove(min(timeArr))
    avg = sum(timeArr) / len(timeArr)
    print(f'----- Avg query n°{numQuery+1} = {str(round(avg*10, 5))} ms -----')


def GetTime():
    server.start()

    client = pymongo.MongoClient(MONGO_HOST, 30000)
    db = client[MONGO_DB]

    memoTime = {}

    for i in range(10):
        for numQuery in range(8):
            ExecuteQuery(memoTime,db,numQuery)
    for numQuery in range(8):
        GetAverage(memoTime,numQuery)

    server.stop()

GetTime()