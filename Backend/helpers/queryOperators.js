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

module.exports = {aggregate, find}