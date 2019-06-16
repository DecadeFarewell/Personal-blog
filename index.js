
const express = require('express');

const globalConfig = require('./conf')

const app = new express();

app.use(express.static('./page/'));
app.listen(globalConfig.port,() => {
    console.log('服务已启动')
})

const loader = require('./loader.js')
//上传每日一句
app.post('/editEveryDay',loader.get('/editEveryDay'))
//拉取每日一句
app.get('/queryEveryDay',loader.get('/queryEveryDay'))
//上传博客文章
app.post('/insertBlog',loader.get('/insertBlog'))
//拉取博客文章
app.get('/queryBlog',loader.get('/queryBlog'));
//获取博客文章总数量
app.get('/queryBlogCount',loader.get('/queryBlogCount'))
//按照id获取博客文章
app.get('/queryBlogById',loader.get('/queryBlogById'))
//发表评论
app.get('/addComment',loader.get('/addComment'))
//获取验证码
app.get('/queryRamdonCode',loader.get('/queryRamdonCode'))
//按照文章id获取对应的评论
app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'))
//获取最新评论
app.get('/queryRecentComment',loader.get('/queryRecentComment'))
//获取标签云
app.get('/getRamdonTags',loader.get('/getRamdonTags'))
//按照标签获取博客文章
app.get('/queryBlogByTag',loader.get('/queryBlogByTag'))
//查询某一标题的文章总数
app.get('/queryBlogCountByTags',loader.get('/queryBlogCountByTags'))
//增加文章的浏览次数
app.get('/addViews',loader.get('/addViews'))
//搜索框请求数据，模糊查询
app.get('/queryBlogBySearchWord',loader.get('/queryBlogBySearchWord'))
