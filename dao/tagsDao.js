const dbutil = require('./dbutil');

function queryTag(tag,success){
    const querySql = `select * from tags where tags=?`;
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,data) => {
        if(error == null){
            success(data)
        } else {
            throw new Error(error)
        }
    })
    connection.end();
}

function insertTag(tag,ctime,utime,success){
    const insertSql = `insert into tags (tags,ctime,utime) values(?,?,?)`;
    const params = [tag,ctime,utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(error,data) => {
        if(error == null){
            success(data)
        } else {
            throw new Error(error)
        }
    })
    connection.end();
}

function queryRamdonTags(success){
    const querySql = `select * from tags limit 20`;
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,(error,data) => {
        if(error == null){
            success(data)
        } else {
            throw new Error(error)
        }
    })
    connection.end();
}

module.exports.queryTag = queryTag;
module.exports.insertTag = insertTag;
module.exports.queryRamdonTags = queryRamdonTags;
