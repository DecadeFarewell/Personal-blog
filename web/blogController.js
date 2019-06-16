const blogDao = require('../dao/blogDao');
const ctimeUtil = require('../utils/ctimeUtil');
const respUtil = require('../utils/respUtil');
const url = require('url');
const tagsDao = require('../dao/tagsDao');
const mappingDao = require('../dao/mappingDao');

const path = new Map();

//插入博客文章
function insertBlog(request, response) {
    const params = url.parse(request.url, true).query;
    const title = params.title;
    const tags = params.tags.replace(/ /g, '').replace(/，/g, ',');
    request.on('data', (data) => {
        // const content = JSON.parse(data.toString()).content;
        // blogDao.insertBlog(title, content, tags, ctimeUtil.getNowTime(), ctimeUtil.getNowTime(), 0, (result) =>
        blogDao.insertBlog(title, data.toString(), tags, ctimeUtil.getNowTime(), ctimeUtil.getNowTime(), 0, (result) => {
            response.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8",
            });
            response.write(respUtil.writeRusult('ok', '写入成功',result));
            response.end();
            //result是插入成功之后返回的结果，记录了刚插入的那一条记录的信息，其中包括resultId
            const blogId = result.insertId;
            const tagsArr = tags.split(',');
            for (let i = 0; i < tagsArr.length; i++) {
                if (tags[i] == '') {
                    continue;
                }
                queryTag(tagsArr[i], blogId);
            }
        })
    })
}

//查询标签表里是否存在某个标签
function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, (result) => {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            mappingDao.insertTagBlogMapping(result[0].id, blogId, (result) => {
                // console.log(result)
            })
        }
    })
}
//插入标签到标签表
function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, ctimeUtil.getNowTime(), ctimeUtil.getNowTime(), (result) => {
        insertTagBlogMapping(result.insertId, blogId)
    })
}
//插入 标签id-博客id 映射表
function insertTagBlogMapping(tagId, blogId) {
    mappingDao.insertTagBlogMapping(tagId, blogId, (result) => {
        // console.log(result)
    })
}
path.set('/insertBlog', insertBlog);

//处理查询博客列表请求
function queryblog(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryBlog(parseInt(params.page), parseInt(params.pageSize), (data) => {
        const result = data;
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*>/, '');
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
        }
        response.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8",
        })
        response.write(respUtil.writeRusult('ok', '获取成功', result));
        response.end();
    })
}
path.set('/queryBlog', queryblog)

//查询博客文章总数
function queryBlogCount(request, response) {
    blogDao.queryBlogCount((result) => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取成功', result))
        response.end();
    })
}
path.set('/queryBlogCount', queryBlogCount)

//按照id查询博客文章
function queryBlogById(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryBlogById(params.id, (result) => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取成功', result))
        response.end();
    })
}
path.set('/queryBlogById', queryBlogById)

//按照标签查询博客文章
function queryBlogByTag(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryBlogByTag(params.tag,parseInt(params.page),parseInt(params.pageSize), (result) => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取成功', result))
        response.end();
    })
}
path.set('/queryBlogByTag', queryBlogByTag)

function queryBlogCountByTags(request,response){
    const params = url.parse(request.url, true).query;
    blogDao.queryBlogCountByTags(params.tag,result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取某一标题文章数量成功', result))
        response.end();
    })
}
path.set('/queryBlogCountByTags', queryBlogCountByTags)


//增加文章浏览次数
function addViews(request,response){
    const params = url.parse(request.url, true).query;
    blogDao.addViews(parseInt(params.blog_id),result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '浏览数加一', result))
        response.end();
    })
}
path.set('/addViews', addViews)

//搜索关键字查询文章
function queryBlogBySearchWord(request,response){
    const params = url.parse(request.url, true).query;
    console.log(params)
    blogDao.queryBlogBySearchWord(params.tag,parseInt(params.page),parseInt(params.pageSize),result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '搜索成功', result))
        response.end();
    })
}
path.set('/queryBlogBySearchWord', queryBlogBySearchWord)

module.exports.path = path;
