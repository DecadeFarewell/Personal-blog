const dbutil = require('./dbutil')

function addComment({blog_id,parent,parent_name,user_name,e_mail,content,ctime,utime},success){
    const insertSql = 'insert into comments (blog_id,parent,parent_name,user_name,e_mail,content,ctime,utime) values (?,?,?,?,?,?,?,?)';
    const params = [blog_id,parent,parent_name,user_name,e_mail,content,ctime,utime];
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

function queryCommentsByBlogId(blog_id,success){
    const querySql = 'select * from comments where blog_id=? order by id desc';
    const params = [blog_id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

// 获取最新评论
function queryRecentComment(limit,success){
    const querySql = 'select * from comments order by id desc limit ?';
    const params = [limit]
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

module.exports.addComment = addComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryRecentComment = queryRecentComment;