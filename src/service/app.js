const Koa = require("koa");
const router = require("koa-router")();
const bodyparser = require("koa-bodyparser");
const cors = require("koa2-cors");
const app = new Koa();
app.use(cors());
app.use(bodyparser());

const routing = require("./routes");
routing(app);
const server = require("http").Server(app.callback());
const io = require("socket.io")(server, {
  transports: ["websocket"],
  cors: {
    origin: "*",
  },
});
const onlineList = []
io.on("connection", (socket) => {
  const username = socket.handshake.query.username
  const userId = socket.handshake.query.userId
  const userinfo = onlineList.find(user=>user.userId===userId)

  if(userinfo){
    userinfo.socketId = socket.id
  }else {
    onlineList.push({
      socketId: socket.id,
      username,
      userId
    })
  }
  io.emit('online',onlineList)

  console.log('onlineList', onlineList)
  socket.on("sendMsg-to-group", (data) => {
    console.log("收到客户端群聊消息", data);
    io.emit("sendMsg-to-group", data);
  });

  socket.on("sendMsg-to-one", (data) => {
    console.log("收到客户端私聊消息", data);
    // io.emit("sendMsg-to-one", data);
    let toSocketId = data.toSocketId; //获取接收方的id;
    let toSocket;
    // console.log('io',io.sockets.sockets)
    try {
      toSocket = io.sockets.sockets.get(toSocketId)
      // console.log(toSocket)
      toSocket.emit("receive-from-one", data.msgObj);
    } catch (e) {
      console.log(`找不到${toSocketId}`);
    }
  });


  socket.on("disconnect", () => {
    console.log("有用户断开连接");
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000 is listening...");
});
