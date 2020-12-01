const filterStats = (stats) => {

    res = {
        "nb_shards":Object.keys(stats["shards"]).length,
        "nb_documents": stats["count"],
        "avg_obj_size": stats["avgObjSize"],
        "chunks": stats["nchunks"],
        "shards": {}
    }

    for(sh in stats["shards"]){
        res["shards"][sh] = {
            "size": stats["shards"][sh]["size"],
			"nb_documents": stats["shards"][sh]["count"],
			"avg_obj_size": stats["shards"][sh]["avgObjSize"],
			"nb_indexes": stats["shards"][sh]["nindexes"],
        }
    }

    return res
}

module.exports = {filterStats}