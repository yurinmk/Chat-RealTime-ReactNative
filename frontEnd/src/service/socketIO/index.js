import socketIO from 'socket.io-client';


export const startSocketIO = () => {

  const socket = socketIO('http://10.0.0.28:3000', {
    transport: ['websocket'],
    jsonp: false
  });

  socket.connect();

  socket.on('connection', () => {

    console.log('conectado');

  })

}