const dbutil = require('./dbutil')

function insertTagBlogMapping(tagsId,blogId,success){
    const connection = dbutil.createConnection();
    const insertSql = 'insert into tags_blog_mapping (tags_id,blog_id) values (?,?)';
    const params = [tagsId,blogId];
    connection.connect();
    connection.query(insertSql,params,(error,data) => {
        if(error == null){
            success(data)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;