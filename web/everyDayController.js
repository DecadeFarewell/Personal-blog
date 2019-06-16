const everyDay = require('../dao/everyDayDao');
const ctimeUtil = require('../utils/ctimeUtil');
const respUtil = require('../utils/respUtil');

const path = new Map();

function editEveryDay(request, response) {
    request.on('data', data => {
        const content = data.toString().trim();
        const ctime = ctimeUtil.getNowTime();
        everyDay.insertEveryDay(content, ctime, (result) => {
            response.writeHead(200);
            response.write(respUtil.writeRusult('ok', '写入成功', null));
            response.end();
        })
    })
}
function queryEveryDay(request, response) {
    everyDay.queryEveryDay((result) => {
        response.writeHead(200);
        response.write(respUtil.writeRusult('ok', '获取成功', result));
        response.end();
    })
}

path.set('/editEveryDay', editEveryDay)
path.set('/queryEveryDay', queryEveryDay)

module.exports.path = path;