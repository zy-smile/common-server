const WebSocket = require('ws');
const PORT = process.env.WS_PORT || 8080;

function websocketServer(server) {

  const wss = new WebSocket.Server({
    server
  });

  wss.on('connection', ws => {
    ws.isAlive = true;
    console.log('客户端连接')
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', message => {
      console.log(`收到消息 => ${message}`);
      // 广播消息给所有客户端
      // wss.clients.forEach(client => {
      //   if (client.readyState === WebSocket.OPEN) {
      //     client.send(`广播 => ${message}`);
      //   }
      // });
      ws.send(JSON.stringify({
        msg: `收到消息：${message}`,
        code: 200
      }), {
        binary: false
      })
    })

    ws.on('close', () => {
      console.log('Client disconnected')
    })
    ws.on('error', (err) => console.log(err))
    ws.send(JSON.stringify({
      msg: '欢迎来到聊天室！',
      code: 200
    }))
  });

  const interval = setInterval(() => {
    wss.clients.forEach(ws => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log(`WebSocket服务器已在端口 ${PORT} 上启动`);
}

module.exports = websocketServer