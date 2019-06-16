const dbutil = require('./dbutil')

function insertEveryDay(content,ctime,success){
    const insertSql = 'insert into every_day (content,ctime) values (?,?)';
    const params = [content,ctime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

function queryEveryDay(success){
    //按照id倒序排序，且只取一个
    const querySql = 'select * from every_day order by id desc limit 1';
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;