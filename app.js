const express = require('express')
const bodyParser = require('body-parser')
const fileRoute = require('./router/fileUpload/upload')
const path = require('path')
const http = require('http')
const websocketServer = require('./utils/websocket-server')
// websocket
const app = express()
const server = http.createServer(app)
websocketServer(server)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
const staticPath = path.join(__dirname, 'document')
app.use(express.static(staticPath))


app.use('/api/upload', fileRoute)

app.use("*", (req, res) => {

  res.sendFile(path.join(staticPath, 'index.html'))
})

server.listen(3000)

console.log('项目地址localhost:3000')