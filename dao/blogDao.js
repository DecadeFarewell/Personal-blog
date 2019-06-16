const dbutil = require('./dbutil')

//插入博客文章
function insertBlog(title, content, tags, ctime, utime, views, success) {
    const insertSql = 'insert into blog (title,content,tags,ctime,utime,views) values (?,?,?,?,?,?)';
    const params = [].slice.call(arguments, 0, -1);
    // const params = [title,content,tags,ctime,utime,views];
    const connection = dbutil.createConnection();
    connection.connect();
        connection.query(insertSql, params, (error, result) => {
            if (error == null) {
                success(result)
            } else {
                throw new Error(error);
            }   
        })
    connection.end();
}

//按照当前页数查询博客文章
function queryBlog(page, pageSize, success) {
    const querySql = 'select * from blog order by id desc limit ?,?;';
    const params = [page * pageSize, pageSize];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

//查询所有的博客文章数量
function queryBlogCount(success) {
    const querySql = 'select count(*) as count from blog';
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}
//通过博客id查询文章
function queryBlogById(blog_id, success) {
    const querySql = 'select * from blog where id=?'
    const params = [blog_id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}
//通过标签查询一类文章
function queryBlogByTag(tag, page, pageSize, success) {
    const querySql = 'select * from blog where tags=? limit ?,?'
    const params = [tag, page * pageSize, pageSize];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}
//查询某一标题的文章总数量
function queryBlogCountByTags(tag, success) {
    const querySql = 'select count(*) as count from blog where tags=?'
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}
//增加文章的浏览次数
function addViews(blog_id, success) {
    const updateSql = 'update blog set views = views + 1 where id=?'
    const params = [blog_id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

function queryBlogBySearchWord(searchWord, page, pageSize, success) {
    // const querySql = 'select * from blog where title like %?% limit ?,?'
    const querySql = `select * from blog where title like ? limit ?,?`;
    const params = [`%${searchWord}%`, page * pageSize, pageSize];
    console.log(params)
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result)
        } else {
            throw new Error(error);
        }
    })
    connection.end();
}

module.exports.queryBlogCount = queryBlogCount;
module.exports.insertBlog = insertBlog;
module.exports.queryBlog = queryBlog;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogByTag = queryBlogByTag;
module.exports.addViews = addViews;
module.exports.queryBlogCountByTags = queryBlogCountByTags;
module.exports.queryBlogBySearchWord = queryBlogBySearchWord;


