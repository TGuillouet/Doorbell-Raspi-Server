const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const ioc = require('socket.io-client');
const fs = require('fs');

app.listen(80);

let socketRaspi = ioc.connect('http://localhost:3000/');

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.on('play', function (data) {
    console.log(data);
    socketRaspi.emit('play', data);
  });
});