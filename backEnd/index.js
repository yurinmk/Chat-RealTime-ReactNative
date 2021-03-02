const { v4: uuidv4 } = require('uuid');
const express = require('express');
const http = require("http");
let app = express();
let server = http.createServer(app);
let io = require("socket.io")(server);

let mensagens = [{
  id: uuidv4(),
  idUsuario: 2,
  mensagem: 'Em que posso lhe ajudar?'
}];


io.on("connection", (socket) => {

  //io.emit("todasAsMensagens", mensagens);

  io.emit("todasAsMensagens", mensagens);

  socket.on("mensagem", (data) => {

    var mensagemRecebida = {
      id: data.id,
      idSocket: socket.id,
      idUsuario: data.idUsuario,
      mensagem: data.mensagem
    }
    mensagens.push(mensagemRecebida);
    io.emit("mensagemAtual", mensagemRecebida);

    console.log(mensagemRecebida)
  })

  // socket.on("disconnect", (data) => {
  //   console.log(`ID: ${socket.id} desconectado!`);
  // })

});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server ON!")
});