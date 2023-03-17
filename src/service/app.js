const Koa = require('koa')
const router = require('koa-router')()
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
app.use(cors())
app.use(bodyparser())

const routing = require('./routes')
routing(app)
const server = require('http').Server(app.callback())
const io = require('socket.io')(server,{
  transports:['websocket'],
  cors:{
    origin: '*'
  }
})

io.on('connection',(socket)=>{
  console.log('建立连接了',socket.id);
  socket.emit("hello", "hallo,客户端");
  socket.on('sendMsg-to-server',(data)=>{
    console.log('收到客户端消息',data)
  })
})


server.listen(3000, ()=>{
  console.log('http://localhost:3000 is listening...')
})