
var obj = {
    inFaceData: [],
    inCarData: [],
    outFaceData: [],
    outCarData: []
}


var carWebsocket = new WebSocket("ws://192.168.1.166:6080/SocketServer")

carWebsocket.onopen = () => {
    console.info('webSocket链接成功!')
}
carWebsocket.onmessage = (result) => {
    var data = JSON.parse(result.data);
    if (data.aType == 0) {
        if (data.mType == 0) {
            obj.inFaceData.unshift(data)
            obj.inFaceData.length = 20;
        }
        if (data.mType == 1) {
            obj.inCarData.unshift(data)
            obj.inCarData.length = 20;
        }
    } else {
        if (data.mType == 0) {
            obj.outFaceData.unshift(data)
            obj.outFaceData.length = 20;
        }
        if (data.mType == 1) {
            obj.outCarData.unshift(data)
            obj.outCarData.length = 20;
        }
    }

    console.log('webSocket接受到信息')

}
carWebsocket.onerror = (error) => {
    console.error('webSocket错误：', error)
}

carWebsocket.onclose = () => {
    console.log('webSocket 已关闭')
}