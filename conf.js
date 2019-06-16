const fs = require('fs')

const globalConfig = {};

const confArr = fs.readFileSync('./server.conf').toString().split('\r\n')

for (let i = 0; i < confArr.length; i++) {
    globalConfig[confArr[i].split('=')[0]] = confArr[i].split('=')[1];
}

module.exports = globalConfig