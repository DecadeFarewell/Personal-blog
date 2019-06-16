const commentDao = require('../dao/commentDao')
const ctimeUtil = require('../utils/ctimeUtil');
const respUtil = require('../utils/respUtil');
const url = require('url');
const captcha = require('svg-captcha');

const path = new Map()

function addComment(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.addComment({
        ...params,
        ctime: ctimeUtil.getNowTime(),
        utime: ctimeUtil.getNowTime()
    }, (result) => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '评论成功', result))
        response.end();
    })
}

path.set('/addComment', addComment)

//获取验证码
function queryRamdonCode(request, response) {
    const img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200)
    response.write(respUtil.writeRusult('ok', '获取验证码成功', img))
    response.end();
}
path.set('/queryRamdonCode', queryRamdonCode)

function queryCommentsByBlogId(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.blog_id, result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取评论成功', result))
        response.end();
    })
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId)

//获取最近的评论
function queryRecentComment(request, response) {
    const params = url.parse(request.url,true).query;
    commentDao.queryRecentComment(parseInt(params.limit),result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取最新评论成功', result))
        response.end();
    })
}
path.set('/queryRecentComment', queryRecentComment)

module.exports.path = path