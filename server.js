const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const db = require('./db')
const io = require('socket.io')(server)
const router = require('./network/routes');

const port = 3000 || process.env.PORT
db();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(router);
router(app);

app.use('/app', express.static('public'));

server.listen(port, () => {
    console.log(`Aplication runserver in http://localhost:${port}`);
});


io.on('connection', (socket) => {
    console.log('New User connected');

    socket.on("chat message", function (data) {
        io.emit("chat message", data);
    });


})