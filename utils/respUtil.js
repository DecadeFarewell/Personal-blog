
function writeRusult(status,msg,data){
    return JSON.stringify({
        status,
        msg,
        data
    })
}

module.exports.writeRusult = writeRusult;