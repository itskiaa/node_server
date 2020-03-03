// REMINDER --> WHEN YOU WANT TO RUN THIS CODE YOU NEED TO START THE SERVER FROM TERMINAL USING NODE

var express = require("express"); // imports Express module as required element in the variable --> used to call function

var app = express(); // express function is used to create an express application
                     // usign var app you can store the results of the function (which generates the application in a variable for further access)

var server = app.listen(3000); // creates a variable called server where saves the content of var express is recieved on port localhost:3000

app.use(express.static("public")); // creates a line to define which files are dispalyed on server (using folde "public" as source for publicly hosted material)
                                   // static = hosts static files, files that does not change --> HTML, JavaScript and assets

console.log("Beebo Loves You");

var socket = require("socket.io"); // imports socket.io library as requirement (just like we did for express on line 1)
                                   // just like express, socket.io is used to call a function

// Time to create an actual socket that is listening to the server on port 3000
var io =  socket(server); // this variable handles informations coming in and out of the sockets from and to the server

io.sockets.on("connection", newConnection) // what happens on a new connection (JS event trigger) is function newConnection()

function newConnection(socket) { // socket is the function's element --> functions triggers a socket on new connection
  console.log("new connection: " + socket.id); // for each new connection server logs sockets id (unique id used to track socket)
 // this function allows you to check when the server recieves a new connection through a log on the console--> in order to work it needs a sending line on the client side meaning public files (will be checked with **)

  socket.on("mouse", mouseMsg) // If a message called "mouse" is recieved, the function mouseMsg() is triggered

  function mouseMsg(data) {
    console.log(data); // when a message is recived it logs the content of said message (called "data" as in the variable connected to the emitted message from the client)
    // this code alone does not allow to share messages and data between the clients --> they are stored in to the server, but not shared out
    // To do so:
    socket.broadcast.emit("mouse", data); // each time a message called "mouse" containting data, is recieved, it is broadcasted to every socket
                                          // messages can be altered in servers --> so what comes in appears different once bradcasted i.e. you draw in white, ther client draws in white too, but on your computer is shown in blue
                                          // to allow clients to recieve messages from other clients trough the server another line of code is needed in the client script (marked ***)
    // io.socket.emit("mouse", data); // this code sends back the message to every socket connected --> even the one who sent it
  }

}
