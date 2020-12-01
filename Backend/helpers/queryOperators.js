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

const stats = (collection) => new Promise( (resolve, reject) => {
    try{
        const res = collection.stats()
        resolve(res)
    }
    catch(e){reject(e)}
})

module.exports = {aggregate, find, stats}