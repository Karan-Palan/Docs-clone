const port = 3000;
const io = require("socket.io")(port, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("send-changes", (delta) => {
    // console.log("Received changes:", delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});
