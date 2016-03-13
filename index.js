var express = require("express");
var fs = require("fs");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(1337);
app.use(express.static(__dirname + "/build" ));

io.on("connection", function(socket) {

    io.to(socket.id).emit("userid", socket.id);
    console.log("a user connected", socket.id);

});
