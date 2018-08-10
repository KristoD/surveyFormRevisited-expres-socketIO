var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(8000, function() {
    console.log("Server listening on port 8000...");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log("Socket connected.");

        socket.on("form_submitted", function(data) {
            console.log(data);
            var random = Math.floor(Math.random(1, 1000) * 1000);
            socket.emit("server_response", {response: JSON.stringify(data), number: random});
        });
});