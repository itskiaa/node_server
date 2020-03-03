var socket;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(51);

  socket = io.connect() // ** this line creates a socket connecting to the server

  socket.on("mouse", newDrawing); // *** if socket recieves message called "mouse" it triggers function newDrawing()
}

function newDrawing(data) {
  fill(255,0,100); // •
  ellipse(data.x, data.y, 60, 60);
}

function mouseDragged() {
  // console.log("Sending:" + mouseX + "," + mouseY);

  var data = { // Create a variable to store the content of the message that's sent to the server --> so that it can be shown on ≠ clients
    x: mouseX,
    y: mouseY,  // the content that's sent to the server, and so shared with clients, are mouse coordinates
                // THIS ALONE IS NOT ENOUGH --> You need to write code on the server.js file so that it can recieve informations from each client
  }

  socket.emit('mouse', data) // the socket sends to the server the content of var data, as "mouse" informations

  fill(0,0,0); // remind to delare color fill, otherwise after first communication (marked with •) every ellipse is filled with that color --> PROPERTIES ARE OVERWRITTEN
  ellipse(mouseX, mouseY, 60, 60); // this way you draw only when pressing and moving the mouse
}

function draw() {
}
