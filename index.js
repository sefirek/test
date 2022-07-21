import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
// app.listen(port, () => console.log(`Listening on port ${port}`));
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (message) => {
    socket.emit('chat message', 'it is ok');
  });
});

server.listen(port, () => {
  console.log('listening on *:3000');
});
