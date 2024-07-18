const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set the views directory
app.set("views", path.join(__dirname, "views"));

io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    // Listen for location updates from the client
    socket.on("locationUpdate", (data) => {
        console.log("Location received:", data);

        // Broadcast the location update to all clients
        io.emit("locationUpdate", data);
    });

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});
