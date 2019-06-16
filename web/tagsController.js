const tagsDao = require('../dao/tagsDao')
const ctimeUtil = require('../utils/ctimeUtil');
const respUtil = require('../utils/respUtil');
const url = require('url');

const path = new Map()

function getRamdonTags(request,response){
    tagsDao.queryRamdonTags(result => {
        response.writeHead(200)
        response.write(respUtil.writeRusult('ok', '获取随机标签成功', result))
        response.end();
    })
}

path.set('/getRamdonTags',getRamdonTags)

module.exports.path = path;